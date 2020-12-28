import { createStore } from 'redux';
import reducer from './reducer';
import { TimelineEntry } from '../data/Timeline';
import { LabelTranslations } from '../data/Labels';
import * as C from './constants';
import { RatingData } from '../data/Ratings';

export interface ReduxState {
  data?: JsonData,
  timelineEntries: TimelineEntry[],
  language: string,
  date_precision: string,
}

export interface JsonData {
  labels: LabelTranslations,
  timeline: TimelineEntry[],
  ratings: RatingData,
}

export const fallbackState: ReduxState = {
  timelineEntries: [],
  language: "en",
  date_precision: C.DATE_PRECISION_MONTH,
}


let devTools = undefined;
if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
  // Redux dev tools are available
  let devToolOptions = {
    trace: false,
    traceLimit: 25
  };
  devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__(devToolOptions);
}

export default createStore(reducer, fallbackState, devTools);
