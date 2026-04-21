export interface Project {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  year: string;
  isDraft: boolean;
  theme?: "theme-gold" | "theme-sky" | "theme-silver";
  externalLink?: string;
  image: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "01",
    slug: "vintage-garage",
    title: "Vintage Garage",
    tags: ["Automotive UI", "Performance", "Three.js"],
    year: "2026",
    isDraft: false,
    theme: "theme-gold",
    externalLink: "https://steelcode-3d-garage.vercel.app/",
    image: "/assets/bmw_m3.webp",
  },
  {
    id: "02",
    slug: "real-estate",
    title: "Real Estate",
    tags: ["React", "JavaScript", "Node"],
    year: "2026",
    isDraft: false,
    theme: "theme-silver",
    image: "/assets/sity.webp",
  },
  {
    id: "03",
    slug: "iron-hop-craft",
    title: "Iron Hop Craft",
    tags: ["Digital Identity", "Experience", "Framer Motion"],
    year: "2026",
    isDraft: false,
    theme: "theme-sky",
    image: "/assets/beer.webp",
  },
  {
    id: "04",
    slug: "barber-kids",
    title: "Barber Kids",
    tags: ["HTML5/CSS3", "JavaScript", "jQuery"],
    year: "2025",
    isDraft: false,
    theme: "theme-silver",
    externalLink: "https://stepanic4.github.io/SteelCodeHTML5/",
    image: "/assets/barber.webp",
  },
];
