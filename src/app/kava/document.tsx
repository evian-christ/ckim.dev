import type { ReactNode } from "react";

export interface DocumentSection {
  title: string;
  paragraphs: string[];
}

export function LanguageLinks() {
  return (
    <nav aria-label="Language / 언어" className="mb-10 flex gap-5 text-sm">
      <a href="#ko" lang="ko" hrefLang="ko" className="underline">한국어</a>
      <a href="#en" lang="en" hrefLang="en" className="underline">English</a>
    </nav>
  );
}

export function DocumentBody({ id, title, intro, sections, children }: {
  id: "ko" | "en";
  title: string;
  intro: string;
  sections: DocumentSection[];
  children?: ReactNode;
}) {
  return (
    <section id={id} lang={id} aria-labelledby={`${id}-title`} className="scroll-mt-8 space-y-8">
      <div className="space-y-4">
        <h2 id={`${id}-title`} className="text-2xl font-semibold">{title}</h2>
        <p className="leading-8">{intro}</p>
      </div>
      {children}
      {sections.map((section) => (
        <section key={section.title} className="space-y-3">
          <h3 className="text-lg font-semibold">{section.title}</h3>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-8">{paragraph}</p>
          ))}
        </section>
      ))}
    </section>
  );
}
