import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { LabelTranslations } from './data/Labels';
import LocalizedText, { LString } from './LocalizedText';
import LanguageChooser from './LanguageChooser';
import DatePrecisionChooser from './DatePrecisionChooser';

interface Props {
    labels?: LabelTranslations,
}

interface EntryProps {
    title: LString,
    id: string,
}

const Entry = (props: EntryProps) => {
    const dest = "#" + props.id;
    return <li>
        <a href={dest}>
            <LocalizedText text={props.title} />
        </a>
    </li>
}

const Sidebar = (props: Props) => {
    const headings = props.labels?.headings;
    return <div className="sidebar no-print">
        <div className="heading first">Language</div>
        <LanguageChooser />
        {props.labels && headings &&
            <>
                <div className="heading">
                    <LocalizedText text={props.labels.settings.date_precision.label} />
                </div>
                <DatePrecisionChooser />
                <div className="heading">
                    <LocalizedText text={headings.toc} />
                </div>
                <ul>
                    <Entry title={headings.cv} id="cv" />
                    <Entry title={headings.edu} id="education" />
                    <Entry title={headings.jobs} id="jobs" />
                    <Entry title={headings.other} id="other" />
                </ul>
            </>
        }
    </div>
}

const mapStateToProps = (state: ReduxState) => ({
    labels: state.data?.labels,
});

export default connect(mapStateToProps)(Sidebar);
