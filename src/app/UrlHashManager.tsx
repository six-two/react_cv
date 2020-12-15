import { useEffect } from 'react';
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

const createHash = (settings: Settings) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(settings)) {
        params.set(key, value);
    }
    return "#" + params.toString();
}

const updateField = (current: string,
    params: URLSearchParams,
    param_name: string,
    allowed_values: string[],
    setter: (str: string) => void,
    ignore_errors: boolean) => {

    const param = params.get(param_name);
    if (param && param !== current) {
        // we have a changed value
        if (allowed_values.includes(param)) {
            setter(param);
        } else {
            const error_message = `Url parameter "${param_name}" has invalid value "${param}".\nAllowed values are: ${allowed_values.join(", ")}`
            console.log(error_message);
            if (!ignore_errors) {
                alert(error_message);
            }
        }
    }
}

const updateAllFields = (settings: Settings, ignore_errors: boolean = false) => {
    let queryString = window.location.hash;
    if (queryString) {
        console.log(`Updating fields from URL: ${queryString}`);
        console.debug(settings);
        try {
            startBatch();

            const params = new URLSearchParams(queryString.substr(1));
            updateField(settings.lang, params, "lang",
                VALID_LANGUAGES, setLanguage, ignore_errors);
            updateField(settings.date, params, "date",
                VALID_DATE_PRECISIONS, setDatePrecision, ignore_errors);
        } catch (e) {
            console.error("Error while updating fileds from URL", e)
        } finally {
            endBatch();
        }
    }
}

const UrlHashManager = (props: Props) => {
    // Update all fields from url, when first created
    useEffect(() => {
        console.log("Initial reading of URL variables");
        updateAllFields(props.settings, true);
    });

    // First update the event listener
    window.onhashchange = () => {
        console.log("Hash changed");
        updateAllFields(props.settings);
    };

    console.log("Setting hash");
    // Then update the hash
    window.location.hash = createHash(props.settings);
    // Order is important, otherwise it causes extra actions for my redux reducer

    return null;
}

const mapStateToProps = (state: ReduxState) => ({
    settings: {
        lang: state.language,
        date: state.date_precision,
    }
});

export default connect(mapStateToProps)(UrlHashManager);
