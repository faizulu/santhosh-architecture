import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/lib/projects";

function Marquee({
  items,
  direction,
}: {
  items: Project[];
  direction: "up" | "down";
}) {
  const filled = Array.from({ length: 4 }, () => items).flat();
  const sets = [filled, filled];

  return (
    <div className="marquee-viewport h-full flex-1 overflow-hidden">
      <div className={direction === "up" ? "marquee-up" : "marquee-down"}>
        {sets.map((set, setIndex) => (
          <div
            key={setIndex}
            className="flex flex-col gap-4 pb-4"
            aria-hidden={setIndex === 1 ? true : undefined}
          >
            {set.map((project, index) => (
              <Link
                key={`${setIndex}-${index}-${project.slug}`}
                href={`/work/${project.slug}`}
                aria-label={setIndex === 0 && index < items.length ? project.title : undefined}
                tabIndex={setIndex === 0 && index < items.length ? undefined : -1}
                className="relative block aspect-square overflow-hidden"
              >
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="15vw"
                  className="object-cover"
                />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function FloatingWorks() {
  const upward = projects.filter((_, index) => index % 2 === 0);
  const downward = projects.filter((_, index) => index % 2 === 1);

  return (
    <aside
      aria-label="Project works"
      className="hidden h-[100dvh] gap-4 bg-black p-4 lg:flex"
    >
      <Marquee items={upward} direction="up" />
      <Marquee items={downward} direction="down" />
    </aside>
  );
}
