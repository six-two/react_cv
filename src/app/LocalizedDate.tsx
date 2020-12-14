import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import * as C from './redux/constants';


export interface LDate {
  isNow: boolean,
  year: number,
  month?: number,
  day?: number,
}

interface Props {
  date: LDate,
  precision: string,
  lang: string,
}

export function getLocalizedDate(date: LDate, language: string, precision: string): string {
  if (date.isNow) {
    switch (language) {
      case "en":
        return "now";
      case "de":
        return "heute";
      default:
        console.error(`[DateFormat] Unknown language: "${language}"`)
        return "now";
    }
  } else {
    // only show the fields if they are set
    let show_day = Boolean(date.day);
    let show_month = Boolean(date.month);

    // hide some fields, depending on the precision choosen
    if (precision === C.DATE_PRECISION_YEAR) {
      show_day = show_month = false;
    } else if (precision === C.DATE_PRECISION_MONTH) {
      show_day = false;
    }

    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'UTC',
      year: 'numeric',
      // only show these values if they are set
      // since I start counting at 1, any value should be evaluated as true
      month: show_month ? 'short' : undefined,
      day: show_day ? 'numeric' : undefined,
    };

    const y = date.year;
    // Just give some default values that are in the middle
    // That should prevent timezone issues from doing to much damage
    const m = date.month ? date.month - 1 : 5;//they use 0 based months :(
    const d = date.day ?? 15;
    const native_date = new Date(Date.UTC(y, m, d, 12, 0, 0));
    return native_date.toLocaleDateString(language, options);
  }
}

const LocalizedDate = (props: Props) => {
  return <>
    {getLocalizedDate(props.date, props.lang, props.precision)}
  </>
}

const mapStateToProps = (state: ReduxState) => ({
  precision: state.date_precision,
  lang: state.language,
});
export default connect(mapStateToProps)(LocalizedDate);
