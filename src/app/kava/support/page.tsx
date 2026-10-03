import type { Metadata } from "next";
import { DocumentBody, LanguageLinks, type DocumentSection } from "../document";

export const metadata: Metadata = {
  title: "Kava — Support / 고객지원",
  description: "Contact Kava support and get help with Kavita connections, comic imports and local data. Kava 고객지원.",
  alternates: { canonical: "https://ckim.dev/kava/support/" },
};

const korean: DocumentSection[] = [
  {
    title: "Kavita 서버 연결이 안 되나요?",
    paragraphs: ["기기의 브라우저에서 서버 주소가 열리는지 먼저 확인해 주세요. 서버 주소와 API Key가 정확한지, 해당 계정에 라이브러리 접근 권한이 있는지 확인해 주세요. 개인 네트워크 안에서만 접속할 수 있는 서버라면 같은 네트워크 또는 필요한 VPN에 연결해야 합니다. Kavita OPDS를 선택한 경우 OPDS 주소를 붙여넣어 연결할 수 있습니다."],
  },
  {
    title: "어떤 파일을 가져올 수 있나요?",
    paragraphs: ["파일 라이브러리의 + 버튼에서 CBZ·ZIP 파일이나 폴더를 선택할 수 있습니다. 파일은 앱 내부에 복사되며 서버 없이 오프라인으로 읽을 수 있습니다. 암호화된 ZIP, ZIP64, CBR, 7z, PDF 및 EPUB 가져오기는 현재 지원하지 않습니다. 파일을 가져올 때는 기기에 충분한 여유 공간이 있는지도 확인해 주세요."],
  },
  {
    title: "파일이나 캐시를 삭제하려면?",
    paragraphs: ["가져온 작품을 길게 눌러 파일 관리에서 파일을 삭제할 수 있습니다. 커버 캐시는 설정의 캐시 설정에서 지울 수 있습니다. 기기에서 파일이나 캐시를 삭제해도 Kavita 서버의 파일과 기록은 삭제되지 않습니다."],
  },
  {
    title: "문의에 어떤 내용을 보내면 되나요?",
    paragraphs: ["앱 버전, 기기 모델, iOS 또는 iPadOS 버전, 문제가 발생하는 순서와 오류 메시지를 알려 주세요. 서버 연결 문제라면 Kavita 버전도 도움이 됩니다. 스크린샷을 첨부할 경우 비밀번호, API Key, 인증 토큰, 개인 서버 주소 등 민감한 정보를 가려 주세요. 만화 파일 자체를 보낼 필요는 없습니다."],
  },
  {
    title: "개인정보 관련 요청",
    paragraphs: ["개인정보 문의나 고객지원 이메일의 삭제 요청도 같은 이메일로 보내 주세요. 개인 Kavita 서버에 저장된 정보의 삭제는 해당 서버 운영자에게 요청해 주세요."],
  },
];

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

function Contact({ korean = false }: { korean?: boolean }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6">
      <p className="mb-2 text-sm text-stone-600">{korean ? "개발자 Chan Kim에게 문의" : "Contact Chan Kim, developer"}</p>
      <a href="mailto:kavareader@gmail.com?subject=Kava%20Support" className="break-all text-lg font-medium text-orange-800 underline">kavareader@gmail.com</a>
      <p className="mt-3 text-sm leading-6 text-stone-600">{korean ? "이메일 링크를 누르면 메일 앱이 열립니다. 주소를 복사해 직접 보내셔도 됩니다." : "The email link opens your mail app. You can also copy the address and email directly."}</p>
    </div>
  );
}

export default function SupportPage() {
  return (
    <>
      <div className="mb-8 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-800">Kava · Support</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Here to help.</h1>
        <p className="leading-7 text-stone-600" lang="ko">연결부터 읽기까지, Kava 사용 중 궁금한 점을 알려 주세요.</p>
      </div>
      <LanguageLinks />
      <DocumentBody id="ko" title="고객지원" intro="오류 신고, 기능 제안 또는 개인정보 관련 문의를 이메일로 보내 주세요." sections={korean}><Contact korean /></DocumentBody>
      <hr className="my-14 border-stone-200" />
      <DocumentBody id="en" title="Support" intro="Email us with bug reports, feature requests or questions about your privacy." sections={english}><Contact /></DocumentBody>
    </>
  );
}
