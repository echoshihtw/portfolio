// Crop and resize one image. Run interpreted: `swift scripts/imagetool.swift`.
//
// Called by scripts/buildPaintings.ts. The crop is a fractional rectangle
// from the TOP-LEFT, which is how the manifest reads and how a person
// thinks about it. Core Image's origin is bottom-left, so the y is flipped
// here, once, rather than in every manifest entry.
//
// `sips` was the obvious alternative and was rejected: its --cropOffset
// takes an offset from the centre whose argument order and sign do not
// match its own help text, so a manifest written against it would be a
// guess. An explicit rectangle cannot be misread.
import Foundation
import CoreImage

let args = CommandLine.arguments
guard args.count >= 8 else {
    FileHandle.standardError.write(
        "usage: imagetool <in> <out.jpg> <x> <y> <w> <h> <width>\n".data(using: .utf8)!)
    exit(2)
}

let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])
guard let fx = Double(args[3]), let fy = Double(args[4]),
      let fw = Double(args[5]), let fh = Double(args[6]),
      let targetWidth = Double(args[7]) else {
    FileHandle.standardError.write("bad numeric argument\n".data(using: .utf8)!)
    exit(2)
}

// Orientation matters: most of these are phone photographs carrying an EXIF
// rotation. Without applying it the crop lands on the unrotated frame, which
// is how a portrait painting comes out cropped as though it were landscape.
guard var img = CIImage(contentsOf: inURL, options: [.applyOrientationProperty: true]) else {
    FileHandle.standardError.write("cannot read \(inURL.path)\n".data(using: .utf8)!)
    exit(1)
}

let e = img.extent
let rect = CGRect(x: e.minX + fx * e.width,
                  y: e.minY + (1.0 - fy - fh) * e.height,
                  width: fw * e.width,
                  height: fh * e.height)

img = img.cropped(to: rect)
         .transformed(by: CGAffineTransform(translationX: -rect.minX, y: -rect.minY))

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
