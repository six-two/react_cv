import React from 'react';
import { TimelineEntry } from './data/Timeline';
import LocalizedText from './LocalizedText';
import LocalizedDate from './LocalizedDate';
import LocationLink from './LocationLink';
import LinkTextComponent from './LinkTextComponent';


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
      <div className="date">
        <LocalizedDate date={entry.date.start} />
        {entry.date.end &&
          <>
            <br />
            {"-"}
            <LocalizedDate date={entry.date.end} />
          </>
        }
      </div>
    </div>
    <div className="content-div">
      <div className="headline">
        <LocalizedText text={entry.headline} defaultText="<No title>" />
      </div>
      <div className="company">
        <LinkTextComponent
          text={entry.company.text}
          link={entry.company.link} />
        <LocationLink
          prefix={entry.company.text ? ", " : ""}
          place={entry.place} />
      </div>
      <div className="description">
        <LocalizedText text={entry.description} multiLine="text" />
      </div>
    </div>
  </div>
}

export default SimpleTimeline;
