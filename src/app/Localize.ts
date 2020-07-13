export interface LocalizedString {
  en?: string, // english
  de?: string, // german
  [key: string]: string | undefined,
}

export type LString = LocalizedString | string;


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
