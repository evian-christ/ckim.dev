/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Humankind in a nutshell Press Kit",
  description:
    "Press kit for Humankind in a nutshell, a civilization-themed slot-machine roguelike by juron games.",
};

const facts = [
  ["Game Title", "Humankind in a nutshell"],
  ["Developer / Publisher", "juron games"],
  ["Release Date", "2026 Q3"],
  ["Platform", "Steam (PC, Windows), to be extended in the near future"],
  ["Price", "TBA"],
];

const screenshots = ["en_01.png", "en_02.png", "en_03.png", "en_04.png", "en_05.png"];

export default function HumankindPressKit() {
  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white md:px-10 md:py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-14">
        <header className="flex flex-col gap-8 border-b border-white/15 pb-10">
          <nav className="flex items-center justify-between text-sm text-white/55">
            <a href="/" className="transition-colors hover:text-white">
              Chan Kim
            </a>
            <span>Press Kit</span>
          </nav>

          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <div className="flex flex-col items-center gap-6">
              <img
                src="/humankind-in-a-nutshell/logo.png"
                alt="Humankind in a nutshell logo"
                className="w-full max-w-[520px]"
              />
              <p className="text-xl leading-8 text-white/80 md:text-2xl md:leading-9">
                A civilization-themed slot-machine roguelike where you build a deck of symbols,
                spin the board each turn to harvest food, gold, and knowledge, and guide your
                people from the ancient campfire to the modern age before the ever-growing tribute
                consumes you.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 text-sm sm:w-auto sm:flex-row">
              <a
                href="https://store.steampowered.com/app/1779280/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center border border-white px-5 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black"
              >
                Steam Store Page
              </a>
              <a
                href="https://www.youtube.com/watch?v=0n8cE7DSBPM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center border border-white/25 px-5 py-3 font-medium text-white/80 transition-colors hover:border-white hover:text-white"
              >
                Watch Trailer
              </a>
            </div>
          </div>
        </header>

        <section className="grid gap-8 md:grid-cols-[220px_1fr]">
          <h1 className="text-sm font-semibold uppercase text-white/45">
            Factsheet
          </h1>
          <dl className="divide-y divide-white/10 border-y border-white/10">
            {facts.map(([label, value]) => (
              <div key={label} className="grid gap-2 py-5 md:grid-cols-[220px_1fr]">
                <dt className="text-sm text-white/45">{label}</dt>
                <dd className="text-base leading-7 text-white">{value}</dd>
              </div>
            ))}
            <div className="grid gap-2 py-5 md:grid-cols-[220px_1fr]">
              <dt className="text-sm text-white/45">Steam Store Page</dt>
              <dd>
                <a
                  href="https://store.steampowered.com/app/1779280/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-base leading-7 text-white underline decoration-white/35 underline-offset-4 hover:decoration-white"
                >
                  https://store.steampowered.com/app/1779280/
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section className="grid gap-8 md:grid-cols-[220px_1fr]">
          <h2 className="text-sm font-semibold uppercase text-white/45">
            Description
          </h2>
          <div className="flex flex-col gap-6 text-lg leading-8 text-white/80">
            <p>
              Humankind in a nutshell is a roguelike where the rise and fall of civilizations is
              decided by the spin of a slot. Plant a seed, and watch it become a kingdom. Trade in
              stone, and trade out steel. Every turn is a millennium. Every choice, a legacy.
            </p>
            <p>
              You will not place your symbols. You will choose them, and then surrender to fate as
              the board scatters your civilization across the ages. From the first campfire to the
              towers of the modern world, no two histories are ever written the same.
            </p>
            <p className="text-white">How long can your people endure?</p>
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-[220px_1fr]">
          <h2 className="text-sm font-semibold uppercase text-white/45">
            Trailer
          </h2>
          <div className="aspect-video overflow-hidden border border-white/15 bg-white/5">
            <iframe
              src="https://www.youtube.com/embed/0n8cE7DSBPM"
              title="Humankind in a nutshell trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-[220px_1fr]">
          <h2 className="text-sm font-semibold uppercase text-white/45">
            Media Assets
          </h2>
          <div className="flex flex-col gap-8">
            <div className="border border-white/15 p-5">
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h3 className="text-base font-semibold">Logo</h3>
                <a
                  href="/humankind-in-a-nutshell/logo.png"
                  download
                  className="text-sm text-white/65 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white"
                >
                  Download logo
                </a>
              </div>
              <img
                src="/humankind-in-a-nutshell/logo.png"
                alt="Humankind in a nutshell logo"
                className="max-h-40 w-auto max-w-full"
              />
            </div>

            <div>
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h3 className="text-base font-semibold">Screenshots</h3>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {screenshots.map((screenshot, index) => (
                  <figure key={screenshot} className="border border-white/15 bg-white/5">
                    <a
                      href={`/humankind-in-a-nutshell/screenshots/${screenshot}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block transition-opacity hover:opacity-85"
                    >
                      <img
                        src={`/humankind-in-a-nutshell/screenshots/${screenshot}`}
                        alt={`Humankind in a nutshell screenshot ${index + 1}`}
                        className="aspect-video w-full object-cover"
                      />
                    </a>
                    <figcaption className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-white/55">
                      <span>Screenshot {index + 1}</span>
                      <a
                        href={`/humankind-in-a-nutshell/screenshots/${screenshot}`}
                        download
                        className="text-white/70 underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white"
                      >
                        Download
                      </a>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
