import { Syne } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { AutoWrite } from "@/components/auto-write";
import { FloatingWorks } from "@/components/floating-works";
import { LandingSocial } from "@/components/landing-social";
import { studio } from "@/lib/studio";

const display = Syne({
  subsets: ["latin"],
  weight: ["500", "700"],
});

const lines = [
  "Houses, interiors, and research from one studio.",
  "Each project starts with a visit to the plot.",
  "Drawings are held to a set a builder can price.",
  "Courts, verandahs, and rooms for daily use.",
];

const buttonClass =
  "inline-flex min-h-11 w-full items-center justify-center whitespace-nowrap bg-white px-5 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-950 motion-safe:active:scale-[0.98] sm:w-auto";

export default function HomePage() {
  return (
    <section className="relative min-h-[100dvh] text-white">
      <Image
        src="/images/upper-floor.jpg"
        alt="A pale dining room with a wooden table, a sheer curtain, and sliding doors onto a planted balcony."
        fill
        priority
        sizes="100vw"
        className="object-cover object-center brightness-110"
      />
      <div className="absolute inset-0 bg-black/15" />
      <div className="relative z-10 grid min-h-[100dvh] items-center lg:grid-cols-[30%_1fr]">
        <FloatingWorks />
        <div className="mx-auto w-full max-w-xl px-5 py-10 text-center sm:px-8 lg:mx-0 lg:max-w-2xl lg:px-12 lg:text-left">
          <div className={`${display.className} mx-auto w-fit max-w-full text-left [text-shadow:0_1px_8px_rgba(0,0,0,0.55)] lg:mx-0`}>
            <h1 className="text-5xl font-bold leading-[0.9] tracking-[-0.045em] sm:text-6xl">
              <span className="block">North Point</span>
              <span className="mt-1 block">Architectures</span>
            </h1>
            <p className="mt-3 text-[13px] font-medium tracking-[0.18em]">
              <AutoWrite words={["creating landmarks"]} repeat={false} />
            </p>
          </div>
          <p className="mt-5 text-[13px] uppercase tracking-[0.16em] [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
            Architecture | Interior | Research
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.42em] [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
            {studio.place}
          </p>
          <ul className="mx-auto mt-4 max-w-md space-y-1.5 text-sm leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.55)] lg:mx-0">
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link href="/enquiry" className={buttonClass}>
              New projects enquiry
            </Link>
            <Link href="/work" className={buttonClass}>
              See our work
            </Link>
          </div>
          <LandingSocial />
          <Link
            href="/practice"
            className="mt-4 inline-block text-sm underline underline-offset-4 [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]"
          >
            Practice
          </Link>
        </div>
      </div>
    </section>
  );
}
