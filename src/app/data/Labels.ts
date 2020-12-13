import labels_json from './labels.json';
import { LString } from '../LocalizedText';

const ERR = "<ERROR: not defined>";

export interface PersonalInfo {
  label: LString,
  value: LString,
  hidden: boolean,
}

export interface LabelTranslations {
  headings: {
    cv: LString,
    edu: LString,
    jobs: LString,
    other: LString,
  },
  infos: {
    name: PersonalInfo,
    email: PersonalInfo,
    birthyear: PersonalInfo,
    gender: PersonalInfo,
    nationality: PersonalInfo,
    location: PersonalInfo,
    cv: PersonalInfo,
  },
  misc: {
    hidden_label: LString,
    // hidden_tooltip: LString,
  },
}

const getJsonDict = (category: string): any => {
  let dict = (labels_json as any)[category];
  if (dict) {
    return dict;
  } else {
    console.error(`[CRITICAL] JSON file contains no '${category}'. 'labels.json' has value"`, labels_json);
    return {};
  }
}

const parseInfo = (json_obj: any): PersonalInfo => {
  return {
    label: json_obj.label || ERR,
    value: json_obj.value || ERR,
    hidden: Boolean(json_obj.hidden),
  }
}

export function loadLabels(): LabelTranslations {
  let h = getJsonDict("headings");
  let i = getJsonDict("infos");
  let m = getJsonDict("misc");
  return {
    headings: {
      cv: h.cv || ERR,
      edu: h.edu || ERR,
      jobs: h.jobs || ERR,
      other: h.other || ERR,
    },
    infos: {
      name: parseInfo(i.name),
      email: parseInfo(i.email),
      birthyear: parseInfo(i.birthyear),
      gender: parseInfo(i.gender),
      nationality: parseInfo(i.nationality),
      location: parseInfo(i.location),
      cv: parseInfo(i.cv),
    },
    misc: {
      hidden_label: m.hidden_label || ERR,
      // hidden_tooltip: m.hidden_tooltip || ERR,
    },
  }
}
