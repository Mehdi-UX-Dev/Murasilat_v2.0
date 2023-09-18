import { getDictionary } from "@/i18n-server";
import { localeProps } from "@/universalTypes";

async function FetchDictionary({ params: { locale } }: localeProps) {
  const dictionary = await getDictionary(locale);
}

export default FetchDictionary;

//? i don't know if this component is usable and logical 