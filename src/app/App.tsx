import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import DataLoader from './DataLoader';
import UrlHashManager from './UrlHashManager';
import LanguageChooserScreen from './LanguageChooserScreen';
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
// Maybe add what type of work environment I would like / dislike (table)?
// -----------------------------------------------------------------

interface Props {
  lang: string,
}


const App = (props: Props) => {
  return <div className="app">
    {props.lang ?
      // language set: show the CV in the given language
      <DataLoader>
        <SectionManager />
      </DataLoader>
      : // otherwise, show the language screen and load the data in the background
      <>
        <DataLoader />
        <LanguageChooserScreen />
      </>}

    <UrlHashManager />
  </div>
}

const mapStateToProps = (state: ReduxState) => ({
  lang: state.language,
});

export default connect(mapStateToProps)(App);
