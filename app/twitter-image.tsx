import { renderBrandOgImage, OG_SIZE } from "@/lib/og-brand-image";

export const alt = "QR Code Generator — free web QR codes";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return renderBrandOgImage();
}
