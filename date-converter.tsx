const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  calendar: "persian",
};

export function GetShamsiDate() {
  return new Date().toLocaleDateString("fa-IR", options);
}

const optionsQamari: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  calendar: "islamic-civil", // Use "islamic-umalqura" for Umm al-Qura calendar
};

export function GetQamariDate() {
  return new Date().toLocaleDateString("ar-SA", optionsQamari);
}
