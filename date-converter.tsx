const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  calendar: 'persian',
};

export function GetShamsiDate(date?: string | any) {
  return date
    ? new Date(date).toLocaleDateString('fa-IR', options)
    : new Date().toLocaleDateString('fa-IR', options);
}

const optionsQamari: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  calendar: 'islamic-civil', // Use "islamic-umalqura" for Umm al-Qura calendar
};

export function GetQamariDate(date?: string | any) {
  return date
    ? new Date(date).toLocaleDateString('ar-SA', optionsQamari)
    : new Date().toLocaleDateString('ar-SA', optionsQamari);
}
