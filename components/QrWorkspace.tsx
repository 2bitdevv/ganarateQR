"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Coffee, History, Trash2 } from "lucide-react";
import { TypeSelector } from "@/components/TypeSelector";
import { QRForm } from "@/components/QRForm";
import { QRPreview } from "@/components/QRPreview";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buildQrPayload, validatePayload } from "@/lib/qrPayload";
import { exportQrToDataUrl } from "@/lib/exportQrCanvas";
import type { FormState, QrType } from "@/lib/types";
import { defaultFormState } from "@/lib/types";
import { useToast } from "@/hooks/useToast";
import { useQrHistory, type HistoryItem } from "@/hooks/useQrHistory";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function QrWorkspace() {
  const { show } = useToast();
  const { items, add, remove, clear } = useQrHistory();

  const [qrType, setQrType] = useState<QrType>("url");
  const [form, setForm] = useState<FormState>(defaultFormState);
  const [fg, setFg] = useState("#1e1b4b");
  const [bg, setBg] = useState("#ffffff");
  const [logo, setLogo] = useState<string | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const patchForm = useCallback(<K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
  }, []);

  const onGenerate = async () => {
    const err = validatePayload(qrType, form);
    if (err) {
      show(err, "error");
      return;
    }
    const payload = buildQrPayload(qrType, form);
    setLoading(true);
    try {
      await sleep(420);
      setOutput(payload);
      add({ type: qrType, value: payload, fg, bg });
      show("สร้าง QR Code สำเร็จ", "success");
    } finally {
      setLoading(false);
    }
  };

  const onDownload = async () => {
    if (!output) return;
    try {
      const dataUrl = await exportQrToDataUrl(output, {
        width: 512,
        fg,
        bg,
        logoDataUrl: logo,
        logoRatio: 0.22,
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `qr-${Date.now()}.png`;
      a.click();
      show("ดาวน์โหลดแล้ว", "success");
    } catch (e) {
      show(e instanceof Error ? e.message : "ดาวน์โหลดไม่สำเร็จ", "error");
    }
  };

  const onCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      show("คัดลอกข้อมูลแล้ว", "success");
    } catch {
      show("คัดลอกไม่สำเร็จ", "error");
    }
  };

  const applyHistory = (h: HistoryItem) => {
    setQrType(h.type);
    setFg(h.fg);
    setBg(h.bg);
    setOutput(h.value);
    show("โหลดจากประวัติ", "info");
  };

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-20 pt-8 md:px-6 md:pt-12">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
          <Image
            src="/logo.png"
            alt="QR Code Generator logo"
            width={72}
            height={72}
            priority
            className="h-14 w-14 shrink-0 rounded-2xl bg-white/90 object-contain p-1 shadow-md ring-1 ring-slate-200/80 dark:bg-slate-900/80 dark:ring-white/10 sm:h-16 sm:w-16"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#FF5D39]">
              Modern QR
            </p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              QR Code Generator
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-300 md:text-base">
              สร้าง QR Code แบบ Modern ด้วยเทคโนโลยีล่าสุด
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 self-center sm:self-start">
          <a
            href="https://www.buymeacoffee.com/dev2bit"
            target="_blank"
            rel="noopener noreferrer"
            title="Tip me — Buy me a coffee"
            className="inline-flex items-center gap-2 rounded-full border border-amber-200/90 bg-linear-to-r from-amber-50 to-orange-50 px-3 py-2 text-sm font-semibold text-amber-950 shadow-sm transition hover:border-[#FF5D39]/40 hover:from-amber-100 hover:to-orange-100 dark:border-amber-900/50 dark:from-amber-950/40 dark:to-orange-950/30 dark:text-amber-100 dark:hover:border-[#FF5D39]/50"
          >
            <Coffee className="h-4 w-4 shrink-0 text-[#FF5D39]" aria-hidden />
            <span className="hidden sm:inline">Buy me a coffee</span>
            <span className="sm:hidden">Tip</span>
          </a>
          <ThemeToggle />
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70 md:p-8"
        >
          <div className="mb-6 inline-block rounded-lg border border-dashed border-slate-900/20 px-3 py-1.5 dark:border-white/25">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              เลือกประเภท
            </h2>
          </div>
          <TypeSelector value={qrType} onChange={setQrType} />

          <div className="mt-8">
            <QRForm
              type={qrType}
              form={form}
              onChange={patchForm}
              fgColor={fg}
              bgColor={bg}
              onFg={setFg}
              onBg={setBg}
              logoDataUrl={logo}
              onLogo={setLogo}
            />
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onGenerate}
            disabled={loading}
            className="mt-8 w-full rounded-full bg-[#FF5D39] py-3.5 text-center text-sm font-bold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
          >
            ✨ สร้าง QR Code
          </motion.button>
        </motion.section>

        <div className="flex flex-col gap-6">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70"
          >
            <h2 className="mb-4 text-center text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              ผลลัพธ์
            </h2>
            <QRPreview
              value={output}
              fg={fg}
              bg={bg}
              logoDataUrl={logo}
              isLoading={loading}
              onDownload={onDownload}
              onCopy={onCopy}
            />
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-white/50 bg-white/70 p-5 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white">
                <History className="h-4 w-4 text-[#FF5D39]" />
                ประวัติ (local)
              </h3>
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    clear();
                    show("ล้างประวัติแล้ว", "info");
                  }}
                  className="text-xs font-semibold text-slate-500 underline-offset-2 hover:text-[#FF5D39] hover:underline dark:text-slate-400"
                >
                  ล้างทั้งหมด
                </button>
              )}
            </div>
            {items.length === 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ยังไม่มีประวัติ — สร้าง QR แล้วจะบันทึกอัตโนมัติ
              </p>
            ) : (
              <ul className="max-h-64 space-y-2 overflow-y-auto pr-1">
                {items.map((h) => (
                  <li
                    key={h.id}
                    className="flex items-start gap-2 rounded-xl border border-slate-200/60 bg-white/80 p-2 text-xs dark:border-white/10 dark:bg-slate-950/40"
                  >
                    <button
                      type="button"
                      onClick={() => applyHistory(h)}
                      className="min-w-0 flex-1 text-left font-medium text-slate-800 transition hover:text-[#FF5D39] dark:text-slate-100"
                    >
                      <span className="block truncate text-[10px] uppercase text-slate-400">
                        {h.type}
                      </span>
                      <span className="line-clamp-2 break-all">{h.value}</span>
                    </button>
                    <button
                      type="button"
                      aria-label="ลบ"
                      onClick={() => remove(h.id)}
                      className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
