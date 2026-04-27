"use client";

import type { FormState, QrType } from "@/lib/types";

type Props = {
  type: QrType;
  form: FormState;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  fgColor: string;
  bgColor: string;
  onFg: (v: string) => void;
  onBg: (v: string) => void;
  logoDataUrl: string | null;
  onLogo: (dataUrl: string | null) => void;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
      <span>{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200/90 bg-white/90 px-3 py-2.5 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#FF5D39] focus:ring-2 focus:ring-[#FF5D39]/25 dark:border-white/10 dark:bg-slate-950/50 dark:text-white dark:placeholder:text-slate-500";

export function QRForm({
  type,
  form,
  onChange,
  fgColor,
  bgColor,
  onFg,
  onBg,
  logoDataUrl,
  onLogo,
}: Props) {
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      onLogo(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onLogo(reader.result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-5">
      {type === "text" && (
        <Field label="ข้อความ">
          <textarea
            className={`${inputClass} min-h-[120px] resize-y`}
            value={form.text}
            onChange={(e) => onChange("text", e.target.value)}
            placeholder="พิมพ์ข้อความที่ต้องการเข้ารหัส"
          />
        </Field>
      )}

      {type === "url" && (
        <Field label="URL">
          <input
            className={inputClass}
            type="url"
            inputMode="url"
            value={form.url}
            onChange={(e) => onChange("url", e.target.value)}
            placeholder="https://example.com"
          />
        </Field>
      )}

      {type === "email" && (
        <>
          <Field label="อีเมล">
            <input
              className={inputClass}
              type="email"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="you@domain.com"
            />
          </Field>
          <Field label="หัวข้อ (ไม่บังคับ)">
            <input
              className={inputClass}
              value={form.emailSubject}
              onChange={(e) => onChange("emailSubject", e.target.value)}
              placeholder="Subject"
            />
          </Field>
          <Field label="เนื้อหา (ไม่บังคับ)">
            <textarea
              className={`${inputClass} min-h-[88px] resize-y`}
              value={form.emailBody}
              onChange={(e) => onChange("emailBody", e.target.value)}
              placeholder="ข้อความในอีเมล"
            />
          </Field>
        </>
      )}

      {type === "phone" && (
        <Field label="เบอร์โทรศัพท์">
          <input
            className={inputClass}
            type="tel"
            value={form.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+66 81 234 5678 หรือ 0812345678"
          />
        </Field>
      )}

      {type === "sms" && (
        <>
          <Field label="เบอร์ผู้รับ">
            <input
              className={inputClass}
              type="tel"
              value={form.smsNumber}
              onChange={(e) => onChange("smsNumber", e.target.value)}
              placeholder="0812345678"
            />
          </Field>
          <Field label="ข้อความ (ไม่บังคับ)">
            <textarea
              className={`${inputClass} min-h-[88px] resize-y`}
              value={form.smsBody}
              onChange={(e) => onChange("smsBody", e.target.value)}
            />
          </Field>
        </>
      )}

      {type === "whatsapp" && (
        <>
          <Field label="เบอร์ WhatsApp (รหัสประเทศ + เบอร์)">
            <input
              className={inputClass}
              type="tel"
              value={form.waPhone}
              onChange={(e) => onChange("waPhone", e.target.value)}
              placeholder="66812345678"
            />
          </Field>
          <Field label="ข้อความเริ่มต้น (ไม่บังคับ)">
            <textarea
              className={`${inputClass} min-h-[88px] resize-y`}
              value={form.waMessage}
              onChange={(e) => onChange("waMessage", e.target.value)}
            />
          </Field>
        </>
      )}

      {type === "wifi" && (
        <>
          <Field label="ชื่อเครือข่าย (SSID)">
            <input
              className={inputClass}
              value={form.wifiSsid}
              onChange={(e) => onChange("wifiSsid", e.target.value)}
              placeholder="MyWiFi"
            />
          </Field>
          <Field label="รหัสผ่าน">
            <input
              className={inputClass}
              type="password"
              value={form.wifiPass}
              onChange={(e) => onChange("wifiPass", e.target.value)}
              placeholder="••••••••"
              disabled={form.wifiEncryption === "nopass"}
            />
          </Field>
          <Field label="การเข้ารหัส">
            <select
              className={inputClass}
              value={form.wifiEncryption}
              onChange={(e) =>
                onChange(
                  "wifiEncryption",
                  e.target.value as FormState["wifiEncryption"]
                )
              }
            >
              <option value="WPA">WPA / WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">ไม่มีรหัส (Open)</option>
            </select>
          </Field>
        </>
      )}

      {type === "vcard" && (
        <>
          <Field label="ชื่อ-นามสกุล *">
            <input
              className={inputClass}
              value={form.vcardName}
              onChange={(e) => onChange("vcardName", e.target.value)}
              placeholder="ชื่อที่แสดงเมื่อบันทึก"
            />
          </Field>
          <Field label="โทรศัพท์">
            <input
              className={inputClass}
              type="tel"
              value={form.vcardPhone}
              onChange={(e) => onChange("vcardPhone", e.target.value)}
            />
          </Field>
          <Field label="อีเมล">
            <input
              className={inputClass}
              type="email"
              value={form.vcardEmail}
              onChange={(e) => onChange("vcardEmail", e.target.value)}
            />
          </Field>
          <Field label="องค์กร">
            <input
              className={inputClass}
              value={form.vcardOrg}
              onChange={(e) => onChange("vcardOrg", e.target.value)}
            />
          </Field>
        </>
      )}

      <div className="grid gap-4 border-t border-slate-200/70 pt-4 dark:border-white/10 sm:grid-cols-2">
        <Field label="สีจุด QR (foreground)">
          <div className="flex gap-2">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => onFg(e.target.value)}
              className="h-11 w-14 cursor-pointer rounded-lg border border-slate-200 bg-white p-1 dark:border-white/10"
            />
            <input
              className={inputClass}
              value={fgColor}
              onChange={(e) => onFg(e.target.value)}
            />
          </div>
        </Field>
        <Field label="สีพื้นหลัง QR">
          <div className="flex gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => onBg(e.target.value)}
              className="h-11 w-14 cursor-pointer rounded-lg border border-slate-200 bg-white p-1 dark:border-white/10"
            />
            <input
              className={inputClass}
              value={bgColor}
              onChange={(e) => onBg(e.target.value)}
            />
          </div>
        </Field>
      </div>

      <Field label="โลโก้ตรงกลาง (ไม่บังคับ, แนะนำ PNG สี่เหลี่ยม)">
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-[#FF5D39]/50 dark:border-white/10 dark:bg-white/5 dark:text-white">
            <span>เลือกรูป</span>
            <input type="file" accept="image/*" className="hidden" onChange={onFile} />
          </label>
          {logoDataUrl && (
            <button
              type="button"
              onClick={() => onLogo(null)}
              className="text-sm font-medium text-[#FF5D39] underline-offset-2 hover:underline"
            >
              ลบโลโก้
            </button>
          )}
        </div>
      </Field>
    </div>
  );
}
