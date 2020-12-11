import timeline_json from './timeline.json';
import { LString, LDate } from '../Localize';

let idCounter = 0;


export interface TimelineEntry {
  headline: LString
  company: LString,
  date: {
    start: LDate,
    end: LDate | null,
  },
  description: LString,
  type: "edu" | "job" | "other" | "",
  id: number,
}

function getId() {
  idCounter += 1;
  return idCounter;
}


function parseDate(dateString: string): LDate {
  if (!dateString) {
    throw new Error("Empty date string");
  }
  if (dateString === "now") {
    const now = new Date();
    return {
      isNow: true,
      year: now.getUTCFullYear(),
      month: now.getUTCMonth(),
      day: now.getUTCDay(),
    }
  }
  const parts = dateString.split("-");
  if (parts.length > 3) {
    throw new Error(`Invalid date format "${dateString}"`);
  }
  return {
    isNow: false,
    year: parseNumberInBounds(parts[0], 1998, 2100),
    month: parts.length >= 2 ? parseNumberInBounds(parts[1], 1, 13) : undefined,
    day: parts.length >= 3 ? parseNumberInBounds(parts[2], 1, 32) : undefined,
  }
}

function parseNumberInBounds(str: string, minI: number, maxE: number) {
  const n = Number(str);
  if (n < minI || n >= maxE) {
    throw new Error(`Number ${n} out of bounds: [${minI}, ${maxE})`);
  } else {
    return n;
  }
}

function parseTimelineEntry(e: any): TimelineEntry {
  const dateString = (e.d || "") as string;
  if (!dateString) {
    throw new Error(`No date in "${JSON.stringify(e)}"`);
  }
  const dates = dateString.split(" - ");
  if (dates.length > 2) {
    throw new Error(`Invalid date format "${dateString}"`);
  }
  const date = {
    start: parseDate(dates[0].trim()),
    end: dates.length >= 2 ? parseDate(dates[1].trim()) : null,
  };
  //TODO verify that startDate < endDate

  return {
    headline: e.h || "",
    company: e.c || "",
    date: date,
    description: e.t || "",
    type: e.x || "",
    id: getId(),
  };
}

export function loadTimeline(): TimelineEntry[] {
  return timeline_json.map(parseTimelineEntry);
}
