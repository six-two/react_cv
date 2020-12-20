import { Footer } from './data/Labels';
import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import LocalizedText from './LocalizedText';


const ME_URL = "https://six-two.dev";
const SOURCE_CODE_URL = "https://github.com/six-two/react_cv";

interface Props {
    footer?: Footer,
}

const FooterComponent = (props: Props) => {
    if (props.footer) {
        return <footer>
            <a href={SOURCE_CODE_URL}>
                <LocalizedText text={props.footer.coded} />
            </a>
            &nbsp;
            <LocalizedText text={props.footer.by} />
            &nbsp;
            <a href={ME_URL}>
                <LocalizedText text={props.footer.author} />
            </a>
            &nbsp;
            <LocalizedText text={props.footer.date} />
        </footer>
    } else {
        return null;
    }
}

const mapStateToProps = (state: ReduxState) => {
    return {
        footer: state.data?.labels.footer,
    };
}

export default connect(mapStateToProps)(FooterComponent);
