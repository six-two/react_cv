import { RatingRow, RatingTable } from "./data/Ratings";
import LocalizedText from "./LocalizedText"
import Rating from "./Rating"

interface Props {
    data: RatingTable,
}

const compareRatings = (a: RatingRow, b: RatingRow): number => {
    return b.rating - a.rating;
}

const Row = (props: RatingRow) => {
    return <div className="row-style">
        <div className="text">
            <LocalizedText text={props.label} />
        </div>
        <Rating score={props.rating} />
    </div>
}

const RatingsTable = (props: Props) => {
    // Clone, then sort best to worst rating
    const ratings = [...props.data.ratings];
    ratings.sort(compareRatings);

    return <div className="ratings">
        <h3>
            <LocalizedText text={props.data.heading} />
        </h3>

        <div className="table-style">
            {ratings.map(x => Row(x))}
        </div>
    </div>
}

export default RatingsTable;
