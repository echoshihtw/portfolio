// Key a border colour to transparent by flooding IN from the edges, rather
// than by thresholding the whole image.
//
// A global luminance key would work on the surround here but would also eat
// her hair and the dark bag, which are as black as the background. Flooding
// from the border only removes dark pixels CONNECTED to the outside, so an
// enclosed dark region inside the torn edge is untouched.
import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
guard args.count >= 4 else {
    FileHandle.standardError.write("usage: floodkey <in> <out.png> <threshold 0-255>\n".data(using: .utf8)!)
    exit(2)
}
let threshold = Int(args[3]) ?? 40

guard let srcData = CFDataCreate(nil, [UInt8](try Data(contentsOf: URL(fileURLWithPath: args[1]))), (try Data(contentsOf: URL(fileURLWithPath: args[1]))).count),
      let provider = CGDataProvider(data: srcData),
      let src = CGImage(jpegDataProviderSource: provider, decode: nil, shouldInterpolate: false, intent: .defaultIntent)
        ?? CGImage(pngDataProviderSource: provider, decode: nil, shouldInterpolate: false, intent: .defaultIntent) else {
    FileHandle.standardError.write("cannot decode\n".data(using: .utf8)!); exit(1)
}

let w = src.width, h = src.height
var px = [UInt8](repeating: 0, count: w * h * 4)
guard let ctx = CGContext(data: &px, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4,
                          space: CGColorSpaceCreateDeviceRGB(),
                          bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { exit(1) }
ctx.draw(src, in: CGRect(x: 0, y: 0, width: w, height: h))

func dark(_ i: Int) -> Bool {
    let r = Int(px[i * 4]), g = Int(px[i * 4 + 1]), b = Int(px[i * 4 + 2])
    return (r * 299 + g * 587 + b * 114) / 1000 <= threshold
}

var outside = [Bool](repeating: false, count: w * h)
var stack: [Int] = []
for x in 0..<w {
    for y in [0, h - 1] { let i = y * w + x; if dark(i) && !outside[i] { outside[i] = true; stack.append(i) } }
}
for y in 0..<h {
    for x in [0, w - 1] { let i = y * w + x; if dark(i) && !outside[i] { outside[i] = true; stack.append(i) } }
}
while let i = stack.popLast() {
    let x = i % w, y = i / w
    for (dx, dy) in [(1, 0), (-1, 0), (0, 1), (0, -1)] {
        let nx = x + dx, ny = y + dy
        guard nx >= 0, nx < w, ny >= 0, ny < h else { continue }
        let j = ny * w + nx
        if !outside[j] && dark(j) { outside[j] = true; stack.append(j) }
    }
}

var cleared = 0
for i in 0..<(w * h) where outside[i] {
    px[i * 4] = 0; px[i * 4 + 1] = 0; px[i * 4 + 2] = 0; px[i * 4 + 3] = 0
    cleared += 1
}

guard let outImg = ctx.makeImage(),
      let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: args[2]) as CFURL, UTType.png.identifier as CFString, 1, nil) else { exit(1) }
CGImageDestinationAddImage(dest, outImg, nil)
CGImageDestinationFinalize(dest)
print("cleared \(cleared) of \(w * h) px (\(cleared * 100 / (w * h))%)")
