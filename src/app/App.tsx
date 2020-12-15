import React from 'react';
import DataLoader from './DataLoader';
import Sidebar from './Sidebar';
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
// sidebar with headings like in pdf docs
// maybe use hash for location in document and use query for language?
// Remove the useless template
// Fix it for mobile
// -----------------------------------------------------------------

const DEBUG_CHARTS = false;


export default function App() {
  return <div className="app">
    <Sidebar />

    <div className="main">
      <DataLoader>
        {DEBUG_CHARTS ? <GraphExperiment /> : <TextCV />}
      </DataLoader>

      <UrlHashManager />
    </div>
  </div>
}
