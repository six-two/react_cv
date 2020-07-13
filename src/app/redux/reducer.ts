import { Action } from './actions';
import * as C from './constants';
import { ReduxState, fallbackState } from './store';
import { TimelineEntry } from '../DataLoader';


export default function reducer(state: ReduxState | undefined, action: Action): ReduxState {
  if (!state) {
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = fallbackState;
  }

  switch (action.type) {
    case C.ACTION_SET_LANGUAGE:
      return setLanguage(state, action.payload as string);
    case C.ACTION_SET_TIMELINE_ENTRIES:
      return setTimelineData(state, action.payload as TimelineEntry[])
    case "@@INIT":
      return state;
    default:
      console.warn(`Unknown action type: "${action.type}"`);
      return state;
  }
}

const setLanguage = (state: ReduxState, value: string) => {
  return {
    ...state,
    language: value,
  }
}

const setTimelineData = (state: ReduxState, value: TimelineEntry[]) => {
  return {
    ...state,
    timelineEntries: value,
  }
}
