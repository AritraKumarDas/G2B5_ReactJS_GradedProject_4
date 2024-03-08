import { Card } from "react-bootstrap";
import { IMovieModel } from "../models/movies";
import { removeFromFavorites, addToFavorites } from "../services/utils";
import { toast } from 'react-toastify';
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';


// import { addRemoveFavoriteMovie } from '../services/utils'

type Props = {
    movie: IMovieModel,
    isFavorite: boolean,
    setFavoriteMovies: React.Dispatch<React.SetStateAction<IMovieModel[]>>
}

const MovieItem = (props: Props) => {

    const location = useLocation()

    const { id, title, posterurl } = props.movie;
    const { isFavorite, setFavoriteMovies } = props;

    const addRemoveFavoriteMovieHandler = (movie: IMovieModel, isFavorite: boolean) => {

        if (isFavorite) {
            removeFromFavorites(movie);
            setFavoriteMovies((prev) => prev.filter(item => item.id !== movie.id))
            toast.success('Item removed from Favourites list', {
                position: "top-right",
                autoClose: 3000, // Set the auto-close duration in milliseconds
            });
        } else {
            addToFavorites(movie);
            setFavoriteMovies((prev) => [...prev, movie])
            toast.success('Item added to Favourites list', {
                position: "top-right",
                autoClose: 3000, // Set the auto-close duration in milliseconds
            });
        }
    }



    const newPath = location.pathname === '/' ? `/movies-in-theaters/${id}` : `${location.pathname}/${id}`
    console.log("pathname => ", newPath)

    const btnStyle = isFavorite ? 'fav-btn' : ''

    return (


        <Card style={{ width: '18rem', height: '18rem' }} key={id} className="card d-flex flex-column justify-content-stretch">

            <Card.Link as={Link} to={newPath} style={{ height: '12rem' }}>
                <Card.Img variant="top" src={posterurl} style={{ height: '100%' }} />
            </Card.Link>

            <Card.Body style={{ height: '6rem' }} className="card-body">
                <Card.Title className="fs-6">{title}</Card.Title>

                <button className={`card-btn ${btnStyle}`}
                    onClick={() => addRemoveFavoriteMovieHandler(props.movie, isFavorite)}
                >
                    {isFavorite ? <span>Remove from Favorites <FontAwesomeIcon icon={faSolidHeart} /> </span> : <span>Add to favorites <FontAwesomeIcon icon={faRegularHeart} /> </span>}
                </button>
            </Card.Body>
        </Card>


    )
}

export default MovieItem;