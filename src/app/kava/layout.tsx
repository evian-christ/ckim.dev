import Link from "next/link";

export default function KavaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black [&_a]:underline-offset-4 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-black">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:bg-white focus:p-3">
        Skip to content / 본문으로 이동
      </a>
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <header className="flex flex-wrap items-center justify-between gap-5 py-7">
          <span className="text-xl font-semibold">Kava</span>
          <nav aria-label="Kava" className="flex flex-wrap gap-5 text-sm">
            <Link href="/kava/privacy/" className="underline">Privacy · 개인정보</Link>
            <Link href="/kava/support/" className="underline">Support · 고객지원</Link>
          </nav>
        </header>
        <main id="content" className="py-8 sm:py-10">{children}</main>
        <footer className="flex flex-wrap justify-between gap-4 py-8 text-sm">
          <Link href="/" className="underline">© 2026 Chan Kim</Link>
          <a href="mailto:kavareader@gmail.com" className="break-all underline">kavareader@gmail.com</a>
        </footer>
      </div>
    </div>
  );
}
