import labels_json from './labels.json';
import { LString } from '../LocalizedText';

const ERR = "<ERROR: not defined>";

export interface PersonalInfo {
  label: LString,
  value: LString,
  hidden: boolean,
}

export interface Headings {
  toc: LString,
  cv: LString,
  personal_infos: LString,
  edu: LString,
  jobs: LString,
  other: LString,
  skills: LString,
}

export interface Settings {
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

export interface ExternalLinks {
  heading: LString,
  me: LString,
  projects: LString,
  source: LString,
}

export interface LabelTranslations {
  headings: Headings,
  settings: Settings,
  infos: PersonalInfos,
  misc: {
    hidden_label: LString,
  },
  external_links: ExternalLinks,
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

export const check = (e: any, default_value?: any) => {
  if (e) {
    return e;
  } else {
    console.warn("Missing field in JSON");
    return default_value || ERR;
  }
}

const loadHeadings = (): Headings => {
  const h = getJsonDict("headings");
  return {
    toc: check(h.toc),
    cv: check(h.cv),
    personal_infos: check(h.personal_infos),
    edu: check(h.edu),
    jobs: check(h.jobs),
    other: check(h.other),
    skills: check(h.skills),
  };
}

const loadSettings = (): Settings => {
  const s = getJsonDict("settings");
  const dp = s.date_precision || {};
  return {
    date_precision: {
      label: check(dp.label),
      day: check(dp.day),
      month: check(dp.month),
      year: check(dp.year),
    }
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

const loadExternalLinks = (): ExternalLinks => {
  const l = getJsonDict("external_links");
  return {
    heading: check(l.heading),
    me: check(l.me),
    projects: check(l.projects),
    source: check(l.source),
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
    },
    external_links: loadExternalLinks(),
  }
}
