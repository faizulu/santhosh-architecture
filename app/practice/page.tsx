import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Practice",
  description: "How a Santhosh Architecture project runs, from the site visit to the drawing set.",
};

const notes = [
  {
    title: "On the plot",
    body: "The first weeks are spent on the plot: light, rain, trees, and how the household moves.",
  },
  {
    title: "The drawing set",
    body: "The drawing set is what gets built: plans, sections, and details a contractor can price.",
  },
];

export default function PracticePage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-8 md:px-10 md:py-12">
      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8">
        <div>
          <h1 className="max-w-[12ch] text-5xl font-medium leading-[0.95] tracking-tight md:text-6xl">
            How a project runs.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted">
            One architect stays on the job from the site visit through construction reviews.
          </p>
          <Link href="/enquiry" className="btn mt-8">
            Enquiry
          </Link>
          <dl className="mt-10 grid gap-8 border-t border-line pt-8">
            {notes.map((note) => (
              <div key={note.title}>
                <dt className="text-2xl tracking-tight">{note.title}</dt>
                <dd className="mt-3 text-base leading-relaxed text-muted">{note.body}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-full">
          <div className="shot absolute inset-0">
            <Image
              src="/images/garden-court.jpg"
              alt="A long brick house with a deep verandah and white plaster end wall, set among dense trees."
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover object-[center_30%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
