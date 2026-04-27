"use client";

import { motion } from "framer-motion";
import type { QrType } from "@/lib/types";
import { QR_TYPES } from "@/lib/types";

type Props = {
  value: QrType;
  onChange: (t: QrType) => void;
};

export function TypeSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-4">
      {QR_TYPES.map((t, i) => {
        const active = value === t.id;
        return (
          <motion.button
            key={t.id}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(t.id)}
            className={[
              "relative rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition-all duration-200",
              active
                ? "border-[#FF5D39] bg-[#FF5D39]/10 text-slate-900 shadow-md ring-2 ring-[#FF5D39]/30 dark:border-[#FF5D39] dark:bg-[#FF5D39]/15 dark:text-white"
                : "border-slate-200/80 bg-white/60 text-slate-700 hover:border-[#FF5D39]/40 hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-[#FF5D39]/50",
            ].join(" ")}
          >
            {active && (
              <span
                className="pointer-events-none absolute inset-1 rounded-xl border border-dashed border-slate-900/25 dark:border-white/25"
                aria-hidden
              />
            )}
            <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.labelEn}
            </span>
            <span className="block">{t.labelTh}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
