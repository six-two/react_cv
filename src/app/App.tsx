import React from 'react';
import { setTimelineEntries } from './redux/actions';
import { loadTimeline } from './DataLoader';
import SimpleTimeline from './SimpleTimeline';
import LanguageChooser from './LanguageChooser';
import '../css/main.scss';

// --------------------------- TODOs -------------------------------
// add a takeaway field to everything
// parse dates
// translate static content (like headers)
// make yaml2json.py watch for file changes
// -----------------------------------------------------------------

const TIMELINE = loadTimeline();
setTimelineEntries(TIMELINE);


export default function App() {
  return <div className="app">
    <h1>CV</h1>
    <LanguageChooser />
    <div className="center">Name: Patrick Schlueter</div>

    <h2>Education</h2>
    <SimpleTimeline entries={TIMELINE.filter(x => x.type === "edu")} />

    <h2>Work experience</h2>
    <SimpleTimeline entries={TIMELINE.filter(x => x.type === "job")} />

    <h2>Other</h2>
    <SimpleTimeline entries={TIMELINE.filter(x => x.type === "other")} />
  </div>
}
