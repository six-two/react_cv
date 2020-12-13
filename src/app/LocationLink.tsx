import { connect } from 'react-redux';
import { ReduxState } from './redux/store';
import LocalizedText, { getLocalizedText } from './LocalizedText';
import { Place } from './data/Timeline';


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
    if (text) {
        if (props.place.link) {
            const linkLocation = getLocalizedText(props.place.link, props.lang).trim();
            if (linkLocation) {
                return <>
                    <span>{props.prefix}</span>
                    <a href={linkLocation}>
                        {text}
                    </a>
                </>
            }
        }
    return <span>{props.prefix + text}</span>;
    } else {
        return null;
    }
}


const mapStateToProps = (state: ReduxState) => ({
    lang: state.language,
});

export default connect(mapStateToProps)(LocationLink);
