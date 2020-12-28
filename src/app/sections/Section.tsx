import LocalizedText, { LString } from '../LocalizedText';

export interface SectionData {
    heading: LString,
    toc_id: string | null,
    content: JSX.Element | null,
    subsections?: SectionData[],
}

interface Props {
    section: SectionData,
    level: number,
}

interface VarHeadingProps {
    text: LString,
    level: number,
    id?: string,
}

const VarHeading = (props: VarHeadingProps) => {
    const text = <LocalizedText text={props.text} />;
    switch (props.level) {
        case 1:
            return <h1 id={props.id}>{text}</h1>;
        case 2:
            return <h2 id={props.id}>{text}</h2>;
        case 3:
            return <h3 id={props.id}>{text}</h3>;
        default:
            console.warn(`Unexpected heading level: ${props.level}`);
            return <h4 id={props.id}>{text}</h4>
    }
}

const RecursiveSectionRenderer = (props: Props) => {
    return <div className="section">
        <VarHeading
            text={props.section.heading}
            level={props.level + 1}
            id={props.section.toc_id || undefined} />

        {props.section.content}

        {props.section.subsections && props.section.subsections.map(
            (sub, i) => <RecursiveSectionRenderer
                key={i}
                section={sub}
                level={props.level + 1} />
        )}
    </div>
}

export default RecursiveSectionRenderer;
