"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/projects";
import { studio } from "@/lib/studio";

const marks = [
  "M8 16h16M16 8v16",
  "M10 16h12M16 10v12M8 8h16v16H8z",
  "M16 7l9 14H7z",
  "M8 12h16M8 20h16",
  "M16 8a8 8 0 1 0 0 16 8 8 0 0 0 0-16z",
  "M8 8h8v8H8zM16 16h8v8h-8z",
];

function ProjectMark({ index }: { index: number }) {
  return (
    <span className="mx-auto grid h-10 w-10 place-items-center bg-ink text-bg" aria-hidden="true">
      <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d={marks[index % marks.length]} />
      </svg>
    </span>
  );
}

export function WorkIndex({ projects }: { projects: Project[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const kinds = ["All", ...new Set(projects.map((project) => project.kind))];
  const [kind, setKind] = useState("All");
  const visible = kind === "All" ? projects : projects.filter((project) => project.kind === kind);

  function toggle(slug: string) {
    setOpenSlug((current) => (current === slug ? null : slug));
  }

  if (projects.length === 0) {
    return (
      <p className="max-w-[40ch] text-base leading-relaxed text-muted">
        Projects will appear here once the studio adds them.
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 px-1 text-[13px]">
        {kinds.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={kind === item}
            onClick={() => setKind(item)}
            className={kind === item ? "underline underline-offset-4" : "text-muted"}
          >
            {item}
          </button>
        ))}
      </div>
      <ul className="mt-8">
        {visible.map((project) => {
          const open = openSlug === project.slug;
          const index = projects.findIndex((item) => item.slug === project.slug);
          const facts = [
            ["Type", project.kind],
            ["Setting", project.setting],
            ["Light", project.light],
            ["Year", project.year],
          ];
          return (
            <li key={project.slug} id={project.slug} className="scroll-mt-24 border-t border-line py-8 first:border-t-0 md:py-10">
              <div className="grid items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
                <div className="min-w-0 text-center">
                  <button type="button" aria-expanded={open} onClick={() => toggle(project.slug)} className="w-full">
                    <ProjectMark index={index} />
                    <span className="mt-4 block text-lg font-medium leading-tight tracking-tight">
                      {project.title}
                    </span>
                    <span className="mt-2 block text-[11px] uppercase tracking-[0.16em] text-muted">
                      {studio.place}
                    </span>
                  </button>
                  <div
                    className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <dl className="space-y-6 pt-8">
                        {facts.map(([label, value]) => (
                          <div key={label}>
                            <dt className="text-[10px] uppercase tracking-[0.16em] text-muted">{label}</dt>
                            <dd className="mt-1 text-[13px] uppercase tracking-[0.06em]">{value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="relative min-w-0">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-label={open ? `Close ${project.title}` : `Open ${project.title}`}
                    onClick={() => toggle(project.slug)}
                    className={`shot relative block overflow-hidden motion-safe:transition-[width,height] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      open
                        ? "h-[52vh] w-full lg:h-[70vh] lg:w-[calc(100%-340px)]"
                        : "h-[220px] w-full lg:h-[300px] lg:w-[680px]"
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 680px, 100vw"
                      className="object-cover"
                    />
                  </button>
                  <div
                    className={`motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      open
                        ? "mt-6 translate-x-0 opacity-100 lg:absolute lg:top-0 lg:right-0 lg:mt-0 lg:h-full lg:w-[320px]"
                        : "pointer-events-none mt-0 max-h-0 translate-x-6 overflow-hidden opacity-0 lg:absolute lg:top-0 lg:right-0 lg:max-h-none lg:w-[320px]"
                    }`}
                  >
                    <div className="max-w-[36ch] text-left text-[15px] leading-[1.7]">
                      <p>{project.summary}</p>
                      <p className="mt-5">{project.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
