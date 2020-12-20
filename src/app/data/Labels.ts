import labels_json from './labels.json';
import { LString } from '../LocalizedText';

const ERR = "<ERROR: not defined>";

export interface PersonalInfo {
  label: LString,
  value: LString,
  hidden: boolean,
}

export interface Headings {
  settings: LString,
  toc: LString,
  cv: LString,
  edu: LString,
  jobs: LString,
  other: LString,
}

export interface Settings {
  label_hide: LString,
  label_show: LString,
  date_precision: {
    label: LString,
    day: LString,
    month: LString,
    year: LString,
  },
}

export interface PersonalInfos {
  name: PersonalInfo,
  email: PersonalInfo,
  birthyear: PersonalInfo,
  gender: PersonalInfo,
  nationality: PersonalInfo,
  location: PersonalInfo,
  cv: PersonalInfo,
}

export interface Footer {
  coded: LString,
  by: LString,
  author: LString,
  date: LString,
}

export interface LabelTranslations {
  headings: Headings,
  settings: Settings,
  infos: PersonalInfos,
  misc: {
    hidden_label: LString,
    // hidden_tooltip: LString,
  },
  footer: Footer,
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
    label: check(json_obj.label),
    value: check(json_obj.value),
    hidden: Boolean(json_obj.hidden),
  }
}

const check = (e: any) => {
  if (e) {
    return e;
  } else {
    console.warn("Missing field in JSON");
    return ERR;
  }
}

const loadHeadings = (): Headings => {
  const h = getJsonDict("headings");
  return {
    settings: check(h.settings),
    toc: check(h.toc),
    cv: check(h.cv),
    edu: check(h.edu),
    jobs: check(h.jobs),
    other: check(h.other),
  };
}

const loadSettings = (): Settings => {
  const s = getJsonDict("settings");
  const dp = s.date_precision || {};
  return {
    label_hide: check(s.label_hide),
    label_show: check(s.label_show),
    date_precision: {
      label: check(dp.label),
      day: check(dp.day),
      month: check(dp.month),
      year: check(dp.year),
    },
  }
}

const loadInfos = (): PersonalInfos => {
  const i = getJsonDict("infos");
  return {
    name: parseInfo(i.name),
    email: parseInfo(i.email),
    birthyear: parseInfo(i.birthyear),
    gender: parseInfo(i.gender),
    nationality: parseInfo(i.nationality),
    location: parseInfo(i.location),
    cv: parseInfo(i.cv),
  };
}

const loadFooter = (): Footer => {
  const f = getJsonDict("footer");
  return {
    coded: check(f.coded),
    by: check(f.by),
    author: check(f.author),
    date: check(f.date),
  };
}

export function loadLabels(): LabelTranslations {
  const m = getJsonDict("misc");
  return {
    headings: loadHeadings(),
    settings: loadSettings(),
    infos: loadInfos(),
    misc: {
      hidden_label: m.hidden_label || ERR,
      // hidden_tooltip: m.hidden_tooltip || ERR,
    },
    footer: loadFooter(),
  }
}
