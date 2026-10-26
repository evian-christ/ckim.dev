import type { Metadata } from "next";
import { DocumentBody, type DocumentSection } from "../document";

export const metadata: Metadata = {
  title: "Kava — Support",
  description: "Help connecting Google Drive, OneDrive, Dropbox and other Kava libraries, reading books offline, managing covers and removing data.",
  alternates: { canonical: "https://ckim.dev/kava/support/" },
};

const english: DocumentSection[] = [
  {
    title: "How do I connect a cloud library?",
    paragraphs: ["Where available, open Kava’s connection settings, add a connection and choose Google Drive, OneDrive or Dropbox. Sign in on the provider’s authorization screen, approve file access, choose your existing library folder and connect. Kava lists supported books in that folder and its supported descendants. You do not need a Kava account or a separate book server. The requested permission can cover more of your cloud account than the folder displayed in Kava; see the privacy policy for the provider-specific scope. Kava uses read permissions and does not upload, edit or delete the originals."],
  },
  {
    title: "Which accounts and folders are supported?",
    paragraphs: [
      "Google Drive: folders in My Drive and one Google account at a time. Multiple folders from that account are subject to Kava’s connection limits. Workspace Shared Drives, Drive shortcuts and Google Docs are not part of the current book-library support.",
      "OneDrive: personal Microsoft accounts, currently for testing on iPhone and iPad. Work or school accounts and SharePoint libraries are not supported. OneDrive sign-in is not currently available in Kava for Mac.",
      "Dropbox: existing folders in your personal library. Dropbox Business team spaces and team administration are not included. Where supported, multiple accounts and folders follow Kava’s connection and Pro limits.",
    ],
  },
  {
    title: "A connection is missing or sign-in did not finish",
    paragraphs: [
      "Cloud connections are in testing and may not appear in your installed version or on every platform. Provider verification, development-mode access or account restrictions can also affect sign-in. This website does not announce public approval or release by Google, Microsoft or Dropbox.",
      "If sign-in was cancelled, return to Kava and try again. If access expired or was revoked, sign in again with the same account. For OneDrive, choose a personal Microsoft account. If the provider displays an unverified-app warning or blocks sign-in, contact support with the displayed message. Never share a sign-in code, password or token.",
    ],
  },
  {
    title: "Can I read offline?",
    paragraphs: ["A remote book must finish downloading before offline reading. Open it once, approve the download when asked, and wait for the reader to open. Completed copies can then be used offline, including after restarting the app, while the connection remains enabled. Viewing a library listing alone does not download every book. Deleting a download removes its local copy; opening it again requires a download. Menu downloads and multiple connections may require Kava Pro; reading downloads follow the app’s reading policy."],
  },
  {
    title: "A cover is missing, but the book is listed",
    paragraphs: ["Covers can come from a separate image, the cloud provider’s thumbnail or extraction from a supported book. If no usable cover can be read, Kava may display a default cover even when the original is available. Check whether the book opens, whether its format is supported and whether it is password-protected or damaged. Refresh the library if the file changed. Report the service, file format and displayed error; you do not need to send the book itself."],
  },
  {
    title: "Having trouble with a server or file share?",
    paragraphs: ["Check the selected service, address, credentials and library permissions. For Kavita, Komga or OPDS, check that the address opens in your browser. For SMB, check the share address and account permissions. If the service is on a private network, connect to that network or the required VPN. Never send your API key, password or sign-in token in a support request."],
  },
  {
    title: "Which files can I read?",
    paragraphs: ["Kava’s readers support CBZ, ZIP, CBR, RAR, PDF, EPUB and TXT. Use the file library’s add/import action to select books or a folder, or open supported books from a connected library. Password-protected, DRM-protected, damaged or unusual archive variants may not open. Keep enough free storage for the original file and temporary reading data. Connecting a cloud folder does not turn Google Docs or other cloud-native documents into supported book files."],
  },
  {
    title: "How do I disconnect or delete data?",
    paragraphs: [
      "Remove a saved library in Kava’s connection settings. Remove downloaded copies through download management, imported files through file management and cover caches through cache settings. These are separate actions: removing a connection does not automatically delete downloaded copies or revoke the provider-wide authorization. Removing the last connection for an account clears its local sign-in information; another connection may still use that account.",
      "Google: remove Kava from your Google Account’s third-party connections. Microsoft: remove Kava in your personal Microsoft account’s app permission management. Dropbox: disconnect Kava under connected apps in Dropbox account settings. Direct links are provided below. Revoking authorization stops future authorized access but does not erase existing downloads. Deleting local copies does not change the originals in Google Drive, OneDrive, Dropbox or a connected server.",
    ],
  },
  {
    title: "Can I turn off external book metadata searches?",
    paragraphs: ["Automatic metadata enrichment is enabled by default. You can turn it off in Kava’s settings before connecting a library or at any time afterward. When enabled, book titles from connected libraries may be sent to AniList to retrieve book information and covers. Optional alternate-language searches may also send titles to Wikipedia; that option is off by default. Manual metadata linking can still perform a lookup you request. See the privacy policy for details."],
  },
  {
    title: "What should I include in a support request?",
    paragraphs: ["Include the Kava version, device model, operating system version, the service involved, steps to reproduce the problem and the displayed error. A file format and approximate size can help with file issues; a server software version helps with server issues. Hide email addresses, passwords, sign-in codes, API keys, tokens, file IDs, private paths, server addresses and temporary download URLs in screenshots or logs. You do not need to send your books or give access to your cloud account."],
  },
  {
    title: "Privacy requests",
    paragraphs: ["Use the support email below for privacy questions or requests to access, correct or delete support correspondence. To manage data held by a connected server or cloud service, use its settings or contact its operator. There is no separate Kava account to delete. Removing local data, revoking cloud access and deleting support emails are separate actions."],
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
      <DocumentBody intro="Get help connecting your libraries and reading your own books with Kava. Feature availability depends on your app version and platform." sections={english}><Contact /></DocumentBody>
      <nav aria-label="Manage cloud permissions" className="mt-8 flex flex-col items-start gap-3 text-sm">
        <a href="https://myaccount.google.com/connections" className="underline">Manage Google account connections</a>
        <a href="https://account.live.com/consent/Manage" className="underline">Manage Microsoft account app permissions</a>
        <a href="https://www.dropbox.com/account/connected_apps" className="underline">Manage Dropbox connected apps</a>
      </nav>
    </>
  );
}
