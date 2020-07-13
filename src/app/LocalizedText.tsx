import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { LString, getLocalized } from './DataLoader';


interface Props {
  className?: string,
  text: LString,
  defaultText?: string,
  multiLine?: boolean,
  lang: string,
}

const mapStateToProps = (state: ReduxState) => ({
  lang: state.language,
});

const LocalizedText = (props: Props) => {
  let text = props.text || props.defaultText;
  if (text) {
    const multiLine = props.multiLine === true;
    const className = props.className + (multiLine ? " multi-line" : "");
    text = getLocalized(text, props.lang);

    return <div className={className}>
      {multiLine ?
        text.split('\n').map(
          (item, i) =>
            <p key={i}>
              {item}
            </p>
        )
        : text
      }
    </div>
  } else {
    return null;
  }
}

export default connect(mapStateToProps)(LocalizedText);
