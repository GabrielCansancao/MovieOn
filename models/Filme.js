module.exports = class Filme {
    popularity;
    vote_count;
    video;
    poster_path;
    id;
    adult;
    backdrop_path;
    original_language;
    original_title;
    genre_ids;
    title;
    vote_average;
    overview;
    release_date;
    constructor(data) {
        Object.assign(this, data);
    }
}