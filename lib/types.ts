export type QrType =
  | "text"
  | "url"
  | "email"
  | "phone"
  | "sms"
  | "whatsapp"
  | "wifi"
  | "vcard";

export const QR_TYPES: { id: QrType; labelTh: string; labelEn: string }[] = [
  { id: "text", labelTh: "ข้อความ", labelEn: "Text" },
  { id: "url", labelTh: "URL", labelEn: "URL" },
  { id: "email", labelTh: "อีเมล", labelEn: "Email" },
  { id: "phone", labelTh: "โทรศัพท์", labelEn: "Phone" },
  { id: "sms", labelTh: "SMS", labelEn: "SMS" },
  { id: "whatsapp", labelTh: "WhatsApp", labelEn: "WhatsApp" },
  { id: "wifi", labelTh: "WiFi", labelEn: "WiFi" },
  { id: "vcard", labelTh: "Contact (vCard)", labelEn: "Contact" },
];

export type FormState = {
  text: string;
  url: string;
  email: string;
  emailSubject: string;
  emailBody: string;
  phone: string;
  smsNumber: string;
  smsBody: string;
  waPhone: string;
  waMessage: string;
  wifiSsid: string;
  wifiPass: string;
  wifiEncryption: "WPA" | "WEP" | "nopass";
  vcardName: string;
  vcardPhone: string;
  vcardEmail: string;
  vcardOrg: string;
};

export const defaultFormState = (): FormState => ({
  text: "",
  url: "",
  email: "",
  emailSubject: "",
  emailBody: "",
  phone: "",
  smsNumber: "",
  smsBody: "",
  waPhone: "",
  waMessage: "",
  wifiSsid: "",
  wifiPass: "",
  wifiEncryption: "WPA",
  vcardName: "",
  vcardPhone: "",
  vcardEmail: "",
  vcardOrg: "",
});
