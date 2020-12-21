import LocalizedText, { LString } from "./LocalizedText"
import Rating from "./Rating"

interface Props {

}

interface RowProps {
    label: LString,
    rating: number,
}

const Row = (props: RowProps) => {
    return <div className="row">
        <div className="cell">
            <LocalizedText text={props.label} />
        </div>
        <div className="cell">
            <Rating score={props.rating} />
        </div>
    </div>
}

const Ratings = (props: Props) => {
    return <div>
        <div className="table">
            <Row label="Windows 10" rating={0} />
            <Row label="Mac OS" rating={3} />
            <Row label="Arch Linux" rating={5} />
            <Row label="Error" rating={31337} />
        </div>
    </div>
}

export default Ratings;
