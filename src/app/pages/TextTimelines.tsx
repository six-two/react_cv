import React from 'react';
import { connect } from 'react-redux';
import { JsonData, ReduxState } from '../redux/store';
import { TimelineEntry } from '../data/Timeline';
import { LabelTranslations } from '../data/Labels';
import SimpleTimeline from '../SimpleTimeline';
import LanguageChooser from '../LanguageChooser';
import LocalizedText from '../LocalizedText';


interface Props {
    labels: LabelTranslations,
    timeline: TimelineEntry[],
}

const TextTimelines = (props: Props) => {
    const headings = props.labels.headings;
    const email = "cv@six-two.dev";
    return <div className="app">
        <div className="lang-choose-box">
            <div className="text">Select a language</div>
            <LanguageChooser />
        </div>
        
        <h1>
            <LocalizedText text={headings.cv} />
        </h1>

        <div className="center">Name: Patrick Schlueter</div>
        <div className="center">
            {"Email: "}
            <a href={`mailto:${email}`}>
                {email}
            </a>
        </div>

        <h2>
            <LocalizedText text={headings.edu} />
        </h2>
        <SimpleTimeline entries={props.timeline.filter(x => x.type === "edu")} />

        <h2>
            <LocalizedText text={headings.jobs} />
        </h2>
        <SimpleTimeline entries={props.timeline.filter(x => x.type === "job")} />

        <h2>
            <LocalizedText text={headings.other} />
        </h2>
        <SimpleTimeline entries={props.timeline.filter(x => x.type === "other")} />
    </div>
}

const mapStateToProps = (state: ReduxState) => {
    if (!state.data) {
        console.warn("ReduxState has no data loaded");
    }
    const data = state.data as JsonData;
    return {
        labels: data.labels,
        timeline: data.timeline,
    }
};

export const ReduxComponent = connect(mapStateToProps)(TextTimelines);
export default ReduxComponent;
