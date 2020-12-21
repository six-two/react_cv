import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import * as C from './redux/constants';
import { LabelTranslations } from './data/Labels';
import LocalizedText, { LString } from './LocalizedText';
import LanguageChooser from './LanguageChooser';
import DatePrecisionChooser from './DatePrecisionChooser';


interface Props {
    labels?: LabelTranslations,
}

interface EntryProps {
    title: LString,
    url: string,
}

const Entry = (props: EntryProps) => {
    return <li>
        <a href={props.url}>
            <LocalizedText text={props.title} />
        </a>
    </li>
}

const Sidebar = (props: Props) => {
    const headings = props.labels?.headings;
    const links = props.labels?.external_links;
    return <div className="sidebar no-print">
        <div className="content">
            <div className="heading first">Language</div>
            <LanguageChooser />
            {props.labels && headings && links &&
                <>
                    <div className="heading">
                        <LocalizedText text={props.labels.settings.date_precision.label} />
                    </div>
                    <DatePrecisionChooser />

                    <div className="heading">
                        <LocalizedText text={headings.toc} />
                    </div>
                    <ul>
                        <Entry title={headings.cv} url="#cv" />
                        <Entry title={headings.edu} url="#education" />
                        <Entry title={headings.jobs} url="#jobs" />
                        <Entry title={headings.other} url="#other" />
                        <Entry title={headings.it_skills} url="#it-skills" />
                    </ul>

                    <div className="heading">
                        <LocalizedText text={links.heading} />
                    </div>
                    <ul>
                        <Entry title={links.me} url={C.MY_WEBSITE} />
                        <Entry title={links.projects} url={C.MY_PROJECTS} />
                        <Entry title={links.source} url={C.CV_SOURCE} />
                    </ul>
                </>
            }
        </div>
    </div>
}

const mapStateToProps = (state: ReduxState) => ({
    labels: state.data?.labels,
});

export default connect(mapStateToProps)(Sidebar);
