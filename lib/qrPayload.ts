import type { FormState, QrType } from "./types";

/** Escape special chars for WiFi QR (WIFI: format). */
function escapeWifiField(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/:/g, "\\:");
}

function normalizeUrl(input: string): string {
  const t = input.trim();
  if (!t) return "";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

function buildMailto(f: FormState): string {
  const email = f.email.trim();
  if (!email) return "";
  const params = new URLSearchParams();
  if (f.emailSubject.trim()) params.set("subject", f.emailSubject.trim());
  if (f.emailBody.trim()) params.set("body", f.emailBody.trim());
  const q = params.toString();
  return q ? `mailto:${email}?${q}` : `mailto:${email}`;
}

function buildSms(f: FormState): string {
  const num = digitsOnly(f.smsNumber);
  if (!num) return "";
  const body = f.smsBody.trim();
  if (body) return `sms:${num}?body=${encodeURIComponent(body)}`;
  return `sms:${num}`;
}

function buildWhatsApp(f: FormState): string {
  const num = digitsOnly(f.waPhone);
  if (!num) return "";
  const msg = f.waMessage.trim();
  const base = `https://wa.me/${num}`;
  return msg ? `${base}?text=${encodeURIComponent(msg)}` : base;
}

function buildWifi(f: FormState): string {
  const ssid = f.wifiSsid.trim();
  if (!ssid) return "";
  const enc = f.wifiEncryption;
  const T = enc === "nopass" ? "nopass" : enc;
  const S = escapeWifiField(ssid);
  const P = escapeWifiField(f.wifiPass);
  if (enc === "nopass") {
    return `WIFI:T:nopass;S:${S};;`;
  }
  return `WIFI:T:${T};S:${S};P:${P};;`;
}

function buildVcard(f: FormState): string {
  const name = f.vcardName.trim();
  if (!name) return "";
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    f.vcardPhone.trim() ? `TEL:${f.vcardPhone.trim()}` : "",
    f.vcardEmail.trim() ? `EMAIL:${f.vcardEmail.trim()}` : "",
    f.vcardOrg.trim() ? `ORG:${f.vcardOrg.trim()}` : "",
    "END:VCARD",
  ].filter(Boolean);
  return lines.join("\n");
}

export function buildQrPayload(type: QrType, f: FormState): string {
  switch (type) {
    case "text":
      return f.text.trim();
    case "url": {
      const u = f.url.trim();
      return u ? normalizeUrl(u) : "";
    }
    case "email":
      return buildMailto(f);
    case "phone": {
      const raw = f.phone.trim().replace(/\s/g, "");
      return raw ? `tel:${raw}` : "";
    }
    case "sms":
      return buildSms(f);
    case "whatsapp":
      return buildWhatsApp(f);
    case "wifi":
      return buildWifi(f);
    case "vcard":
      return buildVcard(f);
    default:
      return "";
  }
}

export function validatePayload(type: QrType, f: FormState): string | null {
  const v = buildQrPayload(type, f);
  if (v) return null;
  switch (type) {
    case "text":
      return "กรุณากรอกข้อความ";
    case "url":
      return "กรุณากรอก URL";
    case "email":
      return "กรุณากรอกอีเมล";
    case "phone":
      return "กรุณากรอกเบอร์โทรศัพท์ (เช่น +66 หรือ 0xx)";
    case "sms":
      return "กรุณากรอกเบอร์ SMS";
    case "whatsapp":
      return "กรุณากรอกเบอร์ WhatsApp";
    case "wifi":
      return "กรุณากรอกชื่อ WiFi (SSID)";
    case "vcard":
      return "กรุณากรอกชื่อผู้ติดต่อ";
    default:
      return "ข้อมูลไม่ครบ";
  }
}
