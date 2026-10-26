import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kava — Your book libraries",
  description: "Read comics and books from files and connected libraries. Learn about Kava’s Google Drive, OneDrive and Dropbox connections, support and privacy.",
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
        <h2 className="text-lg font-semibold">Your cloud libraries</h2>
        <p className="leading-8">Where available, connect Google Drive, OneDrive or Dropbox, choose an existing library folder, and browse its supported books. Sign in with the service that stores your files; you do not need a Kava account or a separate book server.</p>
        <ul className="list-disc space-y-2 pl-6 leading-8">
          <li><strong>Google Drive:</strong> folders in My Drive. One Google account can be connected at a time.</li>
          <li><strong>OneDrive:</strong> folders in a personal Microsoft account. Currently available for testing on iPhone and iPad.</li>
          <li><strong>Dropbox:</strong> existing folders in your personal library. Dropbox Business team spaces are not included.</li>
        </ul>
        <p className="leading-8">Cloud connections are in testing. Availability depends on your app version and platform; this page does not announce public release or approval by the cloud providers. See <Link href="/kava/support/" className="underline">connection help</Link> for the current scope.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Read online, keep books offline</h2>
        <p className="leading-8">Choose a book and let its download finish before reading. Completed copies can be read offline, with your reading position saved on the device. Browsing a library does not download every book.</p>
        <p className="leading-8">Cloud connections read your files without uploading, editing or deleting the originals. Downloaded copies, cover caches and connection permissions can be managed separately. Our <Link href="/kava/privacy/" className="underline">privacy policy</Link> explains the requested permissions and external book metadata lookups.</p>
      </section>
      <nav aria-label="Kava information" className="flex flex-wrap gap-6">
        <Link href="/kava/support/" className="underline">Support and contact</Link>
        <Link href="/kava/privacy/" className="underline">Privacy policy</Link>
      </nav>
      <p className="text-sm leading-6">Kava is developed by Chan Kim and is not affiliated with Google, Microsoft or Dropbox. Contact <a href="mailto:kavareader@gmail.com" className="underline">kavareader@gmail.com</a>.</p>
    </div>
  );
}
