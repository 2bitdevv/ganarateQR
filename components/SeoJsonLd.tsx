import { getSiteUrl } from "@/lib/siteUrl";

const site = getSiteUrl();

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "QR Code Generator",
  description:
    "สร้าง QR Code แบบ Modern — ข้อความ, URL, Email, WiFi, vCard, WhatsApp และอื่น ๆ บนเบราว์เซอร์ ไม่ต้องติดตั้งแอป",
  url: site,
  inLanguage: ["th-TH", "en"],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "QR Code Generator",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "THB",
  },
  description:
    "เครื่องมือสร้าง QR Code ฝั่ง client — รองรับ URL, Email, SMS, WhatsApp, WiFi, vCard และดาวน์โหลด PNG",
  url: site,
};

export function SeoJsonLd() {
  const json = JSON.stringify([websiteSchema, softwareSchema]);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
