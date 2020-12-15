import { Action } from './actions';
import * as C from './constants';
import { ReduxState, fallbackState, JsonData } from './store';
import { getLocalizedText } from '../LocalizedText';


export default function reducer(state: ReduxState | undefined, action: Action): ReduxState {
  if (!state) {
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = fallbackState;
  }

  switch (action.type) {
    case C.ACTION_BATCH:
      for (const batch_action of action.payload as Action[]) {
        state = reducer(state, batch_action);
      }
      return state;
    case C.ACTION_SET_LANGUAGE:
      state = setLanguage(state, action.payload as string);
      return updateWindowTitle(state);
    case C.ACTION_SET_DATE_PRECISION:
      return setDatePrecision(state, action.payload as string);
    case C.ACTION_SET_DATA:
      return setData(state, action.payload as JsonData);
    case "@@INIT":
      return updateWindowTitle(state);
    default:
      console.warn(`Unknown action type: "${action.type}"`);
      return state;
  }
}

const updateWindowTitle = (state: ReduxState): ReduxState => {
  const ltitle = state.data?.labels.headings.cv;
  if (ltitle) {
    const title = getLocalizedText(ltitle, state.language);
    window.document.title = title;
  }
  return state;
}

const setLanguage = (state: ReduxState, value: string) => {
  return {
    ...state,
    language: value,
  }
}

const setDatePrecision = (state: ReduxState, value: string) => {
  return {
    ...state,
    date_precision: value,
  }
}

const setData = (state: ReduxState, value: JsonData) => {
  if (state.data) {
    // Ignore this call if we already have data loaded
    return state;
  } else {
    return {
      ...state,
      data: value,
    }
  }
}
