const FULL_STAR = "★";
const EMPTY_STAR = "☆";
const EMPTY_STARS = EMPTY_STAR.repeat(5);

interface Props {
    score: number, // a number between 0 and 5 (including)
}

const Rating = (props: Props) => {
    if (props.score < 0 || props.score > 5) {
        const msg = `Score out of bounds: ${props.score}`;
        console.warn(msg);
        return <div className="err-msg">{msg}</div>
    } else {
        const full_stars = FULL_STAR.repeat(props.score);
        return <div className="rating">
            <span className="fill">{full_stars}</span>
            <span className="outline">{EMPTY_STARS}</span>
        </div>
    }
}

export default Rating;