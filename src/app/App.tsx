import React from 'react';
import '../css/main.scss';
import { loadTimeline, TimelineEntry, LString, getLocalized } from './DataLoader';

// --------------------------- TODOs -------------------------------
// -----------------------------------------------------------------

const TIMELINE = loadTimeline();

let CURRENT_LANG = "de";//DBG

export default function App() {
  return <div className="app">
    <h1>Test</h1>
    {JSON.stringify(TIMELINE)}
    {TIMELINE.map(SimpleTimelineDisplay)}
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

function SimpleTimelineDisplay(entry: TimelineEntry) {
  return <div className="timeline-entry" key={entry.id}>
    <LocalizedField className="headline" text={entry.headline} defaultText="<No title>" />
    <LocalizedField className="company" text={entry.company} defaultText="<No company>" />
    <LocalizedField className="date" text={entry.date} />
    <LocalizedField className="description" text={entry.description} />
  </div>
}
