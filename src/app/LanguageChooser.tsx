import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { setLanguage } from './redux/actions';
import Dropdown from './LocalizedDropdown';

const LANGUAGES = new Map<string, string>();
LANGUAGES.set("en", "🇺🇸 English");
LANGUAGES.set("de", "🇩🇪 Deutsch")


interface Props {
  language: string,
}

function LanguageChooser(props: Props) {
  return <div className="lang-chooser">
    <Dropdown
      optionMap={LANGUAGES}
      value={props.language}
      onValueChange={setLanguage} />
  </div>
}

const mapStateToProps = (state: ReduxState) => ({
  language: state.language,
});

export default connect(mapStateToProps)(LanguageChooser);
