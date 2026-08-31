import Cocoa

let path = CommandLine.arguments[1]
guard let img = NSImage(contentsOfFile: path),
      let tiff = img.tiffRepresentation,
      let rep = NSBitmapImageRep(data: tiff) else {
    print("load failed"); exit(1)
}
let w = rep.pixelsWide, h = rep.pixelsHigh
let cols = 64, rows = 32
print("size: \(w)x\(h)  preview \(cols)x\(rows)")
print("legend: ' '=transparent  G=gold/border  D=dark  L=light  W=white-ish  .=other")
for r in 0..<rows {
    var line = ""
    for c in 0..<cols {
        let x0 = c * w / cols, x1 = (c+1) * w / cols
        let y0 = r * h / rows, y1 = (r+1) * h / rows
        var totalA = 0, totalR = 0, totalG = 0, totalB = 0, n = 0
        // sample a few points in cell
        let stepX = max(1, (x1-x0)/4), stepY = max(1, (y1-y0)/4)
        var y = y0
        while y < y1 {
            var x = x0
            while x < x1 {
                var px: [Int] = [0,0,0,0]
                rep.getPixel(&px, atX: x, y: y)
                totalA += px[3]; totalR += px[0]; totalG += px[1]; totalB += px[2]
                n += 1
                x += stepX
            }
            y += stepY
        }
        let a = totalA / max(1,n)
        if a < 25 { line += " "; continue }
        let rr = totalR / max(1,n), gg = totalG / max(1,n), bb = totalB / max(1,n)
        // gold: r>150, g>110, b<110, r>b+40
        if rr > 150 && gg > 100 && bb < 130 && rr > bb + 40 { line += "G" }
        else if rr > 200 && gg > 200 && bb > 200 { line += "W" }
        else if rr < 80 && gg < 80 && bb < 80 { line += "D" }
        else if rr > 160 && gg > 140 && bb > 120 { line += "L" }
        else { line += "." }
    }
    print(line)
}