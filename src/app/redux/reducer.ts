import { Action } from './actions';
import * as C from './constants';
import { ReduxState, fallbackState, JsonData } from './store';


export default function reducer(state: ReduxState | undefined, action: Action): ReduxState {
  if (!state) {
    console.warn("No state was supplied to reducer. Falling back to default values");
    state = fallbackState;
  }

  switch (action.type) {
    case C.ACTION_SET_LANGUAGE:
      return setLanguage(state, action.payload as string);
    case C.ACTION_SET_DATA:
      return setData(state, action.payload as JsonData)
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
