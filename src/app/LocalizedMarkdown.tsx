import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { ReduxState } from './redux/store';
import { getLocalizedText, LString } from './LocalizedText';


interface LocalizedTextProps {
    text: LString,
    lang: string,
}

const LocalizedMarkdown = (props: LocalizedTextProps) => {
    const localized = getLocalizedText(props.text, props.lang);
    return <ReactMarkdown>{localized}</ReactMarkdown>
}

const mapStateToProps = (state: ReduxState) => ({
    lang: state.language,
});

export default connect(mapStateToProps)(LocalizedMarkdown);
