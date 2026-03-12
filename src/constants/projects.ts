
export interface Project {
    id: string;
    slug: string;
    title: string;
    tags: string[];
    year: string;
    isDraft: boolean;
    imageBefore?: string;
    imageAfter?: string;
}

export const PROJECTS_DATA: Project[] = [
    {
        id: "01",
        slug: "modern-landing",
        title: "Modern Landing Redesign",
        tags: ["Frontend", "Tailwind", "React"],
        year: "2026",
        isDraft: false, // ЭТОТ ПРОЕКТ БУДЕТ КЛИКАБЕЛЬНЫМ
        imageBefore: "/cases/yale-old.png",
        imageAfter: "/cases/yale-new.png",
    },
    {
        id: "02",
        slug: "ecommerce-ux",
        title: "E-commerce System",
        tags: ["UI Engineering", "Next.js"],
        year: "2026",
        isDraft: true, // ЭТОТ ОСТАНЕТСЯ ЗАГЛУШКОЙ
    },
];