import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kava — Your book libraries",
  description: "Read your own comics and books from files and connected libraries with Kava for iPhone, iPad and Mac.",
  alternates: { canonical: "https://ckim.dev/kava/" },
};

export default function KavaPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Kava</h1>
        <p className="leading-8">A reader for comics and books you own or are authorized to access, on iPhone, iPad and Mac.</p>
      </div>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Your files and connected libraries</h2>
        <p className="leading-8">Read CBZ, ZIP, CBR, RAR, PDF, EPUB and TXT files. Connect libraries such as Kavita, Komga, OPDS and SMB, keep favorites, and return to your saved reading position.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Google Drive integration — in testing</h2>
        <p className="leading-8">Where available, sign in to Google, select a library folder and read its supported books. Kava reads your selected library without changing the Drive originals. Completed downloads support offline reading. Google sign-in connects your content and does not create a Kava account.</p>
        <p className="leading-8">Availability depends on the app version. Google verification and public release of this integration are still pending.</p>
      </section>
      <nav aria-label="Kava information" className="flex flex-wrap gap-6">
        <Link href="/kava/support/" className="underline">Support and contact</Link>
        <Link href="/kava/privacy/" className="underline">Privacy policy</Link>
      </nav>
      <p className="text-sm">Kava is developed by Chan Kim. Contact <a href="mailto:kavareader@gmail.com" className="underline">kavareader@gmail.com</a>.</p>
    </div>
  );
}
