import { Row, Col, Alert } from "react-bootstrap";
import { IMovieModel } from "../models/movies";
import MovieItem from "./MovieItem";


type Props = {
    movies: IMovieModel[],
    favoriteMovies: IMovieModel[],
    setFavoriteMovies: React.Dispatch<React.SetStateAction<IMovieModel[]>>
}

const MoviesLister = (props: Props) => {

    const { movies, favoriteMovies, setFavoriteMovies } = props;

    return (


        <>

            {movies.map((movie) => {

                const isFavorite = favoriteMovies.some((m) => m.id === movie.id);

                return (
                    <Col key={movie.id} className="d-flex align-items-stretch my-3">
                        <MovieItem movie={movie} isFavorite={isFavorite} setFavoriteMovies={setFavoriteMovies} />
                    </Col>

                )
            })
            }
        </>

    )
}

export default MoviesLister;