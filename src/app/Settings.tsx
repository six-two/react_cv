import React, { useState } from 'react';
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
    const [closed, setClosed] = useState(false);
    const [show_settings, setShowSettings] = useState(false);

    if (closed) {
        return null;
    }
    const close = () => setClosed(true);
    const toggleVisibility = () => setShowSettings(!show_settings);
    return <div className="lang-choose-box no-print">
        <button
            className="close-button"
            onClick={close}>
            &#x274C;
        </button>
        <div className="text">Select a language</div>
        <LanguageChooser />

        {props.labels &&
            <>
                {show_settings && props.labels &&
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

                <button
                    className="toggle-settings"
                    onClick={toggleVisibility}>
                    <LocalizedText text={
                        show_settings ?
                            props.labels.settings.label_hide
                            : props.labels.settings.label_show
                    } />
                </button>
            </>
        }
    </div>
}

const mapStateToProps = (state: ReduxState) => ({
    labels: state.data?.labels,
});

export default connect(mapStateToProps)(Settings);
