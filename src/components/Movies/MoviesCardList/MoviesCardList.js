import React, {useEffect, useState} from 'react';

import './MoviesCardList.css';
import MovieCard from "../MoviesCard/MovieCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {

  const deviceWidth = window.innerWidth;
  const [cardsNumber, setCardsNumber] = useState(() => {

    if (deviceWidth < 717) {
      return 5;
    } else if (deviceWidth < 1000) {
      return 8;
    } else if (deviceWidth < 1279 || deviceWidth > 1279) {
      return 12;
    }
  });

  const [moreCards, setMoreCards] = useState(() => {
    if (deviceWidth < 717) {
      return 2;
    } else if (deviceWidth < 1000) {
      return 2;
    } else if (deviceWidth < 1279) {
      return 3;
    } else if (deviceWidth > 1279) {
      return 3;
    }
  });

  function handleScreenWidth() {
    if (deviceWidth < 720) {
      setCardsNumber(5);
    } else if (deviceWidth < 920) {
      setCardsNumber(8);
    } else if (deviceWidth < 1279 || deviceWidth > 1279) {
      setCardsNumber(12);
    }
  }

  function handleMoviesIncrease() {
    setCardsNumber(prev => prev + moreCards);
  }

  function filterShortMovies(movie) {
    return movie.filter((item) => item.duration <= 40);
  }

  useEffect(() => {
    window.addEventListener('resize', handleScreenWidth);
  }, []);

  return(
    <section className="movies-card-list">
      {props.isSearching && <Preloader />}
      <span className={`input__error ${props.isErrorActive && "input__error_visible"}`}>Произошла ошибка во время запроса на сервер</span>
      <span className={`input__error ${props.notFound && "input__error_visible"}`}>Ничего не найдено</span>
      <span className={`input__error ${(props.saved && props.movies.length === 0) && "input__error_visible"}`}>Ничего не добавлено в избранное</span>

      <div className="movies-card-list__movies-wrapper">

        {props.movies &&
        (props.isShortMovieChecked ? filterShortMovies(props.movies) : props.movies)
          .slice(0, cardsNumber)
          .map((movie) => {
          return(
            <MovieCard
              movie={movie}
              key={props.saved ? movie.movieId : movie.id}
              saved={props.saved}
              onMovieSave={props.onMovieSave}
              onDeleteMovie={props.onDeleteMovie}
              savedMovies={props.savedMovies}
            />
          );
        })}

      </div>
      {
        props.isBookmarkPage ?
          (
            <div className="saved-movies__footer-gap" />
          ) : (
            props.movies.length > cardsNumber &&
            <button
              className="movies-card-list__lazy-load-button"
              onClick={handleMoviesIncrease}
            >
              Ещё
            </button>
          )
      }
    </section>
  );
}

export default MoviesCardList;
