"use client";

import type { ElementType } from "react";
import { motion } from "framer-motion";
import {
  Type,
  Link,
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  Wifi,
  UserRound,
} from "lucide-react";
import type { QrType } from "@/lib/types";

const rows: {
  type: QrType;
  icon: ElementType;
  title: string;
  desc: string;
}[] = [
  {
    type: "url",
    icon: Link,
    title: "URL",
    desc: "ลิงก์เว็บไซต์ — สแกนแล้วเปิดหน้าเว็บได้ทันที",
  },
  {
    type: "email",
    icon: Mail,
    title: "Email",
    desc: "เปิดแอปอีเมลพร้อมผู้รับ หัวข้อ และข้อความที่ตั้งไว้",
  },
  {
    type: "phone",
    icon: Phone,
    title: "Phone",
    desc: "โทรออกได้เลยจากแอปโทรศัพท์ (tel:)",
  },
  {
    type: "sms",
    icon: MessageSquare,
    title: "SMS",
    desc: "เปิดข้อความพร้อมเบอร์และข้อความตั้งต้น",
  },
  {
    type: "whatsapp",
    icon: MessageCircle,
    title: "WhatsApp",
    desc: "เริ่มแชท WhatsApp กับเบอร์ที่กำหนด",
  },
  {
    type: "wifi",
    icon: Wifi,
    title: "WiFi",
    desc: "เชื่อมต่อ Wi‑Fi อัตโนมัติโดยไม่ต้องพิมพ์รหัส",
  },
  {
    type: "vcard",
    icon: UserRound,
    title: "Contact (vCard)",
    desc: "บันทึกผู้ติดต่อลงสมุดโทรศัพท์ได้ทันที",
  },
  {
    type: "text",
    icon: Type,
    title: "Text",
    desc: "แสดงข้อความธรรมดาเมื่อสแกน (เหมาะกับข้อความสั้น ๆ)",
  },
];

export function HowToUse() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 md:p-8"
    >
      <div className="mb-6 inline-block rounded-lg border border-dashed border-slate-900/20 px-3 py-1.5 dark:border-white/25">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
          วิธีใช้งานแต่ละประเภท
        </h2>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {rows.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.li
              key={r.type}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex gap-3 rounded-2xl border border-slate-200/60 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-950/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF5D39]/15 to-indigo-100 text-[#FF5D39] dark:from-[#FF5D39]/25 dark:to-slate-800 dark:text-[#FF7a5c]">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {r.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {r.desc}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </motion.section>
  );
}
