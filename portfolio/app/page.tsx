import Image from 'next/image'
import { FaBriefcase } from 'react-icons/fa'
import { HomeInteractive } from './components/home/HomeInteractive'
import React from "react";
import ProjectCard from "./components/home/ProjectCard";
import { projects } from "./components/home/projects";

export default function Home() {
  return (
    <main className="flex flex-col mt-15 mx-4">
      <HomeInteractive />

      <div className="flex items-center gap-1.5 text-[18px] text-detail-color mt-1.5">
        <FaBriefcase />
        <span>curr. tpm</span>
        <Image src="/needlist.png" alt="needlist logo" width={20} height={20} className="rounded" />
        <span>needlist.org, swe</span>
        <Image src="/watai.png" alt="watai logo" width={20} height={20} className="rounded" />
        <span>wat.ai</span>
      </div>

      {/* Mobile: one column */}
      <div className="flex flex-col gap-3 mt-5 md:hidden">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Desktop: two columns */}
      <div className="hidden md:flex gap-6 mt-5 items-start">
        <div className="flex flex-col gap-2 flex-1">
          {projects.filter((_, i) => i % 2 === 0).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="flex flex-col gap-2 flex-1">
          {projects.filter((_, i) => i % 2 !== 0).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  )
}