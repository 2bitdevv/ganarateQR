import { QrWorkspace } from "@/components/QrWorkspace";
import { UrlGenerator } from "@/components/UrlGenerator";
import { HowToUse } from "@/components/HowToUse";
import { Tips } from "@/components/Tips";

export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <div
        className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-fuchsia-200/40 blur-3xl dark:bg-fuchsia-900/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-orange-200/50 blur-3xl dark:bg-orange-900/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-indigo-200/35 blur-3xl dark:bg-indigo-900/20"
        aria-hidden
      />

      <QrWorkspace />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-24 md:px-6">
        <UrlGenerator />
        <HowToUse />
        <Tips />
      </div>

      <footer className="relative z-10 border-t border-white/30 py-8 text-center text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
        Built by <a href="https://github.com/2bitdevv" target="_blank" rel="">2bit</a>
      </footer>
    </div>
  );
}
