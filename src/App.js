import React from "react";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";

import "./css/App.css";
import SearchIcon from "./images/search.svg";

// 25df9e2

//Use the following if get errors from api URL:
//const API_URL = "http://www.omdbapi.com?apikey=25df9e2";

const API_URL = "https://www.omdbapi.com?apikey=25df9e2";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [firstVisit, setFirstVisit] = useState(true);

  const searchMovies = async (title) => {
    //Be carefull with the API_URL and fetch content syntax.
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
    setFirstVisit(false);
  };

  const welcome = () => {
    return (
      <>
        {firstVisit ? (
          <h2>Welcome to MovieBrowser</h2>
        ) : (
          <h2>Movies not found</h2>
        )}
      </>
    );
  };

  useEffect(() => {
    //Example to start with a compilation of "Spiderman" in home page
    // searchMovies("Spiderman");
  }, []);

  return (
    <div className="app">
      <h1>MovieBrowser</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {/* Do a iteration in all movies array and render a <MovieCard /> for each element in the array*/}
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">{welcome()}</div>
      )}
    </div>
  );
};

export default App;
