import React from 'react';
import { setTimelineEntries } from './redux/actions';
import { loadTimeline } from './data/Timeline';
import { loadLabels } from './data/Labels';
import GraphExperiment from './pages/GraphExperiment';
import TextCV from './pages/TextTimelines';
import '../css/main.scss';

// @FUTURE_ME:
// You need to have no warnings when you want to deploy this via vercel,
// otherwise the build will fail with the following errors
// """Treating warnings as errors because process.env.CI = true
// Most CI servers set it automatically.
// Failed to compile."""

// --------------------------- TODOs -------------------------------
// add a takeaway field to everything
// -----------------------------------------------------------------

const TIMELINE = loadTimeline();
setTimelineEntries(TIMELINE);
const LABELS = loadLabels();

const DEBUG_CHARTS = false;

export default function App() {
  if (DEBUG_CHARTS) {
    return <GraphExperiment />
  } else {
    return <TextCV
      labels={LABELS}
      timeline={TIMELINE} />
  }
}
