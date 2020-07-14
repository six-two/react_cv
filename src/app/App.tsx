import React from 'react';
import { setTimelineEntries } from './redux/actions';
import { loadTimeline } from './data/Timeline';
import { loadLabels } from './data/Labels';
import SimpleTimeline from './SimpleTimeline';
import LanguageChooser from './LanguageChooser';
import LocalizedText from './LocalizedText';
import '../css/main.scss';

// --------------------------- TODOs -------------------------------
// add a takeaway field to everything
// parse dates
// translate static content (like headers)
// make yaml2json.py watch for file changes
// -----------------------------------------------------------------

const TIMELINE = loadTimeline();
setTimelineEntries(TIMELINE);
const LABELS = loadLabels();


export default function App() {
  return <div className="app">
    <div style={{ margin: "20px" }}>
      <LanguageChooser />
    </div>

    <h1>
      <LocalizedText text={LABELS.headings.cv} />
    </h1>
    <div className="center">Name: Patrick Schlueter</div>

    <h2>
      <LocalizedText text={LABELS.headings.edu} />
    </h2>
    <SimpleTimeline entries={TIMELINE.filter(x => x.type === "edu")} />

    <h2>
      <LocalizedText text={LABELS.headings.jobs} />
    </h2>
    <SimpleTimeline entries={TIMELINE.filter(x => x.type === "job")} />

    <h2>
      <LocalizedText text={LABELS.headings.other} />
    </h2>
    <SimpleTimeline entries={TIMELINE.filter(x => x.type === "other")} />
  </div>
}
