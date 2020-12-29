import { connect } from 'react-redux';
import { JsonData, ReduxState } from './redux/store';
import * as C from './redux/constants';
import LocalizedText, { LString } from './LocalizedText';
import LanguageChooser from './LanguageChooser';
import DatePrecisionChooser from './DatePrecisionChooser';
import { SectionData } from './sections/Section';
import { getLocalizedDate } from './LocalizedDate';


interface Props {
    data?: JsonData,
    lang: string,
    sections: SectionData[],
}

interface EntryProps {
    title: LString,
    url: string,
}

interface TocProps {
    sections: SectionData[],
}

const Entry = (props: EntryProps) => {
    return <li>
        <a href={props.url}>
            <LocalizedText text={props.title} />
        </a>
    </li>
}

// A recursive conponent for rendering the table of contents
const TableOfContents = (props: TocProps) => {
    const entries = props.sections && props.sections.filter(s => s.toc_id);
    if (entries) {
        return <ul>
            {entries.map((section, i) =>
                <div key={i}>
                    <Entry
                        title={section.heading}
                        url={"#" + section.toc_id} />

                    {section.subsections &&
                        <TableOfContents sections={section.subsections} />}
                </div>
            )}
        </ul>
    } else {
        return null;
    }
}

const Sidebar = (props: Props) => {
    if (props.data) {
        const headings = props.data.labels.headings;
        const links = props.data.labels.external_links;
        const date_precision_label = props.data.labels.settings.date_precision.label;
        // This should generally be true, since the app should only be rebuilt when I push a change
        const last_updated_date = props.data.build.date;
        return <div className="sidebar no-print">
            <div className="content">
                <div className="heading first">Language</div>
                <LanguageChooser />
                <div className="heading">
                    <LocalizedText text={date_precision_label} />
                </div>
                <DatePrecisionChooser />

                <div className="heading">
                    <LocalizedText text={headings.toc} />
                </div>

                <TableOfContents sections={props.sections} />

                <div className="heading">
                    <LocalizedText text={links.heading} />
                </div>
                <ul>
                    <Entry title={links.me} url={C.MY_WEBSITE} />
                    <Entry title={links.projects} url={C.MY_PROJECTS} />
                    <Entry title={links.source} url={C.CV_SOURCE} />
                </ul>

                <div className="expand" />
                <div className="last-updated">
                    <LocalizedText text={props.data.labels.misc.last_updated} />
                    <div>
                        {getLocalizedDate(last_updated_date, props.lang, C.DATE_PRECISION_DAY)}
                    </div>
                </div>
            </div>
        </div >
    } else {
        return null;
    }
}

const mapStateToProps = (state: ReduxState) => ({
    data: state.data,
    lang: state.language,
});

export default connect(mapStateToProps)(Sidebar);
