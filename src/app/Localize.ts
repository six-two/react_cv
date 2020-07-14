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

function englishDateFormat(date: LDate): string {
  if (date.isNow) {
    return "now";
  } else {
    let dateString = "" + date.year;
    if (date.month) {
      dateString += "-" + date.month;
      if (date.day) {
        dateString += "-" + date.day;
      }
    }
    return dateString;
  }
}

export function getLocalizedDate(date: LDate, language: string): string {
  //TODO find library for this, or at least add zero padding
  switch (language) {
    case "en":
      return englishDateFormat(date);
    case "de": {
      if (date.isNow) {
        return "heute";
      } else {
        let dateString = "" + date.year;
        if (date.month) {
          dateString = date.month + "." + dateString;
          if (date.day) {
            dateString = date.day + "." + dateString;
          }
        }
        return dateString;
      }
    }
    default:
      console.error(`[DateFormat] Unknown language: "${language}"`)
      return englishDateFormat(date);

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
