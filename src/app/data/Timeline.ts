import timeline_json from './timeline.json';
import { LString } from '../Localize';

let idCounter = 0;


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
