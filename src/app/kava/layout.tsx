import Link from "next/link";

export default function KavaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 selection:bg-orange-100 [&_a]:underline-offset-4 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-orange-800">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:bg-white focus:p-3">
        Skip to content / 본문으로 이동
      </a>
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <header className="flex flex-wrap items-center justify-between gap-5 border-b border-stone-200 py-7">
          <span className="text-2xl font-semibold tracking-tight">Kava<span className="text-orange-800">.</span></span>
          <nav aria-label="Kava" className="flex flex-wrap gap-5 text-sm text-stone-600">
            <Link href="/kava/privacy/" className="hover:text-orange-800 hover:underline">Privacy · 개인정보</Link>
            <Link href="/kava/support/" className="hover:text-orange-800 hover:underline">Support · 고객지원</Link>
          </nav>
        </header>
        <main id="content" className="py-12 sm:py-16">{children}</main>
        <footer className="flex flex-wrap justify-between gap-4 border-t border-stone-200 py-8 text-sm text-stone-600">
          <Link href="/" className="hover:underline">© 2026 Chan Kim</Link>
          <a href="mailto:kavareader@gmail.com" className="break-all hover:underline">kavareader@gmail.com</a>
        </footer>
      </div>
    </div>
  );
}
