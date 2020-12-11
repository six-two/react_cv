import labels_json from './labels.json';
import { LString } from '../Localize';

const ERR = "<ERROR: not defined>";

export interface LabelTranslations {
  headings: {
    cv: LString,
    edu: LString,
    jobs: LString,
    other: LString,
  },
}

export function loadLabels(): LabelTranslations {
  let h = labels_json.headings;
  if (!h){
    console.error("[CRITICAL] JSON file contains no headings: 'labels.json'", labels_json);
    h = {} as any;
  }
  return {
    headings: {
      cv: h.cv || ERR,
      edu: h.edu || ERR,
      jobs: h.jobs || ERR,
      other: h.other || ERR,
    },
  }
}
