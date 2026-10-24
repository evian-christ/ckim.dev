import type { Metadata } from "next";
import { DocumentBody, type DocumentSection } from "../document";

export const metadata: Metadata = {
  title: "Kava — Support",
  description: "Help with Kava libraries, Google Drive, book files, offline reading and privacy inquiries.",
  alternates: { canonical: "https://ckim.dev/kava/support/" },
};

const english: DocumentSection[] = [
  {
    title: "How do I connect Google Drive?",
    paragraphs: ["Google Drive is currently being tested and may not be available in your installed version. Where available, choose Google Drive when adding a connection, sign in to Google, select your library folder, and connect. You do not need a separate book server or a Kava account. The Google permission allows viewing and downloading Drive files; Kava displays the supported books under your chosen folder. Google Drive integration is not yet presented here as publicly verified or released."],
  },
  {
    title: "Google sign-in did not finish",
    paragraphs: ["Return to Kava and try the connection again. If access was revoked or the sign-in expired, sign in again with the same Google account from Add Connection. Kava currently supports one Google account at a time; multiple folders from that account can be connected subject to the app’s connection limits. If Google says the app is unverified or blocks sign-in, public verification may not be complete. Contact support; do not bypass a warning for an app you do not recognize."],
  },
  {
    title: "Can I read offline?",
    paragraphs: ["A remote book must finish downloading before offline reading. Open it once, approve the download when asked, and wait for the reader to open. Completed copies can then be used offline, including after restarting the app, while the connection remains enabled. Viewing a library listing alone does not download every book. Deleting a download removes its local copy; opening it again requires a download. Menu downloads and multiple connections may require Kava Pro; reading downloads follow the app’s reading policy."],
  },
  {
    title: "Having trouble with a server or file share?",
    paragraphs: ["Check the selected service, address, credentials and library permissions. For Kavita, Komga or OPDS, check that the address opens in your browser. For SMB, check the share address and account permissions. If the service is on a private network, connect to that network or the required VPN. Never send your API key, password or sign-in token in a support request."],
  },
  {
    title: "Which files can I read?",
    paragraphs: ["Kava’s readers support CBZ, ZIP, CBR, RAR, PDF, EPUB and TXT. Use the file library’s add/import action to select books or a folder, or open supported books from a connected library. Password-protected, damaged or unusual archive variants may not open. Keep enough free storage for the original file and temporary reading data. Google Docs and Drive shortcuts are not treated as book files."],
  },
  {
    title: "How do I disconnect or delete data?",
    paragraphs: ["Disconnect a saved library in connection settings. Remove downloaded copies through download management, imported files through file management, and cover caches through cache settings. These actions do not delete the originals in Google Drive or on your server. Disconnecting and deleting downloads are separate actions. To revoke Google-wide access, use the third-party connections page in your Google Account. Existing downloaded copies must be deleted separately."],
  },
  {
    title: "What should I include in a support request?",
    paragraphs: ["Include the Kava version, device model, iOS/iPadOS or macOS version, the service involved, steps to reproduce the problem and the displayed error. For file issues, include only its format and approximate size; for server issues, the server software version helps. Hide email addresses, passwords, API keys, tokens, file IDs, private paths and server addresses in screenshots. You do not need to send the books themselves."],
  },
  {
    title: "Privacy requests",
    paragraphs: ["Use the support email below for privacy questions or requests to delete support correspondence. To remove data held by a connected server or cloud service, use its settings or contact its operator. See Kava’s privacy policy for storage, external metadata lookups and deletion details."],
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
      <DocumentBody intro="Get help with Kava on iPhone, iPad and Mac. Feature availability depends on your app version." sections={english}><Contact /></DocumentBody>
      <a href="https://myaccount.google.com/connections" className="mt-8 inline-block text-sm underline">Manage Google account connections</a>
    </>
  );
}
