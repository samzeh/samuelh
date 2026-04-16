// playMapData.ts — all coordinates in SVG space (0–3458 × 0–2236)

export type MapItem = {
  id: string;
  w: number;
  h: number;
  x: number;
  y: number;
  image: string;
  hoverText: string;
  link?: string;
};

export type Category = {
  id: string;
  label: string;
  items: MapItem[];
};

export const CATEGORIES: Category[] = [
  {
    id: "art",
    label: "art",
    items: [
      { id: "a1", w: 102, h: 129, x: 1880, y: 1624, image: "/art/bird.png", hoverText: "watercolor" },
      { id: "a2", w: 120, h: 83, x: 2099, y: 1620, image: "/art/dishes.png", hoverText: "featured in toronto youth voices" },
      { id: "a3", w: 133, h: 104, x: 2160, y: 1906, image: "/art/oil.png", hoverText: "oil painting" },
      { id: "a4", w: 104, h: 149, x: 2279, y: 1673, image: "/art/phone.png", hoverText: "oil painting" },
      { id: "a5", w: 100, h: 116, x: 1700, y: 1767, image: "/art/pinterest.png", hoverText: "oil pastel" },
      { id: "a6", w: 133, h: 99, x: 1871, y: 1914, image: "/art/venice.png", hoverText: "watercolor of venice" },
    ],
  },
  {
    id: "food",
    label: "food",
    items: [
      { id: "d1", w: 79, h: 87, x: 329,  y: 1225, image: "/food/basque.png", hoverText: "basque cheesecake" },
      { id: "d2", w: 71, h: 86, x: 527,  y: 1367, image: "/food/cinnamon.png", hoverText: "cinnamon roll" },
      { id: "d3", w: 76, h: 84, x: 409,  y: 1517, image: "/food/croissant.png", hoverText: "croissant" },
      { id: "d4", w: 77, h: 83, x: 166,  y: 1477, image: "/food/croque.png", hoverText: "cream puffs" },
      { id: "d5", w: 77, h: 86, x: 116,  y: 1287, image: "/food/donut.png", hoverText: "pumpkin-themed donuts" },
    ],
  },
  {
    id: "coding",
    label: "coding",
    items: [
      { id: "e1", w: 130, h: 81, x: 1400, y: 180, image: "/coding/nomad.png", hoverText: "click me: langchain experimentation", link: "https://github.com/samzeh/nomad" },
      { id: "e2", w: 126, h: 71, x: 1813, y: 295, image: "/coding/peedee.png", hoverText: "click me: discord bot for 1k+ server", link: "https://github.com/jonnyoo/modmail-web-hosting-test.git" },
      { id: "e3", w: 126, h: 79, x: 1736, y: 440, image: "/coding/ece.png", hoverText: "click me: frontend testing for blog website", link: "https://github.com/samzeh/ece-blog-front" },
      { id: "e4", w: 126, h: 79, x: 1420, y: 396, image: "/coding/portfolio.png", hoverText: "click me: old portfolio", link: "https://samzeh.github.io/old-portfolio/" },
    ],
  },
  {
    id: "photos",
    label: "photos",
    items: [
      { id: "w1", w: 117, h: 88, x: 3012, y: 880, image: "/photos/china.png", hoverText: "hubei, china, 2019" },
      { id: "w2", w: 85, h: 113, x: 2852, y: 1053, image: "/photos/heart.png", hoverText: "pei 2022" },
      { id: "w3", w: 85, h: 94, x: 3092, y: 1176, image: "/photos/me.png", hoverText: "first time at waterloo" },
      { id: "w4", w: 105, h: 79, x: 3191, y: 1027, image: "/photos/venice.png", hoverText: "venice 2018" },
    ],
  },
];