// @todo Bring back the import when middleware.ts stops crashing because of that
// import "server-only";

import { type Locale } from "./i18n-config";
import { i18n } from "./i18n-config";

const dictionaryLookup = {
  per: () => import("./dictionaries/per.json").then((module) => module.default),
  ps: () => import("./dictionaries/ps.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
  // Locale may be equal to any value if matcher in middleware.ts returns false

  if (locale in dictionaryLookup) {
    return dictionaryLookup[locale as Locale]();
  }

  return dictionaryLookup[i18n.defaultLocale]();
};

export const baseUrlByLocale: Record<Locale, string> = {
  per: "http://per.localhost:3000",
  ps: "http://ps.localhost:3000",
};
