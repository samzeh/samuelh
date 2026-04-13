import type { ReactNode } from "react";
import ProjectTableOfContents from "./components/ProjectTableOfContents";

export default function ProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="w-full max-w-6xl pb-16">
      <div className="flex items-start gap-8 lg:gap-12 py-8">
        <ProjectTableOfContents />
        <div data-project-content className="min-w-0 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
