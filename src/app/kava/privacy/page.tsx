import type { Metadata } from "next";
import { DocumentBody, type DocumentSection } from "../document";

export const metadata: Metadata = {
  title: "Kava — Privacy Policy",
  description: "How Kava accesses, uses, stores and shares information from Google Drive, OneDrive, Dropbox and other book libraries, and how to remove data or revoke access.",
  alternates: { canonical: "https://ckim.dev/kava/privacy/" },
};

const english: DocumentSection[] = [
  {
    title: "1. Information stored on your device",
    paragraphs: [
      "Kava stores connection details, library catalogs, app preferences, reading history, favorites, book metadata and caches on your device. Imported books and downloaded originals are used for local reading. Supported formats include CBZ, ZIP, CBR, RAR, PDF, EPUB and TXT. Cloud authentication tokens are stored in the device’s Keychain or managed by the provider’s sign-in tools.",
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
      "The requested drive.readonly permission allows Kava to see and download files across your Google Drive. Within Kava, the library is limited to the folder you choose and its supported descendants. Kava reads file and folder names, identifiers, parent relationships, file types, sizes, versions and change information to build and refresh that library. Covers and book files are downloaded to your device for browsing and reading. Kava does not use this permission to upload, change or delete your original Drive files or write reading positions back to them.",
      "Drive requests go directly from the app to Google. Library information, downloaded files and reading positions are kept on the device for library display and offline reading. Book-title metadata lookups can contact the services described under Book metadata and alternate-title searches. The developer does not receive your Google tokens or Drive book contents through a developer-operated backend.",
      "Google’s sign-in tools and services may process account or profile information, user and device identifiers, IP addresses or approximate location, and usage information to provide sign-in, security and service operation, including service analytics. Google’s own privacy policy applies to its processing. The app does not ask you to provide a phone number to connect Drive.",
      "Kava’s use and transfer of information received from Google APIs will adhere to the Google API Services User Data Policy, including its Limited Use requirements. Google user data is used to provide the library and reading features described here, and is not sold, used for advertising, or used to train generalized AI models.",
    ],
  },
  {
    title: "4. OneDrive",
    paragraphs: [
      "Where available, OneDrive connects a personal Microsoft account to Kava; it does not create a Kava account. The current integration is available for testing on iPhone and iPad, and does not include work or school accounts, SharePoint libraries or OneDrive sign-in on Mac. Kava requests the delegated Files.Read permission to read the signed-in user’s files. This permission can cover more files than the library folder you choose; the app displays supported books under your selected folder.",
      "Kava uses account identifiers and available account display information to associate the connection with the correct Microsoft account. It reads file and folder names, identifiers, parent relationships, types, sizes, versions and changes to maintain the library, and retrieves covers and book files directly from Microsoft or its content delivery service to your device. Kava does not upload, edit or delete the original OneDrive files or write reading positions back to them.",
      "Authentication information is held in app-specific Keychain storage through Microsoft’s sign-in tools. Microsoft’s sign-in services may process account, device, network and diagnostic information for authentication, security and service operation under Microsoft’s privacy statement. The developer does not receive your Microsoft tokens or OneDrive books through a developer-operated backend.",
    ],
  },
  {
    title: "5. Dropbox",
    paragraphs: [
      "Where available, Dropbox connects your existing cloud library to Kava; it does not create a Kava account. Kava uses the Full Dropbox access type so you can choose a library folder outside an app-only folder. The requested scopes are account_info.read, files.metadata.read and files.content.read. These allow reading account information, file metadata and content; Kava does not request file-writing scopes. Authorization can cover your Dropbox beyond the folder selected in Kava. Dropbox Business team spaces and team administration are not included in the current integration.",
      "Dropbox sign-in opens the provider’s authorization page through the system authentication session. Kava uses the returned account identifier, account display information and home namespace identifier to keep connections separate. Access and refresh tokens are stored in the device’s Keychain. File and folder names, identifiers, parent relationships, types, sizes, revisions and change information build and refresh your chosen library. Covers and book files are retrieved directly from Dropbox to the device; they do not pass through a developer-operated backend. Kava does not upload, edit or delete Dropbox originals or write reading positions back to them. Dropbox processes authorization and file requests under its own privacy policy.",
    ],
  },
  {
    title: "6. Book metadata and alternate-title searches",
    paragraphs: [
      "Automatic metadata enrichment is enabled by default and can be disabled in the app’s settings, including before connecting a cloud library. Automatic enrichment and manual AniList linking can send book titles, search terms or AniList media IDs to AniList to retrieve book information and cover images. This may include titles derived from Google Drive, OneDrive, Dropbox or another connected library. Book contents, cloud authentication tokens, passwords and server credentials are not sent to AniList. Disabling automatic lookups does not prevent a manual metadata lookup you explicitly request.",
      "If you enable alternate-language title searching, Kava may send a book title to Wikipedia to find a linked English title, then search AniList with that title. This feature is off by default and can be disabled in settings. AniList, Wikipedia and image hosting services may receive connection information such as your IP address.",
    ],
  },
  {
    title: "7. iCloud, purchases and backups",
    paragraphs: [
      "If you use iCloud libraries or enable library synchronization, Apple’s iCloud services store the selected library’s files or supported library information and reading state according to the feature you choose. Connecting Google Drive, OneDrive or Dropbox does not itself enable cross-device synchronization of those remote libraries. Kava does not include their authentication tokens in its library synchronization. iCloud availability and processing depend on your Apple account and Apple’s policies.",
      "Kava Pro purchases and purchase restoration are handled through Apple’s App Store. Kava uses purchase entitlement information to enable Pro features; the developer does not receive your payment card details. Other local app data may be included in device backups according to operating system settings. Downloaded reading originals are stored in an app directory marked as excluded from device backup.",
    ],
  },
  {
    title: "8. Retention, deletion and revoking access",
    paragraphs: [
      "Library information and reading history are kept on your device to support the app’s features. Downloaded originals remain available for offline reading until removed through download management or applicable app storage cleanup. Imported books can be deleted through file management, and cover caches can be cleared in cache settings. Disconnecting a library and deleting downloaded copies are separate actions.",
      "Remove a cloud library in Kava’s connection settings. Removing the last connection for an account clears its local sign-in information; credentials may still be needed while another connection uses that account. Disconnecting a library does not automatically delete downloaded copies or revoke provider-wide authorization. To revoke that authorization, remove Kava from your Google Account’s third-party connections, your Microsoft account’s app permissions, or Dropbox’s connected apps. Direct links are provided below. Revocation stops future authorized access but does not erase copies already downloaded to the device. Delete those separately through Kava’s download management. Deleting a local copy does not change the original in Google Drive, OneDrive, Dropbox or a connected server.",
      "Deleting the app removes its local files and preferences, but does not necessarily remove Keychain entries, backups, or data stored in iCloud or on connected services. Manage those copies through the relevant service and operating system settings. For server-side records, contact your server operator. The developer cannot access or delete files on your device or private services on your behalf.",
    ],
  },
  {
    title: "9. Support and privacy inquiries",
    paragraphs: [
      "When you send a support email, the developer receives your email address, message and any attachments you choose to include. This information is used to respond and troubleshoot. Email is handled by your chosen email provider and the recipient’s Gmail service. Do not include passwords, sign-in codes, API keys, authentication tokens, private download URLs or book files. Sending a support request does not automatically give the developer access to your cloud library.",
      "Email kavareader@gmail.com with privacy questions or requests to access, correct or delete your support correspondence. Support information is retained for as long as needed to provide support and is deleted on request unless retention is legally required.",
    ],
  },
  {
    title: "10. External services, website and changes",
    paragraphs: ["This policy applies to Kava, provided by Chan Kim. Connected services, Google, Microsoft, Dropbox, Apple, AniList, Wikipedia and email providers have their own privacy policies. This information website’s hosting provider may process standard request information, such as your IP address, to deliver and secure its pages. Kava is independently developed and is not affiliated with Google, Microsoft or Dropbox. Cloud connections are in testing; availability depends on your app version and platform. Describing a connection here does not announce public approval or release by its provider. If data practices change, this page and its effective date will be updated."],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-semibold">Privacy policy</h1>
        <p className="text-sm">Effective date: <time dateTime="2026-10-26">2026-10-26</time> · Chan Kim</p>
      </div>
      <DocumentBody intro="Kava is a reader for books you own or are authorized to access. This policy explains how Kava accesses, uses, stores and shares information from files and connected libraries, and how to remove data or revoke access. Cloud sign-in does not create a Kava account." sections={english} />
      <nav aria-label="Privacy references" className="mt-8 flex flex-col items-start gap-3 text-sm">
        <a href="https://developers.google.com/terms/api-services-user-data-policy" className="underline">Google API Services User Data Policy and Limited Use</a>
        <a href="https://policies.google.com/privacy" className="underline">Google Privacy Policy</a>
        <a href="https://privacy.microsoft.com/privacystatement" className="underline">Microsoft Privacy Statement</a>
        <a href="https://www.dropbox.com/privacy" className="underline">Dropbox Privacy Policy</a>
        <a href="https://myaccount.google.com/connections" className="underline">Manage Google account connections</a>
        <a href="https://account.live.com/consent/Manage" className="underline">Manage Microsoft account app permissions</a>
        <a href="https://www.dropbox.com/account/connected_apps" className="underline">Manage Dropbox connected apps</a>
      </nav>
    </>
  );
}
