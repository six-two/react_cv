import React from 'react';
import DataLoader from './DataLoader';
import Sidebar from './Sidebar';
import UrlHashManager from './UrlHashManager';
import Footer from './Footer';
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
// use query for settings, change it with url api (no reloading required)
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

      <Footer />
      <UrlHashManager />
    </div>
  </div>
}
