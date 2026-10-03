import type { Metadata } from "next";
import { DocumentBody, type DocumentSection } from "../document";

export const metadata: Metadata = {
  title: "Kava — Privacy Policy",
  description: "How Kava handles local files, server connections, metadata lookups and support inquiries.",
  alternates: { canonical: "https://ckim.dev/kava/privacy/" },
};

const english: DocumentSection[] = [
  {
    title: "1. Information stored on your device",
    paragraphs: [
      "Kava stores server addresses, app preferences, reading history, favorites, book metadata and caches on your device. CBZ and ZIP files you import are copied into the app for offline reading. Server account credentials, API keys and authentication tokens you provide are stored in the device’s Keychain.",
      "This information is used to authenticate with your server, display your library, look up metadata, restore your reading position and retain your preferences. Kava does not send reading history or imported files to a separate developer-operated server and does not include advertising or usage analytics SDKs.",
    ],
  },
  {
    title: "2. Your Kavita server",
    paragraphs: ["When you connect a server, authentication information and requests for books, reading progress and favorites are sent directly to the Kavita server you specify. Its operator may receive connection information such as your IP address while handling requests. The server operator’s policies govern the processing and retention of information on that server."],
  },
  {
    title: "3. AniList metadata lookups",
    paragraphs: ["Automatic metadata enrichment and manual AniList linking send book titles, search terms or AniList media IDs to AniList to retrieve metadata and cover images. Automatic lookups may occur when book metadata is missing. AniList and image hosting services may receive connection information such as your IP address. The contents of imported comic files and your Kavita credentials are not sent to AniList."],
  },
  {
    title: "4. Alternate-title searches with Wikipedia",
    paragraphs: ["If you enable alternate-language title searching in settings, Kava may send a book title to Wikipedia to find its linked English title, then search AniList with that title. Wikipedia may also receive connection information such as your IP address. This feature is off by default and can be turned off again in settings."],
  },
  {
    title: "5. Support and privacy inquiries",
    paragraphs: ["When you send a support email, the developer receives your email address, message and any attachments you choose to include. This information is used to respond and troubleshoot. Email is handled by your chosen email provider and the recipient’s Gmail service. Please do not include passwords, API keys or authentication tokens.", "Email kavareader@gmail.com with privacy questions or requests to access, correct or delete your support correspondence. Support information is retained for as long as needed to provide support and is deleted on request unless retention is legally required."],
  },
  {
    title: "6. Retention, deletion and your choices",
    paragraphs: ["You can delete imported files through a title’s file management options and clear cover caches in the app’s cache settings. Saved server connection details can be edited in server settings. Deleting the app removes its local files and preferences, but does not necessarily remove Keychain entries or information in device backups. To revoke authentication access, revoke or change the relevant API key or credentials on your Kavita server.", "Deleting data on your device does not delete records on your Kavita server. Contact its operator to remove server-side records. The developer cannot access or delete data on your device or private Kavita server on your behalf."],
  },
  {
    title: "7. External services and backups",
    paragraphs: ["Kavita servers, AniList, Wikipedia and email services are subject to their respective operators’ privacy policies. Local app data may be included in device backups according to your operating system’s backup settings. You can select files from iCloud for import, but Kava does not provide its own cross-device library synchronization."],
  },
  {
    title: "8. Scope and changes",
    paragraphs: ["This policy applies to the Kava app provided by Chan Kim. When you visit this information website, its hosting provider may process standard connection information, such as your IP address, to deliver and secure the pages. If the app’s data practices change, this page and its effective date will be updated."],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-semibold">Privacy policy</h1>
        <p className="text-sm">Effective date: <time dateTime="2026-10-03">2026-10-03</time> · Chan Kim</p>
      </div>
      <DocumentBody intro="Kava is a comic reader for your own Kavita server and files you import. This policy explains which information stays on your device and which information is sent to external services." sections={english} />
    </>
  );
}
