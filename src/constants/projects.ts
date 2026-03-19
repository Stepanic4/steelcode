export interface Project {
    id: string;
    slug: string;
    title: string;
    tags: string[];
    year: string;
    isDraft: boolean;
}

export const PROJECTS_DATA: Project[] = [
    {
        id: "01",
        slug: "vantage-motorworks",
        title: "Vantage Motorworks",
        tags: ["Automotive UI", "Performance", "Three.js"],
        year: "2026",
        isDraft: false,
    },
    {
        id: "02",
        slug: "iron-hop-craft",
        title: "Iron Hop Craft",
        tags: ["Digital Identity", "Experience", "Framer Motion"],
        year: "2026",
        isDraft: false,
    },
];