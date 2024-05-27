export default class Movie{
    constructor({id,title,poster_path,backdrop_path,genres,overview,popularity,relase_date,vote_average,vote_count,}){
        this.id=id;
        this.title=title;
        this.poster_path=poster_path;
        this.backdrop_path=backdrop_path;
        this.genres=genres;
        this.overview=overview;
        this.popularity=popularity;
        this.relase_date=relase_date;
        this.vote_average=vote_average;
        this.vote_count=vote_count;
    }
}
