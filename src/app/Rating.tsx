const FULL_STAR = "★";
const EMPTY_STAR = "☆";

interface Props {
    score: number, // a number between 0 and 5 (including)
}

const Rating = (props: Props) => {
    const score = Math.round(props.score);
    if (score < 0 || score > 5) {
        const msg = `Score out of bounds: ${props.score}`;
        console.warn(msg);
        return <div className="err-msg">{msg}</div>
    } else {
        return <div className="rating">
            <span className="fill">
                {FULL_STAR.repeat(score)}
            </span>
            <span className="outline">
                {EMPTY_STAR.repeat(5 - score)}
            </span>
        </div>
    }
}

export default Rating;