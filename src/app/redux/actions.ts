import * as C from './constants';
import store, { JsonData } from './store';


// dispatch
const d = store.dispatch;

// actions
export interface Action {
  type: string,
  payload: string | number | boolean | null | JsonData,
}

// action creators
export function setLanguage(value: string) {
  d({
    type: C.ACTION_SET_LANGUAGE,
    payload: value,
  });
}

export function setDatePrecision(value: string) {
  d({
    type: C.ACTION_SET_DATE_PRECISION,
    payload: value,
  });
}

export function setData(value: JsonData) {
  d({
    type: C.ACTION_SET_DATA,
    payload: value,
  });
}
