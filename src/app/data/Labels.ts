import labels_json from './labels.json';
import { LString } from '../Localize';

const ERR = "<ERROR: not defined>";

interface LabelTranslations {
  headings: {
    cv: LString,
    edu: LString,
    jobs: LString,
    other: LString,
  },
}

export function loadLabels(): LabelTranslations {
  const h = labels_json.headings
  if (!h){
    throw new Error("JSON file contains so headings: 'labels.json'");
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
