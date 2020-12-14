import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { LDate, getLocalizedDate } from './LocalizedDate';

interface Props {
    start: LDate,
    end?: LDate | null,
    multiline?: boolean,
    precision: string,
    lang: string,
}


function LocalizedTimeSpan(props: Props) {
    const start_date_string = getLocalizedDate(props.start, props.lang, props.precision);
    let end_date_string;
    if (props.end) {
        const tmp = getLocalizedDate(props.end, props.lang, props.precision);
        if (tmp !== start_date_string) {
            // Start and end are different, so show them both
            end_date_string = tmp;
        }
    }
    const separator = props.multiline ?
        <>
            <br />
            {"-"}
        </>
        : " - ";

    return <div className="date">
        {start_date_string}
        {end_date_string &&
            <>
                {separator}
                {end_date_string}
            </>
        }
    </div>
}

const mapStateToProps = (state: ReduxState) => ({
    precision: state.date_precision,
    lang: state.language,
});
export default connect(mapStateToProps)(LocalizedTimeSpan);
