"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/projects";

const frames = ["md:col-span-5", "md:col-span-7", "md:col-span-7", "md:col-span-5"];

const aspects = ["aspect-[3/4]", "aspect-[4/3]", "aspect-[16/9]", "aspect-[4/3]"];

export function ProjectMosaic({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();

  return (
    <ul className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-12">
      {projects.map((project, index) => (
        <motion.li
          key={project.slug}
          className={frames[index]}
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: reduce ? 0 : index * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Link href={`/work/${project.slug}`} className="group block">
            <div className={`shot relative ${aspects[index]}`}>
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes={
                  index === 0
                    ? "(min-width: 768px) 58vw, 100vw"
                    : "(min-width: 768px) 40vw, 100vw"
                }
                className="object-cover"
              />
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-4">
              <h3 className="text-lg tracking-tight">{project.title}</h3>
              <p className="text-sm text-muted">{project.year}</p>
            </div>
            <p className="mt-1 text-sm text-muted">{project.kind}</p>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
