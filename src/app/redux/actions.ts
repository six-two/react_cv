import * as C from './constants';
import store from './store';
import { TimelineEntry } from '../DataLoader';


// dispatch
const d = store.dispatch;

// actions
export interface Action {
  type: string,
  payload: string | number | boolean | null | TimelineEntry[],
}

// action creators
export function setLanguage(value: string) {
  d({
    type: C.ACTION_SET_LANGUAGE,
    payload: value,
  });
}

export function setTimelineEntries(value: TimelineEntry[]) {
  d({
    type: C.ACTION_SET_TIMELINE_ENTRIES,
    payload: value,
  });
}
