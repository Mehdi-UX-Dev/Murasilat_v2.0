export const i18n = {
    defaultLocale: "per",
    locales: ["en", "per", "ps"],
  } as const;
  
  export type Locale = (typeof i18n)["locales"][number];
  export type Dictionary = typeof import("./dictionaries/en.json");