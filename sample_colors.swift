import Cocoa

let path = CommandLine.arguments[1]
guard let img = NSImage(contentsOfFile: path),
      let tiff = img.tiffRepresentation,
      let rep = NSBitmapImageRep(data: tiff) else {
    print("load failed"); exit(1)
}
let w = rep.pixelsWide, h = rep.pixelsHigh

// 区域: 名称 x0% x1% y0% y1%
let regions: [(String, Double, Double, Double, Double)] = [
    ("hero标题文字区", 20, 80, 11.0, 19.5),
    ("hero副标题区", 22, 78, 19.8, 24.0),
    ("页面金边(左)", 0, 3, 5, 30),
    ("页面金边(右)", 97, 100, 5, 30),
    ("信纸卡中心", 25, 80, 42, 56),
    ("消息卡中心", 33, 84, 57, 66),
    ("消息卡头像区", 24, 36, 53, 66),
    ("按钮区", 40, 60, 89.0, 92.2),
    ("背景(左中)", 3, 12, 28, 38),
    ("背景(下)", 5, 20, 93, 99),
    ("信纸卡与消息卡之间", 30, 80, 56, 57.5)
]
func toHex(_ r: Int, _ g: Int, _ b: Int) -> String {
    String(format: "#%02X%02X%02X", r, g, b)
}
for (name, x0, x1, y0, y1) in regions {
    let px0 = Int(Double(w) * x0 / 100), px1 = Int(Double(w) * x1 / 100)
    let py0 = Int(Double(h) * y0 / 100), py1 = Int(Double(h) * y1 / 100)
    var tr = 0, tg = 0, tb = 0, n = 0
    var y = py0
    while y < py1 {
        var x = px0
        while x < px1 {
            var px: [Int] = [0, 0, 0, 0]
            rep.getPixel(&px, atX: x, y: y)
            tr += px[0]; tg += px[1]; tb += px[2]; n += 1
            x += max(1, (px1 - px0) / 12)
        }
        y += max(1, (py1 - py0) / 12)
    }
    if n == 0 { print("\(name): (空/透明)"); continue }
    let r = tr / n, g = tg / n, b = tb / n
    print("\(name): \(toHex(r, g, b))  rgb(\(r),\(g),\(b))  [样本数 \(n)]")
}