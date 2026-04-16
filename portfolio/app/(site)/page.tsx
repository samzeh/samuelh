import { FaBriefcase } from 'react-icons/fa'
import { HomeInteractive } from "@/app/(site)/HomeInteractive";
import ProjectCard from "@/app/components/home/ProjectCard";
import { projects } from "@/app/components/home/projects";
import Hyperlink from '../components/Hyperlink';
import InlineItem from '../components/InlineItem';

export default function Home() {
  return (
    <main className="flex flex-col mt-15">
      <HomeInteractive />

      <div className="flex items-center gap-x-1 text-[15px] md:text-[18px] text-detail-color mt-1.5">
        <FaBriefcase />
        <InlineItem
          label="curr. tpm"
          icon="/needlist.png"
          iconAlt="needlist logo"
        >
          <Hyperlink
            href="https://needlist.org"
            text="needlist.org"
            imageSrc="/home/needlistorg.png"
            imageAlt="needlist"
          />, swe
        </InlineItem>
        
        <InlineItem
          icon="/watai.png"
          iconAlt="watai logo"
        >
          <Hyperlink
            href="https://watai.ca"
            text="wat.ai"
            imageSrc="/home/vista4ph.png"
            imageAlt="vista4ph"
          />
        </InlineItem>
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