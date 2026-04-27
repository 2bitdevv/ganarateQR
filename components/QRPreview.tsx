"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Download, Loader2 } from "lucide-react";

const QRCodeSVG = dynamic(() => import("react-qr-code"), { ssr: false });

type Props = {
  value: string | null;
  fg: string;
  bg: string;
  logoDataUrl: string | null;
  isLoading: boolean;
  onDownload: () => void;
  onCopy: () => void;
  downloadDisabled?: boolean;
};

export function QRPreview({
  value,
  fg,
  bg,
  logoDataUrl,
  isLoading,
  onDownload,
  onCopy,
  downloadDisabled,
}: Props) {
  const size = 240;
  const has = Boolean(value && value.length > 0);
  const logoPx = Math.round(size * 0.22);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex min-h-[280px] w-full max-w-[280px] items-center justify-center rounded-3xl border border-dashed border-slate-300/80 bg-white/50 p-4 dark:border-white/15 dark:bg-slate-950/40">
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="load"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-3xl bg-white/70 backdrop-blur-sm dark:bg-slate-950/70"
            >
              <Loader2 className="h-10 w-10 animate-spin text-[#FF5D39]" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                กำลังสร้าง QR…
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {!has && !isLoading && (
          <p className="text-center text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            กรอกข้อมูลและกดสร้าง QR Code
          </p>
        )}

        {has && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative rounded-2xl bg-white p-3 shadow-lg dark:bg-slate-900"
            style={{ width: size + 24, height: size + 24 }}
          >
            <div className="relative" style={{ width: size, height: size }}>
              <QRCodeSVG
                value={value!}
                size={size}
                fgColor={fg}
                bgColor={bg}
                level="H"
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
              {logoDataUrl && (
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl shadow-sm ring-2 ring-white/90 dark:ring-slate-900/90"
                  style={{
                    width: logoPx + 12,
                    height: logoPx + 12,
                    backgroundColor: bg,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoDataUrl}
                    alt=""
                    width={logoPx}
                    height={logoPx}
                    className="object-contain"
                    style={{ maxWidth: logoPx, maxHeight: logoPx }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onDownload}
          disabled={!has || isLoading || downloadDisabled}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5D39] px-5 py-3 text-sm font-semibold text-white shadow-md transition enabled:hover:brightness-110 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Download className="h-4 w-4" />
          ดาวน์โหลด PNG
        </button>
        <button
          type="button"
          onClick={onCopy}
          disabled={!has || isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-[#FF5D39]/40 hover:text-[#FF5D39] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-[#FF7a5c]"
        >
          <Copy className="h-4 w-4" />
          คัดลอกข้อมูล
        </button>
      </div>
    </div>
  );
}
