import ratings_json from './ratings.json';
import { LString } from '../LocalizedText';
import { check } from './Labels';

export interface RatingData {
    prog_lang: RatingTable,
}

export interface RatingTable {
    heading: LString,
    ratings: RatingRow[],
}

export interface RatingRow {
    label: LString,
    rating: number,
}

const parseRow = (json: any): RatingRow => {
    return {
        label: check(json.label),
        rating: Number(check(json.rating, 0)),
    };
};

const parseRatingTable = (json: any): RatingTable => {
    const json_rows = check(json.ratings, []);
    return {
        heading: check(json.heading) as LString,
        ratings: json_rows.map(parseRow),
    };
}

export const loadRatingData = (): RatingData => {
    return {
        prog_lang: parseRatingTable(ratings_json.prog_lang),
    }
}
