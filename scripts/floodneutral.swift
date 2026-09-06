// Key a painted-on transparency checkerboard back out to real transparency.
//
// An image exported without an alpha channel can still LOOK cut out: the
// editor draws its checkerboard into the pixels. Using that file puts a grey
// chequer pattern on the page.
//
// The checkerboard is discriminable from the picture by two properties at
// once: it is light, and it is perfectly NEUTRAL (r == g == b), because it is
// drawn rather than photographed. Paper and walls photographed indoors are
// warm, with red above blue by a noticeable margin. Flooding in from the
// border on "light and neutral" therefore removes the chequer without
// touching the torn paper edge next to it.
import Foundation
import CoreGraphics
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
guard args.count >= 5 else {
    FileHandle.standardError.write("usage: floodneutral <in> <out.png> <minLuma> <maxChroma>\n".data(using: .utf8)!)
    exit(2)
}
// Defaults suit nothing in particular: the chequer's two tones vary between
// exports. One file's dark square was luma 206, another's was 142, and a
// floor set for the first cleared only half the second's pattern, which
// stopped the flood from crossing it. Probe the corners rather than assume.
let minLuma = Int(args[3]) ?? 130
let maxChroma = Int(args[4]) ?? 6

let data = try Data(contentsOf: URL(fileURLWithPath: args[1]))
guard let provider = CGDataProvider(data: data as CFData),
      let src = CGImage(pngDataProviderSource: provider, decode: nil, shouldInterpolate: false, intent: .defaultIntent)
        ?? CGImage(jpegDataProviderSource: provider, decode: nil, shouldInterpolate: false, intent: .defaultIntent) else {
    FileHandle.standardError.write("cannot decode\n".data(using: .utf8)!); exit(1)
}

let w = src.width, h = src.height
var px = [UInt8](repeating: 0, count: w * h * 4)
guard let ctx = CGContext(data: &px, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4,
                          space: CGColorSpaceCreateDeviceRGB(),
                          bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { exit(1) }
ctx.draw(src, in: CGRect(x: 0, y: 0, width: w, height: h))

func isChecker(_ i: Int) -> Bool {
    let r = Int(px[i * 4]), g = Int(px[i * 4 + 1]), b = Int(px[i * 4 + 2])
    let luma = (r * 299 + g * 587 + b * 114) / 1000
    let chroma = max(max(abs(r - g), abs(g - b)), abs(r - b))
    return luma >= minLuma && chroma <= maxChroma
}

var outside = [Bool](repeating: false, count: w * h)
var stack: [Int] = []
for x in 0..<w { for y in [0, h - 1] { let i = y * w + x; if isChecker(i) && !outside[i] { outside[i] = true; stack.append(i) } } }
for y in 0..<h { for x in [0, w - 1] { let i = y * w + x; if isChecker(i) && !outside[i] { outside[i] = true; stack.append(i) } } }
while let i = stack.popLast() {
    let x = i % w, y = i / w
    for (dx, dy) in [(1, 0), (-1, 0), (0, 1), (0, -1)] {
        let nx = x + dx, ny = y + dy
        guard nx >= 0, nx < w, ny >= 0, ny < h else { continue }
        let j = ny * w + nx
        if !outside[j] && isChecker(j) { outside[j] = true; stack.append(j) }
    }
}
var cleared = 0
for i in 0..<(w * h) where outside[i] {
    px[i * 4] = 0; px[i * 4 + 1] = 0; px[i * 4 + 2] = 0; px[i * 4 + 3] = 0; cleared += 1
}
guard let outImg = ctx.makeImage(),
      let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath: args[2]) as CFURL, UTType.png.identifier as CFString, 1, nil) else { exit(1) }
CGImageDestinationAddImage(dest, outImg, nil)
CGImageDestinationFinalize(dest)
print("cleared \(cleared * 100 / (w * h))% of the frame")
