// Turn a photograph of ink on paper into an alpha mask: paper becomes fully
// transparent, ink becomes fully opaque, and the RGB is left black.
//
// The output is meant to be used as a CSS mask-image with
// background-color: currentColor, so the signature takes the page's text
// colour in both themes from one raster asset. No tracing tool required,
// and the pencil texture survives exactly as drawn.
import Foundation
import CoreImage

let a = CommandLine.arguments
guard a.count >= 8 else {
    FileHandle.standardError.write("usage: inkmask <in> <out.png> <x> <y> <w> <h> <width> [floor] [ceil]\n".data(using: .utf8)!)
    exit(2)
}
let inURL = URL(fileURLWithPath: a[1]), outURL = URL(fileURLWithPath: a[2])
let fx = Double(a[3])!, fy = Double(a[4])!, fw = Double(a[5])!, fh = Double(a[6])!
let target = Double(a[7])!
// Ink darkness below `floor` is treated as pure paper, above `ceil` as solid
// ink. Paper photographed indoors is never pure white, so without a floor the
// whole sheet arrives as a faint grey haze.
let floorV = a.count > 8 ? Double(a[8])! : 0.18
let ceilV  = a.count > 9 ? Double(a[9])! : 0.62

guard var img = CIImage(contentsOf: inURL, options: [.applyOrientationProperty: true]) else { exit(1) }
let e = img.extent
let rect = CGRect(x: e.minX + fx * e.width,
                  y: e.minY + (1.0 - fy - fh) * e.height,
                  width: fw * e.width, height: fh * e.height)
img = img.cropped(to: rect).transformed(by: CGAffineTransform(translationX: -rect.minX, y: -rect.minY))

img = img.applyingFilter("CIColorControls", parameters: [kCIInputSaturationKey: 0.0])

// Flatten the lighting before thresholding. A sheet photographed by hand is
// never evenly lit: this one has a shadow down one side, and a single
// threshold either keeps that shadow or eats the lighter strokes. Dividing
// the image by a heavily blurred copy of itself cancels whatever varies
// slowly across the frame, which is the lighting, and leaves what varies
// sharply, which is the ink.
let blurRadius = img.extent.width / 14.0
let lighting = img.clampedToExtent()
                  .applyingFilter("CIGaussianBlur", parameters: [kCIInputRadiusKey: blurRadius])
                  .cropped(to: img.extent)
// Core Image blend modes divide the BACKDROP by the source, so the sheet
// goes in as the backdrop and the blurred lighting as the source. The other
// way round computes lighting/image, which washes the ink out entirely.
img = lighting.applyingFilter("CIDivideBlendMode", parameters: [
    kCIInputBackgroundImageKey: img
]).cropped(to: img.extent)

// Invert so ink is bright and paper is dark.
img = img.applyingFilter("CIColorInvert")

// Stretch the range so paper lands at 0 and ink at 1: out = (in - floor) / (ceil - floor)
let span = ceilV - floorV
img = img.applyingFilter("CIColorMatrix", parameters: [
    "inputRVector": CIVector(x: CGFloat(1/span), y: 0, z: 0, w: 0),
    "inputGVector": CIVector(x: 0, y: CGFloat(1/span), z: 0, w: 0),
    "inputBVector": CIVector(x: 0, y: 0, z: CGFloat(1/span), w: 0),
    "inputBiasVector": CIVector(x: CGFloat(-floorV/span), y: CGFloat(-floorV/span), z: CGFloat(-floorV/span), w: 0)
])

// Luminance into alpha, RGB to black: the mask carries shape, not colour.
img = img.applyingFilter("CIColorMatrix", parameters: [
    "inputRVector": CIVector(x: 0, y: 0, z: 0, w: 0),
    "inputGVector": CIVector(x: 0, y: 0, z: 0, w: 0),
    "inputBVector": CIVector(x: 0, y: 0, z: 0, w: 0),
    "inputAVector": CIVector(x: 0.299, y: 0.587, z: 0.114, w: 0)
])

let scale = target / img.extent.width
if scale < 1 { img = img.transformed(by: CGAffineTransform(scaleX: scale, y: scale)) }

let ctx = CIContext()
try ctx.writePNGRepresentation(of: img, to: outURL, format: .RGBA8,
                               colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!)
print("wrote \(outURL.lastPathComponent) \(Int(img.extent.width))x\(Int(img.extent.height))")
