import * as C from './constants';
import store, { JsonData } from './store';

let batch_list: Action[] | null = null;
// dispatch
const d = (action: Action) => {
    if (batch_list === null) {
        store.dispatch(action);
    } else {
        batch_list.push(action);
    }
}

// actions
export interface Action {
    type: string,
    payload: string | number | boolean | null | JsonData | Action[],
}

export function startBatch() {
    if (batch_list !== null) {
        console.warn("Redux batch mode has already been started. Starting a new batch now.");
        endBatch();
    }
    // Enable batch mode
    batch_list = [];
}

export function endBatch() {
    if (batch_list === null) {
        console.warn("Redux batch mode has already been ended.");
        return;
    } else {
        if (batch_list.length === 0) {
            // Do nothing
        } else if (batch_list.length === 1) {
            // Just trigger the action normally
            store.dispatch(batch_list[0]);
        } else {
            // Send out a batch action
            store.dispatch({
                type: C.ACTION_BATCH,
                payload: batch_list,
            });
        }
        // Disable batch mode
        batch_list = null;
    }
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
