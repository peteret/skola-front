export interface Film {
    id: number;
    title: string;
    year: number;
    url: string;
    type: string;
    colorRating: string;
    poster: string;
    origins: string[];
    creators: {
        directors: {
            id: number;
            name: string;
            url: string;
        }[];
        actors: {
            id: number;
            name: string;
            url: string;
        }[];
    }
}