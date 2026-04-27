import QRCode from "qrcode";

export type ExportQrOptions = {
  width: number;
  fg: string;
  bg: string;
  logoDataUrl?: string | null;
  /** Fraction of QR width for logo box (default 0.22) */
  logoRatio?: number;
};

export async function exportQrToDataUrl(
  text: string,
  options: ExportQrOptions
): Promise<string> {
  const { width, fg, bg, logoDataUrl, logoRatio = 0.22 } = options;
  const canvas = document.createElement("canvas");
  await QRCode.toCanvas(canvas, text, {
    width,
    color: { dark: fg, light: bg },
    errorCorrectionLevel: "H",
    margin: 2,
  });

  if (logoDataUrl) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return canvas.toDataURL("image/png");
    const logo = new Image();
    logo.crossOrigin = "anonymous";
    await new Promise<void>((resolve, reject) => {
      logo.onload = () => resolve();
      logo.onerror = () => reject(new Error("โหลดโลโก้ไม่สำเร็จ"));
      logo.src = logoDataUrl;
    });
    const lw = width * logoRatio;
    const lh = width * logoRatio;
    const x = (width - lw) / 2;
    const y = (width - lh) / 2;
    const pad = lw * 0.12;
    ctx.fillStyle = bg;
    ctx.fillRect(x - pad, y - pad, lw + pad * 2, lh + pad * 2);
    ctx.drawImage(logo, x, y, lw, lh);
  }

  return canvas.toDataURL("image/png");
}
