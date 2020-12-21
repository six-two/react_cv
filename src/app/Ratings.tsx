import LocalizedText, { LString } from "./LocalizedText"
import Rating from "./Rating"

interface Props {
    heading: LString,
    ratings: RatingInfo[],
}

interface RatingInfo {
    label: LString,
    rating: number,
}

const compareRatings = (a: RatingInfo, b: RatingInfo): number => {
    return b.rating - a.rating;
}

const Row = (props: RatingInfo) => {
    return <div className="row-style">
        <div className="text">
            <LocalizedText text={props.label} />
        </div>
        <Rating score={props.rating} />
    </div>
}

const RatingsTable = (props: Props) => {
    // Clone, then sort best to worst rating
    const ratings = [...props.ratings];
    ratings.sort(compareRatings);

    return <div className="ratings">
        <h3>
            <LocalizedText text={props.heading} />
        </h3>

        <div className="table-style">
            {ratings.map(x => Row(x))}
        </div>
    </div>
}

export default RatingsTable;
