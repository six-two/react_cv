import React from 'react';
import DataLoader from './DataLoader';
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

const DEBUG_CHARTS = false;


export default function App() {
  return <DataLoader>
    {DEBUG_CHARTS ? <GraphExperiment /> : <TextCV />}
  </DataLoader>
}
