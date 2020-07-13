import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { LString, getLocalized } from './Localize';


interface LocalizedTextProps {
  text: LString,
  defaultText?: string,
  multiLine?: "text" | "list",
  lang: string,
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

const _LocalizedText = (props: LocalizedTextProps) => {
  let text = props.text || props.defaultText;
  if (text) {
    text = getLocalized(text, props.lang);
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
export const LocalizedText = connect(mapStateToProps)(_LocalizedText);
export default LocalizedText;
