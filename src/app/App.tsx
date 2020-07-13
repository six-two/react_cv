import React from 'react';
import '../css/main.scss';
import { loadTimeline, TimelineEntry, LString, getLocalized } from './DataLoader';

// --------------------------- TODOs -------------------------------
// add a takeawaf field to every thing
// parse dates
// -----------------------------------------------------------------

const TIMELINE = loadTimeline();

let CURRENT_LANG = "de";//DBG

export default function App() {
  return <div className="app">
    <h1>Timeline</h1>
    <div className="timeline">
      {TIMELINE.map(SimpleTimelineDisplay)}
    </div>
  </div>
}

const L = (ls: LString) => getLocalized(ls, CURRENT_LANG);

function LocalizedField(props: { className?: string, text: LString, defaultText?: string }) {
  const text = props.text || props.defaultText;
  if (text) {
    return <div className={props.className}>{L(text)}</div>
  } else {
    return null;
  }
}

function MultiLineText(props: { className?: string, text: string }) {
  return <div className={props.className}>
    {props.text.split('\n').map((item, i) => <p key={i}>{item}</p>)}
  </div>
}

function SimpleTimelineDisplay(entry: TimelineEntry) {
  return <div className="timeline-entry" key={entry.id}>
    <div className="date-div">
      <LocalizedField className="date" text={entry.date} />
    </div>
    <div className="content-div">
      <LocalizedField className="headline" text={entry.headline} defaultText="<No title>" />
      <LocalizedField className="company" text={entry.company} />
      {entry.description &&
        <MultiLineText className="description" text={L(entry.description)} />
      }
    </div>
  </div>
}
