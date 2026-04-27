"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "@/hooks/useToast";
import { ToastViewport } from "@/components/ToastViewport";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <ToastViewport />
    </ToastProvider>
  );
}
