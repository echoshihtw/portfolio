// Take the ALPHA from one image and the COLOUR from another, in pixel space.
//
// Both are drawn into a context of the shape image's size, so the second is
// scaled to fit exactly. No Core Image transforms, which is where the first
// attempt at this went wrong.
import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let a = CommandLine.arguments
guard a.count >= 4 else {
    FileHandle.standardError.write("usage: graft <shape.png> <colour> <out.png>\n".data(using: .utf8)!); exit(2)
}

func load(_ path: String) -> CGImage? {
    guard let d = try? Data(contentsOf: URL(fileURLWithPath: path)),
          let src = CGImageSourceCreateWithData(d as CFData, nil) else { return nil }
    return CGImageSourceCreateImageAtIndex(src, 0, [kCGImageSourceShouldCache: false] as CFDictionary)
}

guard let shapeImg = load(a[1]), let colourImg = load(a[2]) else {
    FileHandle.standardError.write("cannot read inputs\n".data(using: .utf8)!); exit(1)
}

let w = shapeImg.width, h = shapeImg.height

func raster(_ img: CGImage) -> [UInt8] {
    var buf = [UInt8](repeating: 0, count: w * h * 4)
    let ctx = CGContext(data: &buf, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4,
                        space: CGColorSpaceCreateDeviceRGB(),
                        bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
    ctx.draw(img, in: CGRect(x: 0, y: 0, width: w, height: h))
    return buf
}

let shape = raster(shapeImg)
let colour = raster(colourImg)

var out = [UInt8](repeating: 0, count: w * h * 4)
for i in 0..<(w * h) {
    let alpha = shape[i * 4 + 3]
    // Premultiplied: scale the colour by the alpha we are grafting on.
    let f = Double(alpha) / 255.0
    out[i * 4] = UInt8(Double(colour[i * 4]) * f)
    out[i * 4 + 1] = UInt8(Double(colour[i * 4 + 1]) * f)
    out[i * 4 + 2] = UInt8(Double(colour[i * 4 + 2]) * f)
    out[i * 4 + 3] = alpha
}

let ctx = CGContext(data: &out, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4,
                    space: CGColorSpaceCreateDeviceRGB(),
                    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
guard let img = ctx.makeImage(),
      let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: a[3]) as CFURL, UTType.png.identifier as CFString, 1, nil) else { exit(1) }
CGImageDestinationAddImage(dest, img, nil)
CGImageDestinationFinalize(dest)
print("grafted \(w)x\(h)")
