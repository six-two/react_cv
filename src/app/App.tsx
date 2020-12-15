import React from 'react';
import DataLoader from './DataLoader';
import Settings from './Settings';
import UrlHashManager from './UrlHashManager';
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
// Add language, framework, etc proficiency
// add a takeaway field to everything
// -----------------------------------------------------------------

const DEBUG_CHARTS = false;


export default function App() {
  return <div className="app">
    <Settings />

    <DataLoader>
      {DEBUG_CHARTS ? <GraphExperiment /> : <TextCV />}
    </DataLoader>

    <UrlHashManager />
  </div>
}
