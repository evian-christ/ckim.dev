import type { Metadata } from "next";
import { DocumentBody, type DocumentSection } from "../document";

export const metadata: Metadata = {
  title: "Kava — Support",
  description: "Contact Kava support and get help with Kavita connections, comic imports and local data.",
  alternates: { canonical: "https://ckim.dev/kava/support/" },
};

const english: DocumentSection[] = [
  {
    title: "Having trouble connecting to Kavita?",
    paragraphs: ["First check that your server address opens in your device’s browser. Verify the server address, API key and your account’s library permissions. If your server is only accessible on a private network, connect to that network or the required VPN. If you select Kavita OPDS, you can paste your OPDS URL to connect."],
  },
  {
    title: "Which files can I import?",
    paragraphs: ["Use the + button in the file library to select CBZ or ZIP files, or a folder. Files are copied into the app and can be read offline without a server. Encrypted ZIP, ZIP64, CBR, 7z, PDF and EPUB imports are not currently supported. Make sure your device has enough free storage when importing files."],
  },
  {
    title: "How do I delete files or caches?",
    paragraphs: ["Press and hold an imported title to open file management and delete files. Clear cover caches in the app’s cache settings. Deleting local files or caches does not delete files or records on your Kavita server."],
  },
  {
    title: "What should I include in a support request?",
    paragraphs: ["Include the app version, device model, iOS or iPadOS version, steps to reproduce the problem and any error message. For server connection issues, the Kavita version is also helpful. Before attaching screenshots, hide passwords, API keys, authentication tokens, private server addresses and other sensitive details. You do not need to send the comic files themselves."],
  },
  {
    title: "Privacy requests",
    paragraphs: ["Use the same email address for privacy questions or requests to delete support correspondence. To delete information stored on a private Kavita server, contact that server’s operator."],
  },
];

function Contact() {
  return (
    <div>
      <p className="mb-2 text-sm">Contact Chan Kim, developer</p>
      <a href="mailto:kavareader@gmail.com?subject=Kava%20Support" className="break-all underline">kavareader@gmail.com</a>
      <p className="mt-3 text-sm leading-6">The email link opens your mail app. You can also copy the address and email directly.</p>
    </div>
  );
}

export default function SupportPage() {
  return (
    <>
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-semibold">Support</h1>
      </div>
      <DocumentBody intro="Email us with bug reports, feature requests or questions about your privacy." sections={english}><Contact /></DocumentBody>
    </>
  );
}
