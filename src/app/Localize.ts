export interface LocalizedString {
  en?: string, // english
  de?: string, // german
  [key: string]: string | undefined,
}

export type LString = LocalizedString | string;

export interface LDate {
  isNow: boolean,
  year: number,
  month?: number,
  day?: number,
}

const ldate2date = (date: LDate): Date => {
  const y = date.year;
  // Just give some default values that are in the middle
  // That should prevent timezone issues from doing to much damage
  const m = date.month ? date.month - 1 : 5;//they use 0 based months :(
  const d = date.day ?? 15;
  return new Date(Date.UTC(y, m, d, 12, 0, 0));
}

export function getLocalizedDate(date: LDate, language: string): string {
  if (date.isNow) {
    switch (language) {
      case "en":
        return "now";
      case "de":
        return "heute";
      default:
        console.error(`[DateFormat] Unknown language: "${language}"`)
        return "now";

    }
  } else {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'UTC',
      year: 'numeric',
      // only show these values if they are set
      // since I start counting at 1, any value should be evaluated as true
      month: date.month ? 'short' : undefined,
      day: date.day ? 'numeric' : undefined,
    };
    const native_date = ldate2date(date);
    return native_date.toLocaleDateString(language, options);
  }
}

export function getLocalized(lstring: LString, language: string): string {
  if (typeof lstring === "string") {
    return lstring;
  } else {
    let local = lstring[language];
    if (!local) {
      local = lstring.en; // fall back to the english version
    }

    if (local) {
      return local;
    } else {
      // Oops, I am screwed
      console.error(`Can not localize to "${language}": "${JSON.stringify(lstring)}"`)
      return "<Error with localization>"
    }
  }
}
