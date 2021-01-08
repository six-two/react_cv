import { setLanguage } from './redux/actions';
import { LANGUAGES } from './LanguageChooser';

interface Props {

}

const LanguageChooserScreen = (props: Props) => {
    return <div className="language-screen">
        <div className="top-expand"></div>
        <div className="content">
            <h1>Language / Sprache</h1>
            {[...LANGUAGES.entries()].map(
                ([lang, label], i) => {
                    const onClick = () => setLanguage(lang);
                    return <button
                        key={i}
                        onClick={onClick} >
                        {label}
                    </button>
                }
            )}
        </div>
        <div className="bottom-expand"></div>
    </div>
}

export default LanguageChooserScreen;