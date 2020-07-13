import { createStore } from 'redux';
import reducer from './reducer';
import { TimelineEntry } from '../data/Timeline';
// import * as C from './constants';

export interface ReduxState {
  timelineEntries: TimelineEntry[],
  language: string,
}

export const fallbackState: ReduxState = {
  timelineEntries: [],
  language: "en",
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
