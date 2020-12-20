import { useState } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { setLanguage, setDatePrecision, startBatch, endBatch } from './redux/actions';
import * as C from './redux/constants';

interface Settings {
    lang: string,
    date: string,
}

interface Props {
    settings: Settings,
}

const VALID_LANGUAGES = ["en", "de"];
const VALID_DATE_PRECISIONS = [C.DATE_PRECISION_DAY, C.DATE_PRECISION_MONTH, C.DATE_PRECISION_YEAR];

const redux2url = (settings: Settings) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(settings)) {
        params.set(key, value);
    }

    // Replace the params of the current url without causing a reload
    const new_url = new URL(window.location.href);
    new_url.search = params.toString();
    window.history.replaceState(null, "", new_url.href);
}

const updateField = (current: string,
    params: URLSearchParams,
    param_name: string,
    allowed_values: string[],
    setter: (str: string) => void) => {

    const param = params.get(param_name);
    if (param && param !== current) {
        // we have a changed value
        if (allowed_values.includes(param)) {
            setter(param);
        } else {
            const error_message = `Url parameter "${param_name}" has invalid value "${param}".\nAllowed values are: ${allowed_values.join(", ")}`
            console.warn(error_message);
        }
    }
}

const url2redux = (settings: Settings) => {
    let queryString = window.location.search;
    if (queryString) {
        console.log(`Read url parameters: ${queryString}\nOld settings were`, settings);
        try {
            startBatch();

            const params = new URLSearchParams(queryString.substr(1));
            updateField(settings.lang, params, "lang",
                VALID_LANGUAGES, setLanguage);
            updateField(settings.date, params, "date",
                VALID_DATE_PRECISIONS, setDatePrecision);
        } catch (e) {
            console.error("Error while updating fileds from URL", e)
        } finally {
            endBatch();
        }
    }
}

const UrlHashManager = (props: Props) => {
    const [first_render, set_first_render] = useState(true);

    if (first_render) {
        url2redux(props.settings);

        set_first_render(false);
    } else {
        console.info("Writing url parameters:", props.settings);
        redux2url(props.settings)
    }
    return null;
}

const mapStateToProps = (state: ReduxState) => ({
    settings: {
        lang: state.language,
        date: state.date_precision,
    }
});

export default connect(mapStateToProps)(UrlHashManager);
