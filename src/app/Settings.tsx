import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { LabelTranslations } from './data/Labels';
import LanguageChooser from './LanguageChooser';
import DatePrecisionChooser from './DatePrecisionChooser';
import LocalizedText from './LocalizedText';


interface Props {
    labels?: LabelTranslations,
}

const Settings = (props: Props) => {
    return <div className="lang-choose-box no-print">
        <div className="text">Select a language</div>
        <LanguageChooser />

        {props.labels &&
            <>
                <div className="text">
                    <LocalizedText text={props.labels.headings.settings} />
                </div>
                <div className="table">
                    <div className="row">
                        <div className="cell">
                            <LocalizedText text={props.labels.settings.date_precision.label} />
                        </div>
                        <div className="cell">
                            <DatePrecisionChooser />
                        </div>
                    </div>
                </div>
            </>
        }
    </div>
}

const mapStateToProps = (state: ReduxState) => ({
    labels: state.data?.labels,
});

export default connect(mapStateToProps)(Settings);
