// Crop and resize one image. Run interpreted: `swift scripts/imagetool.swift`.
//
// Called by scripts/buildPaintings.ts, in one of two ways:
//   imagetool <in> <out.jpg> <width> crop <x> <y> <w> <h>
//   imagetool <in> <out.jpg> <width> corners <x1> <y1> ... <x4> <y4>
// A crop is a fractional rectangle. Corners are the painting's four corners
// in the photo (top-left, top-right, bottom-right, bottom-left), for a
// painting shot at an angle: the tool flattens it to a true rectangle.
// Both are fractions from the TOP-LEFT, which is how the manifest reads and
// how a person thinks about it. Core Image's origin is bottom-left, so the
// y is flipped here, once, rather than in every manifest entry.
//
// `sips` was the obvious alternative and was rejected: its --cropOffset
// takes an offset from the centre whose argument order and sign do not
// match its own help text, so a manifest written against it would be a
// guess. An explicit rectangle cannot be misread.
import Foundation
import CoreImage

let args = CommandLine.arguments
func fail(_ message: String) -> Never {
    FileHandle.standardError.write((message + "\n").data(using: .utf8)!)
    exit(2)
}
guard args.count >= 5 else {
    fail("usage: imagetool <in> <out.jpg> <width> crop x y w h | corners x1 y1 ... x4 y4")
}

let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])
let mode = args[4]
let numbers = args.dropFirst(5).compactMap(Double.init)
guard let targetWidth = Double(args[3]),
      numbers.count == args.count - 5,
      (mode == "crop" && numbers.count == 4) || (mode == "corners" && numbers.count == 8) else {
    fail("bad arguments: expected crop with 4 numbers or corners with 8")
}

// Orientation matters: most of these are phone photographs carrying an EXIF
// rotation. Without applying it the crop lands on the unrotated frame, which
// is how a portrait painting comes out cropped as though it were landscape.
guard var img = CIImage(contentsOf: inURL, options: [.applyOrientationProperty: true]) else {
    FileHandle.standardError.write("cannot read \(inURL.path)\n".data(using: .utf8)!)
    exit(1)
}

let e = img.extent
// A fraction from the top-left, as a point in Core Image's bottom-left space.
func point(_ fx: Double, _ fy: Double) -> CIVector {
    CIVector(x: e.minX + fx * e.width, y: e.minY + (1.0 - fy) * e.height)
}

if mode == "corners" {
    let flat = CIFilter(name: "CIPerspectiveCorrection")!
    flat.setValue(img, forKey: kCIInputImageKey)
    flat.setValue(point(numbers[0], numbers[1]), forKey: "inputTopLeft")
    flat.setValue(point(numbers[2], numbers[3]), forKey: "inputTopRight")
    flat.setValue(point(numbers[4], numbers[5]), forKey: "inputBottomRight")
    flat.setValue(point(numbers[6], numbers[7]), forKey: "inputBottomLeft")
    img = flat.outputImage!
} else {
    let (fx, fy, fw, fh) = (numbers[0], numbers[1], numbers[2], numbers[3])
    let rect = CGRect(x: e.minX + fx * e.width,
                      y: e.minY + (1.0 - fy - fh) * e.height,
                      width: fw * e.width,
                      height: fh * e.height)
    img = img.cropped(to: rect)
}
img = img.transformed(by: CGAffineTransform(translationX: -img.extent.minX, y: -img.extent.minY))

// Never upscale: two of the sources are only 750px on their long edge, and
// blowing them up to 1280 would produce a larger file that looks worse.
let scale = targetWidth / img.extent.width
if scale < 1 {
    img = img.transformed(by: CGAffineTransform(scaleX: scale, y: scale))
}

let ctx = CIContext()
// 0.72 rather than the usual 0.8+: these are photographs of paint, where
// the texture hides the artefacts, and the whole set has to load on one
// page. At 0.82 the gallery came to 10MB; this brings it under 4MB with no
// visible difference at the sizes actually rendered.
let opts: [CIImageRepresentationOption: Any] = [
    kCGImageDestinationLossyCompressionQuality as CIImageRepresentationOption: 0.72
]
do {
    try ctx.writeJPEGRepresentation(of: img, to: outURL,
                                    colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!,
                                    options: opts)
    print("  \(outURL.lastPathComponent) \(Int(img.extent.width))x\(Int(img.extent.height))")
} catch {
    FileHandle.standardError.write("write failed: \(error)\n".data(using: .utf8)!)
    exit(1)
}
