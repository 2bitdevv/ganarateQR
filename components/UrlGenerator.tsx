"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, Copy } from "lucide-react";
import { useToast } from "@/hooks/useToast";

function randomId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < 8; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s;
}

export function UrlGenerator() {
  const { show } = useToast();
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = longUrl.trim();
    if (!u) {
      show("กรุณากรอก URL", "error");
      return;
    }
    const normalized = u.startsWith("http") ? u : `https://${u}`;
    let storedHref: string;
    try {
      storedHref = new URL(normalized).href;
    } catch {
      show("รูปแบบ URL ไม่ถูกต้อง", "error");
      return;
    }
    const id = randomId();
    setShortUrl(`serverexpert.online/qr/${id}`);
    try {
      const key = `qr-short:${id}`;
      localStorage.setItem(key, storedHref);
    } catch {
      /* ignore */
    }
    show("สร้างลิงก์สำเร็จ (จำลองในเครื่อง)", "success");
  };

  const copy = async () => {
    if (!shortUrl) return;
    const full = shortUrl.startsWith("http") ? shortUrl : `https://${shortUrl}`;
    try {
      await navigator.clipboard.writeText(full);
      show("คัดลอกแล้ว", "success");
    } catch {
      show("คัดลอกไม่สำเร็จ", "error");
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 md:p-8"
    >
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          สร้างลิงก์แชร์ (URL Generator)
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          สร้างลิงก์แชร์จากโดเมนของคุณ{" "}
          <span className="font-mono font-semibold text-[#FF5D39]">
            serverexpert.online/qr/
          </span>{" "}
          ได้ทันที
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
          <span>URL ยาว</span>
          <input
            className="w-full rounded-xl border border-slate-200/90 bg-white/90 px-3 py-3 text-slate-900 shadow-sm outline-none transition focus:border-[#FF5D39] focus:ring-2 focus:ring-[#FF5D39]/25 dark:border-white/10 dark:bg-slate-950/50 dark:text-white"
            placeholder="https://example.com/very/long/path"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5D39] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 active:scale-[0.99]"
        >
          <Link2 className="h-4 w-4" aria-hidden />
          🔗 สร้างลิงก์
        </button>
      </form>

      {shortUrl && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-slate-950/50"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            ลิงก์สั้น (จำลอง)
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <code className="break-all text-sm font-mono text-slate-900 dark:text-white">
              {shortUrl}
            </code>
            <button
              type="button"
              onClick={copy}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-[#FF5D39]/40 dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              <Copy className="h-4 w-4" />
              คัดลอก
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            หมายเหตุ: การทำงานจริงต้องมีเซิร์ฟเวอร์ — ตอนนี้บันทึกคู่แมปใน localStorage
            เท่านั้น
          </p>
        </motion.div>
      )}
    </motion.section>
  );
}
