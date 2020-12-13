import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { getLocalizedText, LString } from './LocalizedText';


interface Props {
    text: LString,
    link: LString,
    lang: string,
}

const LinkTextComponent = (props: Props) => {
    const text = getLocalizedText(props.text, props.lang);
    if (text) {
        const linkLocation = getLocalizedText(props.link, props.lang).trim()
        if (linkLocation) {
            return <a href={linkLocation}>
                {text}
            </a>
        } else {
            return <span>{text}</span>;
        }
    } else {
        return null;
    }
}


const mapStateToProps = (state: ReduxState) => ({
    lang: state.language,
});

export default connect(mapStateToProps)(LinkTextComponent);
