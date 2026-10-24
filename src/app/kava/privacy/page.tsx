import type { Metadata } from "next";
import { DocumentBody, type DocumentSection } from "../document";

export const metadata: Metadata = {
  title: "Kava — Privacy Policy",
  description: "How Kava handles book files, connected libraries, Google Drive, metadata lookups and support inquiries.",
  alternates: { canonical: "https://ckim.dev/kava/privacy/" },
};

const english: DocumentSection[] = [
  {
    title: "1. Information stored on your device",
    paragraphs: [
      "Kava stores connection details, app preferences, reading history, favorites, book metadata and caches on your device. Imported books and downloaded originals are used for local reading. Supported formats include CBZ, ZIP, CBR, RAR, PDF, EPUB and TXT. Authentication credentials and tokens are stored in the device’s Keychain; Google sign-in credentials are managed by Google’s sign-in tools.",
      "This information is used to connect your libraries, display books, retrieve metadata, restore reading positions and retain preferences. Kava does not operate a separate developer server for storing your book files or reading history. Kava does not use your book files or reading history for advertising. External services used by the app are described below.",
    ],
  },
  {
    title: "2. Connected servers and file shares",
    paragraphs: ["Kava can connect directly to libraries you configure, including Kavita, Komga, OPDS and SMB. Credentials and requests for library contents are sent to the selected service. Where supported, reading progress and favorites can also be sent to that service. Its operator may receive connection information such as your IP address. The service operator’s policies govern information retained there."],
  },
  {
    title: "3. Google Drive",
    paragraphs: [
      "Where Google Drive is available in your version of Kava, connecting it opens Google’s sign-in and permission flow. It gives Kava access to your Drive content and does not create a Kava account. Kava uses account identifiers and an email address to associate the connection with the correct Google account.",
      "The requested read-only permission allows Kava to see and download files across your Google Drive. Within Kava, the library is limited to the folder you choose and its supported descendants. Kava reads file and folder names, identifiers, parent relationships, file types, sizes, versions and change information to build and refresh that library. Covers and book files are downloaded to your device for browsing and reading. Kava does not use this permission to change or delete your original Drive files.",
      "Drive requests go directly from the app to Google. Library information, downloaded files and reading positions are kept on the device for library display and offline reading. Book-title metadata lookups can contact other services as described in section 4. The developer does not receive your Google tokens or Drive book contents through a developer-operated backend.",
      "Google’s sign-in tools and services may process account or profile information, user and device identifiers, IP addresses or approximate location, and usage information to provide sign-in, security and service operation, including service analytics. Google’s own privacy policy applies to its processing. The app does not ask you to provide a phone number to connect Drive.",
      "Kava’s use and transfer of information received from Google APIs will adhere to the Google API Services User Data Policy, including its Limited Use requirements. Google user data is used to provide the library and reading features described here, and is not sold, used for advertising, or used to train generalized AI models.",
    ],
  },
  {
    title: "4. Book metadata and alternate-title searches",
    paragraphs: [
      "Automatic metadata enrichment and manual AniList linking can send book titles, search terms or AniList media IDs to AniList to retrieve metadata and cover images. This may include titles derived from a connected library, including Google Drive. Automatic lookups can occur when metadata is missing; manage automatic metadata lookups in the app’s settings. Book contents, Google access tokens and server credentials are not sent to AniList.",
      "If you enable alternate-language title searching, Kava may send a book title to Wikipedia to find a linked English title, then search AniList with that title. This feature is off by default and can be disabled in settings. AniList, Wikipedia and image hosting services may receive connection information such as your IP address.",
    ],
  },
  {
    title: "5. iCloud, purchases and backups",
    paragraphs: [
      "If you use iCloud libraries or enable library synchronization, Apple’s iCloud services store the selected library’s files or supported library information and reading state according to the feature you choose. Google sign-in credentials are not shared through Kava’s library synchronization. iCloud availability and processing depend on your Apple account and Apple’s policies.",
      "Kava Pro purchases and purchase restoration are handled through Apple’s App Store. Kava uses purchase entitlement information to enable Pro features; the developer does not receive your payment card details. Other local app data may be included in device backups according to operating system settings. Downloaded reading originals are stored in an app directory marked as excluded from device backup.",
    ],
  },
  {
    title: "6. Retention, deletion and revoking access",
    paragraphs: [
      "Library information and reading history are kept on your device to support the app’s features. Downloaded originals remain available for offline reading until removed through download management or applicable app storage cleanup. Imported books can be deleted through file management, and cover caches can be cleared in cache settings. Disconnecting a library and deleting downloaded copies are separate actions.",
      "You can disconnect Google Drive in Kava’s connection settings. You can also revoke Kava’s access from the third-party connections section of your Google Account at myaccount.google.com/connections. Revoking access prevents further authorized requests but does not itself erase copies already downloaded to the device. Delete those copies through Kava’s download management. Deleting a local copy does not change the original in Drive.",
      "Deleting the app removes its local files and preferences, but does not necessarily remove Keychain entries, backups, or data stored in iCloud or on connected services. Manage those copies through the relevant service and operating system settings. For server-side records, contact your server operator. The developer cannot access or delete files on your device or private services on your behalf.",
    ],
  },
  {
    title: "7. Support and privacy inquiries",
    paragraphs: [
      "When you send a support email, the developer receives your email address, message and any attachments you choose to include. This information is used to respond and troubleshoot. Email is handled by your chosen email provider and the recipient’s Gmail service. Do not include passwords, API keys, authentication tokens or private book files.",
      "Email kavareader@gmail.com with privacy questions or requests to access, correct or delete your support correspondence. Support information is retained for as long as needed to provide support and is deleted on request unless retention is legally required.",
    ],
  },
  {
    title: "8. External services, website and changes",
    paragraphs: ["This policy applies to Kava, provided by Chan Kim. Connected services, Google, Apple, AniList, Wikipedia and email providers have their own privacy policies. This information website’s hosting provider may process standard connection information, such as your IP address, to deliver and secure its pages. Availability of app features varies by version; the Google Drive sections apply when that integration is available. If data practices change, this page and its effective date will be updated."],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-semibold">Privacy policy</h1>
        <p className="text-sm">Effective date: <time dateTime="2026-10-24">2026-10-24</time> · Chan Kim</p>
      </div>
      <DocumentBody intro="Kava is a reader for books you own or are authorized to access, from files and connected libraries. This policy explains what stays on your device and what is sent to external services." sections={english} />
      <nav aria-label="Privacy references" className="mt-8 flex flex-col items-start gap-3 text-sm">
        <a href="https://developers.google.com/terms/api-services-user-data-policy" className="underline">Google API Services User Data Policy and Limited Use</a>
        <a href="https://policies.google.com/privacy" className="underline">Google Privacy Policy</a>
        <a href="https://myaccount.google.com/connections" className="underline">Manage Google account connections</a>
      </nav>
    </>
  );
}
