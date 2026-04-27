"use client";

import { useCallback, useEffect, useState } from "react";
import type { QrType } from "@/lib/types";

const STORAGE_KEY = "qr-gen-history-v1";
const MAX = 24;

export type HistoryItem = {
  id: string;
  type: QrType;
  value: string;
  createdAt: number;
  fg: string;
  bg: string;
};

function load(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryItem[];
    return Array.isArray(parsed) ? parsed.slice(0, MAX) : [];
  } catch {
    return [];
  }
}

export function useQrHistory() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setItems(load());
  }, []);

  const add = useCallback((entry: Omit<HistoryItem, "id" | "createdAt">) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}`;
    const row: HistoryItem = {
      ...entry,
      id,
      createdAt: Date.now(),
    };
    setItems((prev) => {
      const next = [row, ...prev].slice(0, MAX);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore quota */
      }
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((x) => x.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return { items, add, remove, clear };
}
