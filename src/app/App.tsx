import React from 'react';
import DataLoader from './DataLoader';
import UrlHashManager from './UrlHashManager';
import SectionManager from './sections/SectionManager';
import '../css/main.scss';

// @FUTURE_ME:
// You need to have no warnings when you want to deploy this via vercel,
// otherwise the build will fail with the following errors
// """Treating warnings as errors because process.env.CI = true
// Most CI servers set it automatically.
// Failed to compile."""

// --------------------------- TODOs -------------------------------
// Add skills: frameworks
// Make it more mobile friendly?
// Maybe add what type of work environment I would like / dislike (table)?
// -----------------------------------------------------------------


export default function App() {
  return <div className="app">
    <DataLoader>
      <SectionManager />
    </DataLoader>

    <UrlHashManager />
  </div>
}
