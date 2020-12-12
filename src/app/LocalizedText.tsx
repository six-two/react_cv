import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';


interface LocalizedTextProps {
  text: LString,
  defaultText?: string,
  multiLine?: "text" | "list",
  lang: string,
}

export interface LocalizedString {
  en?: string, // english
  de?: string, // german
  [key: string]: string | undefined,
}

export type LString = LocalizedString | string;

export function getLocalizedText(lstring: LString, language: string): string {
  if (typeof lstring === "string") {
    return lstring;
  } else {
    let local = lstring[language];
    if (!local) {
      local = lstring.en; // fall back to the english version
    }

    if (local) {
      return local;
    } else {
      // Oops, I am screwed
      console.error(`Can not localize to "${language}": "${JSON.stringify(lstring)}"`)
      return "<Error with localization>"
    }
  }
}


export const MultiLineText = (props: { text: string }) => {
  return <div className="multi-line">
    {props.text.split('\n').map(
      (item, i) =>
        <p key={i}>
          {item}
        </p>
    )}
  </div>
}

export const List = (props: { entries: string[] }) => {
  return <ul>
    {props.entries.map(
      (item, i) =>
        <li key={i}>
          {item}
        </li>
    )}
  </ul>
}

const LocalizedText = (props: LocalizedTextProps) => {
  let text = props.text || props.defaultText;
  if (text) {
    text = getLocalizedText(text, props.lang);
    switch (props.multiLine) {
      case undefined:
        return <>{text}</>
      case "text":
        return <MultiLineText text={text} />
      case "list":
        return <List entries={text.split('\n')} />
      default:
        return <div>Invalid multiLine value: "{props.multiLine}"</div>
    }
  } else {
    return null;
  }
}

const mapStateToProps = (state: ReduxState) => ({
  lang: state.language,
});

export default connect(mapStateToProps)(LocalizedText);
