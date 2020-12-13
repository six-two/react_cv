import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import { getLocalizedText } from './LocalizedText';
import { Place } from './data/Timeline';
import LinkTextComponent from './LinkTextComponent';


interface Props {
    place: Place,
    lang: string,
    prefix: string,
}

const getPlaceText = (p: Place, lang: string): string => {
    const country = getLocalizedText(p.country, lang);
    const town = getLocalizedText(p.town, lang);
    if (country) {
        if (town) {
            return `${town} (${country})`;
        } else {
            return `${country}`;
        }
    } else {
        if (town) {
            return `${town}`;
        } else {
            // no town or county -> no text
            return "";
        }
    }
}

const LocationLink = (props: Props) => {
    const text = getPlaceText(props.place, props.lang);
    return <>
        {text && props.prefix}
        <LinkTextComponent
            text={text}
            link={props.place.link} />
    </>
}


const mapStateToProps = (state: ReduxState) => ({
    lang: state.language,
});

export default connect(mapStateToProps)(LocationLink);
