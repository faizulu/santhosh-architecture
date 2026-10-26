import type { Metadata } from "next";
import { WorkIndex } from "@/components/work-index";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Houses, interiors, and a shared workshop yard.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-8 md:px-8 md:py-10">
      <h1 className="sr-only">Work</h1>
      <div>
        {projects.length === 0 ? (
          <p className="text-base text-muted">No projects are listed yet.</p>
        ) : (
          <WorkIndex projects={projects} />
        )}
      </div>
    </div>
  );
}
