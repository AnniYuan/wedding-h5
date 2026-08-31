import Cocoa
import Vision

let path = CommandLine.arguments[1]
guard let img = NSImage(contentsOfFile: path),
      let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("load failed"); exit(1)
}
let w = CGFloat(cg.width), h = CGFloat(cg.height)
print("size: \(Int(w))x\(Int(h))")
print("---- text (x,y from top-left, w x h, confidence) ----")
let request = VNRecognizeTextRequest { req, _ in
    guard let results = req.results as? [VNRecognizedTextObservation] else { return }
    let sorted = results.sorted {
        ($0.boundingBox.origin.y + $0.boundingBox.height) > ($1.boundingBox.origin.y + $1.boundingBox.height)
    }
    for obs in sorted {
        guard let top = obs.topCandidates(1).first else { continue }
        let b = obs.boundingBox
        let x = b.origin.x * w
        let y = (1 - b.origin.y - b.height) * h
        print(String(format: "[x=%.1f%% y=%.1f%% w=%.1f%% h=%.1f%%] conf=%.2f | %@",
                     x / w * 100, y / h * 100, b.width * 100, b.height * 100,
                     top.confidence, top.string.replacingOccurrences(of: "\n", with: " ⏎ ")))
    }
}
request.recognitionLevel = .accurate
request.recognitionLanguages = ["zh-Hans", "en-US"]
request.usesLanguageCorrection = false
let handler = VNImageRequestHandler(cgImage: cg, options: [:])
try? handler.perform([request])