import React from "react";
import Image from "next/image";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });


interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    year: number;
    image?: string;
    vimeoId?: string;
    aspectRatio?: string; // e.g., "3/2", "16/9"
    zoom?: number;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const zoom = project.zoom || 1.2; 
  return (
    <div className="overflow-hidden flex flex-col">
      
      {project.vimeoId ? (
        <div
          className="w-full relative overflow-hidden rounded-md border border-[#E7EEF3]"
          style={{ aspectRatio: project.aspectRatio || "16/9" }}
        >
          <iframe
            src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&muted=1&loop=1&background=1`}
            title={project.title}
            className="absolute top-1/2 left-1/2"
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
          <h2 className="text-main text-heading">{project.title}</h2>
        </div>
        <span className="text-detail">
          {project.description}  <span className='text-l mx-1'>·</span>  {project.year}
        </span>
      </div>
    </div>
  );
}