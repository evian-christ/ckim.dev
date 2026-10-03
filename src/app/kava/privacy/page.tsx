import type { Metadata } from "next";
import { DocumentBody, LanguageLinks, type DocumentSection } from "../document";

export const metadata: Metadata = {
  title: "Kava — Privacy Policy / 개인정보처리방침",
  description: "How Kava handles local files, server connections, metadata lookups and support inquiries. Kava 개인정보처리방침.",
  alternates: { canonical: "https://ckim.dev/kava/privacy/" },
};

const korean: DocumentSection[] = [
  {
    title: "1. 기기에 저장되는 정보",
    paragraphs: [
      "Kava는 서버 주소, 앱 설정, 읽기 기록, 즐겨찾기, 작품 정보와 캐시를 기기에 저장합니다. 사용자가 가져온 CBZ·ZIP 파일은 앱 내부로 복사해 오프라인 읽기에 사용합니다. 입력한 서버 계정 정보, API Key와 인증 토큰은 기기의 Keychain에 저장합니다.",
      "이 정보는 서버 인증, 라이브러리 표시, 작품 정보 보완, 읽기 위치 복원과 설정 유지에 사용됩니다. Kava는 읽기 기록이나 가져온 파일을 별도의 개발자 서버로 전송하지 않으며, 광고 또는 사용 분석 SDK를 포함하지 않습니다.",
    ],
  },
  {
    title: "2. 사용자가 연결한 Kavita 서버",
    paragraphs: ["서버에 연결하면 인증 정보와 작품 조회, 읽기 진행률, 즐겨찾기 등의 요청을 사용자가 지정한 Kavita 서버로 직접 전송합니다. 서버 운영자는 요청 처리 과정에서 IP 주소 등의 접속 정보를 받을 수 있습니다. 해당 서버에 저장되는 정보의 처리와 보관은 서버 운영자의 정책을 따릅니다."],
  },
  {
    title: "3. AniList 작품 정보 조회",
    paragraphs: ["자동 작품 정보 보완 또는 직접 AniList 연결을 사용할 때 작품 제목, 검색어 또는 AniList 작품 ID를 AniList에 전송해 작품 정보와 표지 이미지를 받아옵니다. 작품 정보가 부족한 경우 자동 조회가 이루어질 수 있습니다. AniList 및 이미지 제공 서버에는 IP 주소 등의 접속 정보가 전달될 수 있습니다. 가져온 만화 파일의 본문이나 Kavita 인증 정보는 AniList로 전송하지 않습니다."],
  },
  {
    title: "4. 위키백과를 통한 다른 언어 제목 검색",
    paragraphs: ["설정에서 ‘다른 언어 제목으로 재검색’을 켜면 필요한 경우 작품 제목을 위키백과에 전송하여 연결된 영어 제목을 확인하고, 그 제목으로 AniList를 다시 검색합니다. 위키백과에는 IP 주소 등의 접속 정보도 전달될 수 있습니다. 이 기능은 기본적으로 꺼져 있으며 설정에서 다시 끌 수 있습니다."],
  },
  {
    title: "5. 고객지원 및 개인정보 문의",
    paragraphs: ["사용자가 고객지원 이메일을 보내면 이메일 주소, 문의 내용 및 직접 첨부한 자료가 개발자에게 전달됩니다. 이 정보는 답변과 문제 해결을 위해 사용하며, 메일 전송에는 사용자가 선택한 메일 서비스와 수신자의 Gmail 서비스가 사용됩니다. 문의에는 비밀번호, API Key, 인증 토큰을 포함하지 마세요.", "개인정보 관련 문의, 문의 정보의 열람·정정·삭제 요청은 kavareader@gmail.com으로 보내 주세요. 문의 정보는 지원에 필요한 기간 동안 보관하며, 삭제 요청 시 법적으로 보관해야 하는 경우를 제외하고 삭제합니다."],
  },
  {
    title: "6. 보관, 삭제 및 사용자의 선택",
    paragraphs: ["가져온 파일은 작품의 파일 관리에서 삭제할 수 있고, 커버 캐시는 설정의 캐시 설정에서 삭제할 수 있습니다. 저장된 서버 연결 정보는 서버 설정에서 수정할 수 있습니다. 앱을 삭제하면 앱 내부 파일과 설정은 제거되지만, Keychain 항목이나 기기 백업에 포함된 정보가 모두 함께 삭제되는 것은 아닙니다. 인증 접근을 확실히 해제하려면 Kavita 서버에서 API Key 또는 인증 정보를 폐기·변경해 주세요.", "기기에서 정보를 삭제해도 Kavita 서버에 저장된 기록은 삭제되지 않습니다. 서버 기록의 삭제는 해당 서버 운영자에게 요청해야 합니다. 개발자는 사용자의 기기나 개인 Kavita 서버에 저장된 데이터에 접근해 대신 삭제할 수 없습니다."],
  },
  {
    title: "7. 외부 서비스 및 백업",
    paragraphs: ["Kavita 서버, AniList, 위키백과 및 이메일 서비스에는 각 운영자의 개인정보 처리방침이 적용됩니다. 기기 백업을 사용하는 경우 로컬 데이터가 운영체제의 백업 설정에 따라 백업에 포함될 수 있습니다. iCloud에서 파일을 선택해 가져올 수 있지만 Kava 자체의 기기 간 라이브러리 동기화 기능은 제공하지 않습니다."],
  },
  {
    title: "8. 이 방침의 범위와 변경",
    paragraphs: ["이 방침은 Chan Kim이 제공하는 Kava 앱에 적용됩니다. 이 안내 웹페이지에 접속하면 웹사이트 호스팅 제공자가 페이지 제공과 보안을 위해 IP 주소 등 일반적인 접속 정보를 처리할 수 있습니다. 앱의 데이터 처리 방식이 변경되면 이 페이지와 시행일을 갱신합니다."],
  },
];

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
        <p className="text-sm">Effective / 시행일: <time dateTime="2026-10-03">2026-10-03</time> · Chan Kim</p>
      </div>
      <LanguageLinks />
      <DocumentBody id="ko" title="개인정보처리방침" intro="Kava는 사용자가 연결한 Kavita 서버와 직접 가져온 파일로 만화를 읽는 앱입니다. 아래에서는 정보가 기기에 저장되는 경우와 외부 서비스에 전달되는 경우를 설명합니다." sections={korean} />
      <hr className="my-14 border-black" />
      <DocumentBody id="en" title="Privacy policy" intro="Kava is a comic reader for your own Kavita server and files you import. This policy explains which information stays on your device and which information is sent to external services." sections={english} />
    </>
  );
}
