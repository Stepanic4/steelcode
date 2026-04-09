export interface Project {
    id: string;
    slug: string;
    title: string;
    tags: string[];
    year: string;
    isDraft: boolean;
    theme?: "theme-gold" | "theme-sky" | "theme-silver";
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
    },
    {
        id: "02",
        slug: "iron-hop-craft",
        title: "Iron Hop Craft",
        tags: ["Digital Identity", "Experience", "Framer Motion"],
        year: "2026",
        isDraft: false,
        theme: "theme-sky",
    },
    {
        id: "03",
        slug: "barber-kids",
        title: "Barber Kids",
        tags: ["HTML5/CSS3", "JavaScript", "jQuery"],
        year: "2025",
        isDraft: false,
        theme: "theme-silver",
    },
];