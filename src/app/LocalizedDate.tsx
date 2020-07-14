import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { LDate, getLocalizedDate } from './Localize';

const _LocalizedDate = (props: { date: LDate, lang: string }) => {
  return <>
    {getLocalizedDate(props.date, props.lang)}
  </>
}

const mapStateToProps = (state: ReduxState) => ({
  lang: state.language,
});
export default connect(mapStateToProps)(_LocalizedDate);
