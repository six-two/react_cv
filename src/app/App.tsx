import React from 'react';
import DataLoader from './DataLoader';
import Sidebar from './Sidebar';
import SidebarManager from './SidebarManager';
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
// Add link to my website and source code
// Fix it for mobile
// -----------------------------------------------------------------

export default function App() {
  return <div className="app">
    <SidebarManager>
      <div className="main">
        <DataLoader>
          <TextCV />
        </DataLoader>

        <UrlHashManager />
      </div>
    </SidebarManager>
  </div>
}
