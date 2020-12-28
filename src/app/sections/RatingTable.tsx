import { RatingRow, RatingTable } from "../data/Ratings";
import LocalizedText from "../LocalizedText"
import StarRating from "../StarRating"

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
        <StarRating score={props.rating} />
    </div>
}

const RatingsTable = (props: Props) => {
    // Clone, then sort best to worst rating
    const ratings = [...props.data.ratings];
    ratings.sort(compareRatings);

    return <div className="ratings">
        <div className="table-style">
            {ratings.map((rating, i) =>
                <Row
                    key={i}
                    label={rating.label}
                    rating={rating.rating} />
            )}
        </div>
    </div>
}

export default RatingsTable;
