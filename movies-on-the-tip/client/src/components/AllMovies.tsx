import { useEffect, useState } from "react";
import MoviesLister from "./MoviesLister";
import { IMovieModel } from "../models/movies";
import { fetchAllMovies, getFavoriteMovies } from "../services/utils";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { loadingStatus } from "../models/types";
import AlertPage from "../commons/AlertPage";
import LoadSpinner from "../commons/LoadSpinner";

type Props = {
    searchInput: string,
    clearSearchForm: () => void
}



const AllMovies = (props: Props) => {

    const [movies, setMovies] = useState<IMovieModel[]>([])

    const [favoriteMovies, setFavoriteMovies] = useState<IMovieModel[]>([])

    const [status, setStatus] = useState<loadingStatus>(loadingStatus.loading)
    const [error, setError] = useState<Error | null>(null)

    const { cat } = useParams();
    const { searchInput, clearSearchForm } = props;


    useEffect(() => {

        const helper = async () => {

            setStatus(loadingStatus.loading);
            setError(null);

            try {
                const resp = await getFavoriteMovies();
                setFavoriteMovies(resp)
                setStatus(loadingStatus.loaded)
            } catch (e) {
                setStatus(loadingStatus.error)
                setError(e as Error)

            }

        }


        helper();

    }, [])


    useEffect(() => {

        const helper = async () => {

            setStatus(loadingStatus.loading);
            setError(null);

            try {
                if (cat) {
                    const response = await fetchAllMovies(cat as string);
                    setMovies(response)
                    setStatus(loadingStatus.loaded);
                }
            } catch (e) {
                setStatus(loadingStatus.error);
                setError(e as Error)
            }
        }

        clearSearchForm();
        helper();

    }, [cat])

    useEffect(() => {
        if (cat === 'favourite') {
            setMovies(favoriteMovies)

        }
    }, [favoriteMovies])


    const filteredMovies: IMovieModel[] = movies.filter(movie => movie.title.toUpperCase().includes(searchInput.toUpperCase()))

    return (
        <Container>
            {status === loadingStatus.loading && (
                <Row>
                    <Col>
                        <LoadSpinner />
                    </Col>
                </Row>
            )}

            {status === loadingStatus.error && <AlertPage variant="danger" text="Error encountered while loading page">{error?.message}</AlertPage>}

            {status === loadingStatus.loaded && !error && filteredMovies.length === 0 && (
                <Row><Col><AlertPage variant="info" text="No items to display"></AlertPage></Col></Row>
            )}

            {status === loadingStatus.loaded && !error && filteredMovies.length > 0 && (
                <>


                    <Row><Col><h3 className="my-2">{cat === 'favourite' ? 'Favourites' : 'All Movies'}</h3></Col></Row>



                    <Row className="align-items-stretch" sm={2} md={3} lg={4} xl={5}>

                        <MoviesLister movies={filteredMovies} favoriteMovies={favoriteMovies} setFavoriteMovies={setFavoriteMovies} />

                    </Row>
                </>
            )}


        </Container>
    )
}

export default AllMovies;