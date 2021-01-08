import React from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { LabelTranslations } from './data/Labels';
import LocalizedText from './LocalizedText';
import Sidebar from './Sidebar';
import RecursiveSectionRenderer, { SectionData } from './sections/Section';

interface Props {
    labels?: LabelTranslations,
    sections: SectionData[],
}

const TextTimelines = (props: Props) => {
    if (props.labels) {
        return <>
            <Sidebar sections={props.sections} />

            <div className="main">
                <h1 id="cv">
                    <LocalizedText text={props.labels.headings.cv} />
                </h1>

                {props.sections.map((sub, i) => <RecursiveSectionRenderer
                    key={i}
                    section={sub}
                    level={1} />
                )}
            </div>
        </>
    } else {
        return null;
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        labels: state.data?.labels,
    }
};

export default connect(mapStateToProps)(TextTimelines);
