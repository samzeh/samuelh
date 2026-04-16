export type Project = {
  id: number;
  title: string;
  description: string;
  year: number;
  image?: string;
  videoSrc?: string;
  videoPoster?: string;
  aspectRatio?: string;
  zoom?: number;
  cursorText: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Reimagining the future of LLMs",
    description: "des",
    year: 2026,
    image: "/projects/ripple/ripple.png",
    aspectRatio: "3/1.7",
    cursorText: "view case study",
  },
  {
    id: 2,
    title: "Your next recipe, one scroll away",
    description: "dev",
    year: 2026,
    videoSrc: "/projects/munch/munch.mp4",
    videoPoster: "/projects/munch/munch.png",
    aspectRatio: "3/1.9",
    cursorText: "join the munch",
  },
  {
    id: 3,
    title: "Designing the map of the future",
    description: "des",
    year: 2025,
    videoSrc: "/projects/map/electrium.mp4",
    videoPoster: "/projects/map/electrium.png",
    aspectRatio: "3/1.5",
    cursorText: "view case study",
  },
  {
    id: 4,
    title: "Making emergency rooms SwiftER",
    description: "dev",
    year: 2025,
    videoSrc: "/projects/swifter/swifter.mp4",
    videoPoster: "/projects/swifter/swifter.png",
    aspectRatio: "3/1.5",
    zoom: 1.3,
    cursorText: "view github",
  },

  {
    id: 5,
    title: "Visualizing book recommendations",
    description: "dev",
    year: 2026,
    videoSrc: "/projects/archives/archives.mp4",
    videoPoster: "/projects/archives/archives.png",
    aspectRatio: "3/1.5",
    zoom: 1.3,
    cursorText: "try it out",
  },
  {
    id: 6,
    title: "Be a tourist in your own city",
    description: "des",
    year: 2023,
    image: "/projects/ferret/ferret.png",
    aspectRatio: "3/1.5",
    cursorText: "view case study",
  },
];
