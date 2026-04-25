import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "cs", "de"],
  defaultLocale: "en",
});

// Экспортируем типизированные хуки и компоненты.
// Дальше по проекту юзаем ТОЛЬКО их, а не дефолтные из 'next/navigation' и 'next/link'.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
