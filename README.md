# QR Code Generator

Modern, client-side QR code generator built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Create scannable codes for URLs, email, phone, SMS, WhatsApp, Wi‑Fi, vCard, and plain text—then download PNG, copy payload, customize colors, add a center logo, and browse recent history (stored locally).

Thai-first UI with light/dark themes, glassmorphism styling, and smooth motion (Framer Motion).

**Live site:** [ganarate-qr.vercel.app](https://ganarate-qr.vercel.app/)

## Features

- **QR types:** Text, URL, Email (with subject/body), Phone (`tel:`), SMS, WhatsApp, Wi‑Fi (`WIFI:`), Contact (vCard)
- **Preview:** Live QR with `react-qr-code` (error correction **H** when using a logo overlay)
- **Export:** PNG via `qrcode` canvas (matches preview colors; optional logo composited in the center)
- **URL shortener (demo):** Simulated short links under `serverexpert.online/qr/{id}` with mappings saved in `localStorage`
- **UX:** Loading state, toasts, QR color pickers, optional logo upload, generation history (`localStorage`)
- **SEO:** Metadata, Open Graph / Twitter cards, `robots.txt`, `sitemap.xml`, JSON-LD (`WebSite` + `SoftwareApplication`)
- **Support link:** “Buy me a coffee” → [buymeacoffee.com/dev2bit](https://www.buymeacoffee.com/dev2bit)

## Tech stack

| Area        | Choice                                      |
| ----------- | ------------------------------------------- |
| Framework   | Next.js 16 (App Router)                     |
| UI          | React 19, Tailwind CSS 4, Framer Motion     |
| Icons       | Lucide React                                |
| QR preview  | `react-qr-code`                             |
| QR export   | `qrcode` (canvas → PNG)                     |
| Fonts       | Noto Sans Thai (Google Fonts via `next/font`) |

## Requirements

- **Node.js** 20+ (recommended for Next.js 16)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Development server       |
| `npm run build` | Production build       |
| `npm run start` | Start production server |
| `npm run lint`  | ESLint                   |

## Environment variables

| Variable                 | Required | Description |
| ------------------------ | -------- | ----------- |
| `NEXT_PUBLIC_SITE_URL`   | No       | Canonical site URL for SEO (`metadataBase`, Open Graph, sitemap, robots, JSON-LD). **Production** is set in [`.env.production`](./.env.production) to `https://ganarate-qr.vercel.app`. Override in Vercel **Environment Variables** if you use a custom domain. When unset locally, `VERCEL_URL` is used on Vercel; otherwise defaults to `http://localhost:3000`. |

## Project structure

```
app/
  layout.tsx       # Root layout, metadata, viewport, JSON-LD
  page.tsx         # Home page sections
  globals.css      # Tailwind + theme (incl. class-based dark)
  robots.ts        # /robots.txt
  sitemap.ts       # /sitemap.xml
components/
  QrWorkspace.tsx  # Main QR flow, header, history
  TypeSelector.tsx
  QRForm.tsx
  QRPreview.tsx
  UrlGenerator.tsx
  HowToUse.tsx
  Tips.tsx
  ThemeToggle.tsx
  Providers.tsx    # Toast provider + viewport
  ToastViewport.tsx
  SeoJsonLd.tsx
hooks/
  useToast.tsx
  useQrHistory.ts
lib/
  types.ts
  qrPayload.ts     # Encode mailto, tel, sms, wa.me, WIFI, vCard, etc.
  exportQrCanvas.ts
  siteUrl.ts       # SEO base URL helper
public/
  logo.jpg         # Branding + default OG / icon reference
```

## Privacy & data

All QR generation and the demo URL mapper run in the **browser**. History and short-link mappings are stored in **`localStorage`** on the user’s device—nothing is sent to your own backend unless you add one later.

## License

Private project (`"private": true` in `package.json`). Adjust license and repository fields if you open-source it.
