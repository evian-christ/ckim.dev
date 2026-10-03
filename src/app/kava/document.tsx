import type { ReactNode } from "react";

export interface DocumentSection {
  title: string;
  paragraphs: string[];
}

export function DocumentBody({ intro, sections, children }: {
  intro: string;
  sections: DocumentSection[];
  children?: ReactNode;
}) {
  return (
    <div className="space-y-8">
      <p className="leading-8">{intro}</p>
      {children}
      {sections.map((section) => (
        <section key={section.title} className="space-y-3">
          <h2 className="text-lg font-semibold">{section.title}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="leading-8">{paragraph}</p>
          ))}
        </section>
      ))}
    </div>
  );
}
