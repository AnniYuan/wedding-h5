import Cocoa

let path = CommandLine.arguments[1]
guard let img = NSImage(contentsOfFile: path),
      let tiff = img.tiffRepresentation,
      let rep = NSBitmapImageRep(data: tiff) else {
    print("load failed"); exit(1)
}
let w = rep.pixelsWide, h = rep.pixelsHigh
print("size: \(w)x\(h)")
let cols = 24
func alphaAt(_ x: Int, _ y: Int) -> Int {
    var px: [Int] = [0,0,0,0]
    rep.getPixel(&px, atX: x, y: y)
    return px[3]
}
// 顶部边缘：每列从上往下第一个 alpha>30 的 y（归一化 0..1）
var topLine = ""
for c in 0..<cols {
    let x = c * w / cols
    var found = -1
    for y in stride(from: 0, to: h, by: 4) {
        if alphaAt(x, y) > 30 { found = y; break }
    }
    topLine += String(format: "%.2f ", Double(found) / Double(h))
}
print("top edge (y/h per column):")
print(topLine)
var botLine = ""
for c in 0..<cols {
    let x = c * w / cols
    var found = -1
    for y in stride(from: h-1, through: 0, by: -4) {
        if alphaAt(x, y) > 30 { found = y; break }
    }
    botLine += String(format: "%.2f ", Double(found) / Double(h))
}
print("bottom edge (y/h per column):")
print(botLine)