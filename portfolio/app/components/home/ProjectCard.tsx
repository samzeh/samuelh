'use client';
import React from "react";
import Image from "next/image";
import { useCursorContext } from "../CursorContext";
import type { Project } from "./projects";

interface ProjectCardProps {
  project: Project;
}


import Link from "next/link";

// Map project IDs to slugs for case studies
const caseStudySlugs: Record<number, string> = {
  1: "ripple",
  3: "map",
  4: "swift-er",
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const { setCursorLabel } = useCursorContext();
  const zoom = project.zoom || 1.2;

  const handleMouseEnter = () => {
    setCursorLabel(project.cursorText);
  };

  const handleMouseLeave = () => {
    setCursorLabel(null);
  };

  // Card content
  const cardContent = (
    <div className="overflow-hidden flex flex-col">
      {project.vimeoId ? (
        <div
          className="w-full relative overflow-hidden rounded-md border border-[#E7EEF3]"
          style={{ aspectRatio: project.aspectRatio || "16/9" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <iframe
            src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&muted=1&loop=1&background=1`}
            title={project.title}
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{
              width: `${zoom * 100}%`,
              height: `${zoom * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div
          className="w-full relative rounded-md border border-[#E7EEF3] overflow-hidden"
          style={{ aspectRatio: project.aspectRatio || "3/2" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={project.image!}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="flex justify-between box-border p-1 text-lg">
        <div>
          <h2 className="text-main text-heading-color">{project.title}</h2>
        </div>
        <span className="text-detail-color">
          {project.description}  <span className='text-l mx-1'>·</span>  {project.year}
        </span>
      </div>
    </div>
  );

  // If the project has a case study, link to the new slug-based route
  if (caseStudySlugs[project.id]) {
    return (
      <Link
        href={`/projects/${caseStudySlugs[project.id]}`}
        style={{ textDecoration: "none", color: "inherit", cursor: "none" }}
      >
        {cardContent}
      </Link>
    );
  }
  return cardContent;
}