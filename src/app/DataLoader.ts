import timeline_json from '../data/timeline.json';

let idCounter = 0;

export interface LocalizedString {
  en?: string, // english
  de?: string, // german
  [key: string]: string | undefined,
}

export type LString = LocalizedString | string;

export interface TimelineEntry {
  headline: LString
  company: LString,
  date: LString,
  description: LString,
  type: "edu" | "job" | "other" | "",
  id: number,
}

function getId() {
  idCounter += 1;
  return idCounter;
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

function parseTimelineEntry(e: any): TimelineEntry {
  return {
    headline: e.h || "",
    company: e.c || "",
    date: e.d || "",
    description: e.t || "",
    type: e.x || "",
    id: getId(),
  };
}

export function loadTimeline() {
  return timeline_json.map(parseTimelineEntry);
}
