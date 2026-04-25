import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// Строгая типизация локали из нашего конфига (en | cs | de)
type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // В новых версиях Next.js это Promise, ждем резолва
  let locale = await requestLocale;

  // Валидация: если локаль мусорная или ее нет, откатываемся на дефолт (en)
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    // Динамический импорт нужного JSON словаря
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
