import React from 'react';
import { connect } from 'react-redux';
import { JsonData, ReduxState } from '../redux/store';
import { TimelineEntry } from '../data/Timeline';
import { LabelTranslations } from '../data/Labels';
import SimpleTimeline from '../SimpleTimeline';
import LocalizedText from '../LocalizedText';
import PersonalInfo from '../PersonalInfo';


interface Props {
    labels: LabelTranslations,
    timeline: TimelineEntry[],
}

const TextTimelines = (props: Props) => {
    const headings = props.labels.headings;
    return <div>
        <h1>
            <LocalizedText text={headings.cv} />
        </h1>

        <div className="pi-div">
            <PersonalInfo
                info={props.labels.infos.name} />
            <PersonalInfo
                info={props.labels.infos.email}
                is_email={true} />
            <PersonalInfo
                info={props.labels.infos.location} />
            <PersonalInfo
                info={props.labels.infos.nationality} />
            <PersonalInfo
                info={props.labels.infos.gender} />
            <PersonalInfo
                info={props.labels.infos.birthyear} />
            <PersonalInfo
                info={props.labels.infos.cv}
                is_url={true} />
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
