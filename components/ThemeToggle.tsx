"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "qr-theme-pref";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(KEY);
    if (stored === "dark" || stored === "light") {
      setDark(stored === "dark");
      document.documentElement.classList.toggle("dark", stored === "dark");
      return;
    }
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefers);
    document.documentElement.classList.toggle("dark", prefers);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      /* ignore */
    }
  };

  if (!mounted) {
    return (
      <span className="inline-flex h-10 w-10 rounded-full border border-transparent" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-800 shadow-sm transition hover:border-[#FF5D39]/40 hover:text-[#FF5D39] dark:border-white/10 dark:bg-white/5 dark:text-white"
      aria-label={dark ? "โหมดสว่าง" : "โหมดมืด"}
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
