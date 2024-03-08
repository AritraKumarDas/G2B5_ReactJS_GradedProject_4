import { Row, Container, Col, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { getMovieDetailsById } from "../services/utils";
import { useEffect, useState } from "react";
import { IMovieModel } from "../models/movies";
import { faAngleLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadingStatus } from "../models/types";
import LoadSpinner from "../commons/LoadSpinner";
import AlertPage from "../commons/AlertPage";


const MovieDetails = () => {

    const { movieType, id } = useParams<string>()

    const [movie, setMovie] = useState<IMovieModel>()

    const [showModal, setShowModal] = useState<boolean>(false)

    const [status, setStatus] = useState<loadingStatus>(loadingStatus.loading);
    const [error, setError] = useState<Error | null>(null)





    useEffect(() => {

        const helper = async () => {

            try {
                const response = await getMovieDetailsById(movieType as string, id as string)
                setMovie(response);
                setStatus(loadingStatus.loaded)
            } catch (e) {
                setStatus(loadingStatus.loaded)
                setError(e as Error)
            }

        }

        helper();

    }, [id, movieType])

    const toggleShow = () => {
        setShowModal(prev => !prev)
    }

    if (status === loadingStatus.loading) {
        return (
            <Container>
                <Row>
                    <LoadSpinner />
                </Row>
            </Container>
        )
    }

    else if (status === loadingStatus.error) {
        return (
            <Container>
                <Row>
                    <Col>
                        <AlertPage variant="danger" text="Error encountered while fetching. ">
                            {error?.message}
                        </AlertPage>
                    </Col>
                </Row>
            </Container>
        )
    }

    else if (status === loadingStatus.loaded && movie) {

        const { title, year, imdbRating, contentRating, averageRating, duration, genres, actors, releaseDate, storyline, poster, posterurl } = movie;

        const dtOfRelease = new Date(releaseDate);
        console.log("Month=> ", dtOfRelease.getMonth())
        const releaseYear = dtOfRelease.getFullYear();
        const releaseMonth = ((dtOfRelease.getMonth() + 1) + "").padStart(2, "0");

        const releaseDay = (dtOfRelease.getDate() + "").padStart(2, "0");

        return (
            <>
                <Modal show={showModal} onHide={toggleShow}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <img
                            // src={`${process.env.REACT_APP_API_BASE_URL}/img/${poster}`}
                            src={posterurl}
                            alt={title}
                            className="w-100"
                        />
                    </Modal.Body>
                </Modal>

                <Container>
                    <Row >
                        <Col className="py-3">
                            <Link to="/" >
                                <FontAwesomeIcon icon={faAngleLeft} /> Back to Home
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8} md={4} lg={2}>
                            <div className="img-container">
                                <img src={posterurl} alt={title} className="d-block" style={{ 'width': '100%' }} />
                                <div className="img-overlay" onClick={toggleShow}>
                                    <button className="preview-btn"><FontAwesomeIcon icon={faEye} /> <span>Preview</span></button>
                                </div>
                            </div>
                        </Col>
                        <Col xs={12} md={8} lg={10}>
                            <Row>
                                <Col>
                                    <h2>{`${title} (${year})`}</h2>
                                </Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={3} md={4} lg={2}>Imdb Rating</Col>
                                <Col>{imdbRating}</Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={3} md={4} lg={2}>Content Rating</Col>
                                <Col>{contentRating}</Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={3} md={4} lg={2}>Average Rating</Col>
                                <Col>{averageRating}</Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={3} md={4} lg={2}>Duration</Col>
                                <Col>{duration}</Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={3} md={4} lg={2}>Genres</Col>
                                <Col>{genres.join(", ")}</Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={3} md={4} lg={2}>Actors</Col>
                                <Col>{actors.join(", ")}</Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={3} md={4} lg={2}>Release date</Col>
                                <Col>{`${releaseYear}-${releaseMonth}-${releaseDay}`}</Col>
                            </Row>
                            <Row className="pb-1">
                                <Col xs={3} md={4} lg={2}>Story line</Col>
                                <Col>{storyline}</Col>
                            </Row>

                        </Col>
                    </Row>

                </Container>
            </>
        )
    }
    else {
        return (
            <Container>
                <Row>
                    <Col>
                        <AlertPage variant="info" text="Movie Details not found"></AlertPage>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default MovieDetails;