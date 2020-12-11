import React from 'react';
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
    return < div className="app" >
        <div >
            <LanguageChooser />
        </div>

        <h1>
            <LocalizedText text={headings.cv} />
        </h1>
        <div className="center">Name: Patrick Schlueter</div>

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
    </div >
}

export default TextTimelines;
