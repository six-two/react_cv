import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { setDatePrecision } from './redux/actions';
import * as C from './redux/constants';
import { Settings } from './data/Labels';
import LocalizedDropdown from './LocalizedDropdown';
import { LString } from './LocalizedText';


interface Props {
    date_precision: string,
    settings_labels?: Settings,
}

function DatePrecisionChooser(props: Props) {
    if (props.settings_labels) {
        const dp_label = props.settings_labels.date_precision;
        const options = new Map<string, LString>();
        options.set(C.DATE_PRECISION_DAY, dp_label.day);
        options.set(C.DATE_PRECISION_MONTH, dp_label.month);
        options.set(C.DATE_PRECISION_YEAR, dp_label.year);
        
        return <div className="lang-chooser">
            <LocalizedDropdown
                optionMap={options}
                value={props.date_precision}
                onValueChange={setDatePrecision} />
        </div>
    } else {
        return <div className="err-msg">ERROR: Could not load labels!</div>;
    }
}

const mapStateToProps = (state: ReduxState) => ({
    date_precision: state.date_precision,
    settings_labels: state.data?.labels.settings
});

export default connect(mapStateToProps)(DatePrecisionChooser);
