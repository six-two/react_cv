import { useState } from 'react';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { PersonalInfo } from './data/Labels';
import LocalizedText, { getLocalizedText, LString } from './LocalizedText';

interface Props {
    info: PersonalInfo,
    is_url?: boolean,
    is_email?: boolean,
    reveal_button_label: LString,
    lang: string,
}

interface HiddenInfoProps {
    children: any[],
    reveal_button_label: LString,
}

const HiddenInfo = (props: HiddenInfoProps) => {
    const [revealed, setRevealed] = useState(false);

    if (revealed) {
        return <>{props.children}</>;
    } else {
        const onClick = () => setRevealed(true);
        return <button onClick={onClick}>
            <LocalizedText
                text={props.reveal_button_label} />
        </button>
    }
}

const PersonalInfoLabel = (props: Props) => {
    let value: any = getLocalizedText(props.info.value, props.lang);
    if (props.is_email) {
        // Make it a clickable email link
        value = <a href={`mailto:${value}`}>
            {value}
        </a>
    } else if (props.is_url) {
        // Make it a clickable link
        value = <a href={value}>
            {value}
        </a>
    }
    if (props.info.hidden) {
        // Hide it behind a button
        value = <HiddenInfo reveal_button_label={props.reveal_button_label}>
            {value}
        </HiddenInfo>
    }

    return <div className="row">
        <div className="cell pi-label">
            {getLocalizedText(props.info.label, props.lang)}
        </div>
        <div className="cell pi-value">
            {value}
        </div>
    </div>
}

const mapStateToProps = (state: ReduxState) => ({
    lang: state.language,
    reveal_button_label: state.data?.labels.misc.hidden_label || "<ERROR>",
});

export default connect(mapStateToProps)(PersonalInfoLabel);

