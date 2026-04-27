import type { Metadata, Viewport } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { getSiteUrl } from "@/lib/siteUrl";

const notoThai = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  variable: "--font-noto-thai",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "QR Code Generator — สร้าง QR ฟรี บนเว็บ",
    template: "%s | QR Code Generator",
  },
  description:
    "สร้าง QR Code แบบ Modern ฟรี — รองรับข้อความ, URL, Email, โทรศัพท์, SMS, WhatsApp, WiFi, vCard ดาวน์โหลด PNG คัดลอกข้อมูล ทำงานบนเบราว์เซอร์ ไม่ต้องมีเซิร์ฟเวอร์",
  applicationName: "QR Code Generator",
  authors: [{ name: "QR Code Generator" }],
  keywords: [
    "QR Code",
    "สร้าง QR",
    "QR Generator",
    "QR ฟรี",
    "WiFi QR",
    "vCard QR",
    "WhatsApp QR",
    "URL QR",
    "Thailand",
    "เครื่องมือ QR",
  ],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    alternateLocale: ["en_US"],
    url: "/",
    siteName: "QR Code Generator",
    title: "QR Code Generator — สร้าง QR ฟรี บนเว็บ",
    description:
      "สร้าง QR Code แบบ Modern — URL, Email, WiFi, vCard, WhatsApp ดาวน์โหลด PNG ใช้งานได้ทันที",
    // Social preview: `app/opengraph-image.tsx` (1200×630). Do not set og:image to /logo.jpg — it 404s.
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Code Generator — สร้าง QR ฟรี บนเว็บ",
    description:
      "สร้าง QR Code — URL, Email, WiFi, vCard, WhatsApp ดาวน์โหลด PNG ใช้งานบนเบราว์เซอร์",
    // Preview: `app/twitter-image.tsx` (same 1200×630 as OG).
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: "/logo.png",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef2ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`${notoThai.variable} font-sans min-h-dvh text-foreground antialiased`}
      >
        <SeoJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
