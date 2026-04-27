"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/hooks/useToast";

export function ToastViewport() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="pointer-events-auto rounded-2xl border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur-md"
            style={{
              background:
                t.kind === "success"
                  ? "rgba(255,255,255,0.92)"
                  : t.kind === "error"
                    ? "rgba(254, 226, 226, 0.95)"
                    : "rgba(255,255,255,0.9)",
              borderColor:
                t.kind === "success"
                  ? "rgba(34,197,94,0.35)"
                  : t.kind === "error"
                    ? "rgba(239,68,68,0.4)"
                    : "rgba(148,163,184,0.5)",
              color:
                t.kind === "error" ? "#7f1d1d" : "#0f172a",
            }}
          >
            <button
              type="button"
              className="absolute right-2 top-2 rounded-full p-1 text-xs opacity-50 hover:opacity-100"
              onClick={() => dismiss(t.id)}
              aria-label="ปิด"
            >
              ×
            </button>
            <p className="pr-6">{t.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
