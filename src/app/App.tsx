import React from 'react';
import DataLoader from './DataLoader';
import Sidebar from './Sidebar';
import UrlHashManager from './UrlHashManager';
import TextCV from './TextCV';
import '../css/main.scss';

// @FUTURE_ME:
// You need to have no warnings when you want to deploy this via vercel,
// otherwise the build will fail with the following errors
// """Treating warnings as errors because process.env.CI = true
// Most CI servers set it automatically.
// Failed to compile."""

// --------------------------- TODOs -------------------------------
// Add skills: frameworks, tools
// Make it more mobile friendly?
// Maybe add what type of work environment I would like / dislike (table)?
// -----------------------------------------------------------------


export default function App() {
  return <div className="app">
    <Sidebar />

    <div className="main">
      <DataLoader>
        <TextCV />  
      </DataLoader>

      <UrlHashManager />
    </div>
  </div>
}
