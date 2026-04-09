export type Project = {
  id: number;
  title: string;
  description: string;
  year: number;
  image?: string;
  vimeoId?: string;
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
    image: "/ripple.png",
    aspectRatio: "3/1.7",
    cursorText: "view case study",
  },
  {
    id: 2,
    title: "Your next recipe, one scroll away",
    description: "dev",
    year: 2026,
    vimeoId: "1181391862",
    aspectRatio: "3/1.9",
    cursorText: "waitlist",
  },
  {
    id: 3,
    title: "Designing the map of the future",
    description: "des",
    year: 2025,
    vimeoId: "1181397282",
    aspectRatio: "3/1.5",
    cursorText: "coming soon",
  },
  {
    id: 4,
    title: "Making emergency rooms SwiftER",
    description: "dev",
    year: 2025,
    vimeoId: "1181399176",
    aspectRatio: "3/1.5",
    zoom: 1.3,
    cursorText: "view case study",
  },

  {
    id: 5,
    title: "Visualizing book recommendations",
    description: "dev",
    year: 2026,
    vimeoId: "1181401227",
    aspectRatio: "3/1.5",
    zoom: 1.3,
    cursorText: "view project",
  },
  {
    id: 6,
    title: "Be a tourist in your own city",
    description: "dev",
    year: 2023,
    image: "/ferret.png",
    aspectRatio: "3/1.5",
    cursorText: "view project",
  },
];
