import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import * as C from './redux/constants';
import { LabelTranslations } from './data/Labels';
import LocalizedText, { LString } from './LocalizedText';
import LanguageChooser from './LanguageChooser';
import DatePrecisionChooser from './DatePrecisionChooser';
import { SectionData } from './sections/Section';


interface Props {
    labels?: LabelTranslations,
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

                    <TableOfContents sections={props.sections} />

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
