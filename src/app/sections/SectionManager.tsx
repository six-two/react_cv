import { useState } from 'react';
import { connect } from 'react-redux';
import { JsonData, ReduxState } from '../redux/store';
import { SectionData } from './Section';
import PersonalInfoSection from './PersonalInfoSection';
import SimpleTimeline from './SimpleTimeline';
import RatingTable from './RatingTable';
import TextCV from '../TextCV';


interface Props {
    data?: JsonData,
}

const buildSections = (data: JsonData): SectionData[] | null => {
    const headings = data.labels.headings;
    const timeline = data.timeline;
    const ratings = data.ratings;
    try {
        const personal_infos = {
            heading: headings.personal_infos,
            toc_id: "infos",
            content: <PersonalInfoSection />,
        };

        const education = {
            heading: headings.edu,
            toc_id: "education",
            content: <SimpleTimeline entries={timeline.filter(x => x.type === "edu")} />,
        };

        const jobs = {
            heading: headings.jobs,
            toc_id: "jobs",
            content: <SimpleTimeline entries={timeline.filter(x => x.type === "job")} />,
        };

        const timeline_other = {
            heading: headings.other,
            toc_id: "timeline-misc",
            content: <SimpleTimeline entries={timeline.filter(x => x.type === "other")} />,
        }

        const ratings_prog_lang = {
            heading: ratings.prog_lang.heading,
            toc_id: "programming-languages",
            content: <RatingTable data={ratings.prog_lang} />
        }

        const ratings_lang = {
            heading: ratings.languages.heading,
            toc_id: "languages",
            content: <RatingTable data={ratings.languages} />
        }

        const ratings_software = {
            heading: ratings.software.heading,
            toc_id: "software",
            content: <RatingTable data={ratings.software} />
        }

        const ratings_section = {
            heading: headings.skills,
            toc_id: "ratings",
            content: null,
            subsections: [ratings_lang, ratings_prog_lang, ratings_software],
        }

        return [personal_infos, education, jobs, timeline_other, ratings_section];
    } catch (e) {
        console.error("Error while creating sections", e);
        return null;
    }
}

const SectionManager = (props: Props) => {
    const [sections, setSections] = useState<SectionData[] | null>(null);
    if (props.data) {
        if (!sections) {
            // Load sections
            const loadedSections = buildSections(props.data);
            if (loadedSections) {
                setSections(loadedSections);
            } else {
                console.warn("No sections were loaded");
            }
            return null;
        } else {
            // Render the cv
            return <TextCV sections={sections} />
        }
    } else {
        // Wait for json data to be loaded
        return null;
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        data: state.data,
    }
};

export default connect(mapStateToProps)(SectionManager);
