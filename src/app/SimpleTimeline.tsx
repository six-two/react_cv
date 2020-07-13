import React from 'react';
import { TimelineEntry, LString, getLocalized } from './DataLoader';
import LocalizedText from './LocalizedText';


interface Props {
  entries: TimelineEntry[],
}

export function SimpleTimeline(props: Props) {
  return <div className="timeline">
    {props.entries.map(renderSimpleTimelineEntry)}
  </div>
}

export function renderSimpleTimelineEntry(entry: TimelineEntry) {
  return <div className="timeline-entry" key={entry.id}>
    <div className="date-div">
      <LocalizedText className="date" text={entry.date} />
    </div>
    <div className="content-div">
      <LocalizedText className="headline" text={entry.headline} defaultText="<No title>" />
      <LocalizedText className="company" text={entry.company} />
      <LocalizedText className="description" text={entry.description} multiLine={true} />
    </div>
  </div>
}

export default SimpleTimeline;
