import axios from "axios"
import { IMovieModel } from "../models/movies";

const baseURL = process.env.REACT_APP_API_BASE_URL;


const fetchAllMovies = async (keyParam: string) => {
    // const response = await import('../data.json');
    const response = await axios.get(`${baseURL}/${keyParam}`);
    console.log(response)
    const allMoviesData: IMovieModel[] = response.data


    return allMoviesData;

}


const getFavoriteMovies = async () => {

    const response = await fetchAllMovies('favourite');
    return response;
}





const removeFromFavorites = async (movie: IMovieModel) => {

    const response = await axios.delete(`${baseURL}/favourite/${movie.id}`)

}

const addToFavorites = async (movie: IMovieModel) => {

    const response = await axios.post(`${baseURL}/favourite`, movie, {
        headers: {
            "Content-Type": 'Application/json'
        }
    })

}

const getMovieDetailsById = async (movieType: string, id: string) => {

    const response = await axios.get(`${baseURL}/${movieType}/${id}`);
    return response.data;
}

export { fetchAllMovies, getFavoriteMovies, removeFromFavorites, addToFavorites, getMovieDetailsById }