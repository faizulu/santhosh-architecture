import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { studio } from "@/lib/studio";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const facts = [
    ["Type", project.kind],
    ["Setting", project.setting],
    ["Light", project.light],
    ["Year", project.year],
  ];

  return (
    <article className="mx-auto grid w-full max-w-[1600px] items-start gap-8 px-4 py-6 md:px-8 md:py-8 lg:grid-cols-[220px_minmax(0,1fr)_300px] lg:gap-10 lg:py-10">
      <div className="shot relative order-1 aspect-[4/3] sm:aspect-[16/10] lg:order-2 lg:aspect-auto lg:min-h-[calc(100dvh-7.5rem)]">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
      </div>

      <aside className="order-2 text-center lg:sticky lg:top-24 lg:order-1 lg:pb-16">
        <h1 className="text-[1.75rem] font-medium leading-[1.05] tracking-tight">
          {project.title}
        </h1>
        <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-muted">
          {project.setting}, {studio.place}
        </p>
        <dl className="mt-10 space-y-7">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">{label}</dt>
              <dd className="mt-1 text-[13px] uppercase tracking-[0.08em]">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-12">
          <Link
            href="/work"
            className="text-[10px] uppercase tracking-[0.18em] text-muted underline-offset-4 hover:underline"
          >
            All work
          </Link>
        </p>
      </aside>

      <div className="order-3 mx-auto max-w-[38ch] text-left text-[15px] leading-[1.7] lg:mx-0 lg:max-w-none lg:pt-1">
        <p>{project.summary}</p>
        <p className="mt-6">{project.body}</p>
      </div>
    </article>
  );
}
