import React, { ChangeEvent, useState } from 'react';

import './App.css';
import { Header } from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import AllMovies from './components/AllMovies';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import MovieDetails from './components/MovieDetails';
import PageNotFound from './commons/PageNotFound';


function App() {

  const [searchInput, setSearchInput] = useState<string>('');

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e?.target?.value)
    setSearchInput(e?.target?.value)
  }

  const clearSearchForm = () => {
    setSearchInput('')
  }


  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />
      <Header searchInput={searchInput} onChange={changeHandler} />

      <Routes>
        <Route path="/" element={<Home searchInput={searchInput} clearSearchForm={clearSearchForm} />}></Route>
        <Route path="/:cat" element={<AllMovies searchInput={searchInput} clearSearchForm={clearSearchForm} />}></Route>
        <Route path="/:movieType/:id" element={<MovieDetails />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>

      </Routes>
    </div>
  );
}

export default App;
