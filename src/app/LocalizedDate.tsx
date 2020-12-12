import { connect } from 'react-redux';
import { ReduxState } from './redux/store';

export interface LDate {
  isNow: boolean,
  year: number,
  month?: number,
  day?: number,
}

interface Props {
  date: LDate,
  lang: string,
}

export function getLocalizedDate(date: LDate, language: string): string {
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
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'UTC',
      year: 'numeric',
      // only show these values if they are set
      // since I start counting at 1, any value should be evaluated as true
      month: date.month ? 'short' : undefined,
      day: date.day ? 'numeric' : undefined,
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
    {getLocalizedDate(props.date, props.lang)}
  </>
}

const mapStateToProps = (state: ReduxState) => ({
  lang: state.language,
});
export default connect(mapStateToProps)(LocalizedDate);
