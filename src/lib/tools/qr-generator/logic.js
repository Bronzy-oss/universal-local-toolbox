// Uses the well-established `qrcode-generator` npm package rather
// than a hand-written QR encoder. QR encoding involves Reed-Solomon
// error correction and mask-pattern optimization — subtle enough
// that a bug could produce a code that looks right but doesn't
// actually scan, and that's not something verifiable without a real
// scanner. A proven, widely-used library is the safer choice here.
import qrcodegen from "qrcode-generator";

// typeNumber 0 lets the library auto-pick the smallest QR version
// that fits the data (up to 40) instead of hardcoding one.
export function buildQrMatrix(text, errorCorrectionLevel = "M") {
  if (!text) return null;
  const qr = qrcodegen(0, errorCorrectionLevel);
  qr.addData(text);
  qr.make();
  const size = qr.getModuleCount();
  const matrix = [];
  for (let row = 0; row < size; row++) {
    const rowData = [];
    for (let col = 0; col < size; col++) {
      rowData.push(qr.isDark(row, col));
    }
    matrix.push(rowData);
  }
  return matrix;
}
