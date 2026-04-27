"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function Tips() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-[#FF5D39]/25 bg-gradient-to-r from-[#FF5D39]/10 via-white/80 to-indigo-50/80 p-6 shadow-lg backdrop-blur-md dark:border-[#FF5D39]/30 dark:from-[#FF5D39]/15 dark:via-slate-900/60 dark:to-slate-900/40 md:p-8"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF5D39] text-white shadow-md">
          <Sparkles className="h-6 w-6" aria-hidden />
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white md:text-xl">
            เคล็ดลับ
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-200 md:text-base">
            QR Code ที่สร้างสามารถใช้ได้ทันทีและถาวร ไม่มีวันหมดอายุ
            รองรับการสแกนด้วยกล้องมือถือทุกรุ่น
          </p>
        </div>
      </div>
    </motion.section>
  );
}
