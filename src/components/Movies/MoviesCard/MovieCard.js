import React, {useEffect, useState} from 'react';

import './MoviesCard.css';
import movieMock from '../../../images/movies-thumbnails/banksy.png'
import {useLocation} from "react-router-dom";

function MovieCard(props) {

  const MOVIES_IMG_URL = 'https://api.nomoreparties.co';

  const [isSaved, setIsSaved] = useState(false);

  const movie = {
    country : props.movie.country || 'Не указано',
    director: props.movie.director || 'Не указан',
    duration: props.movie.duration || 0,
    year: props.movie.year || 'Не указан',
    description: props.movie.description || 'Не указано',
    image: `${props.movie.image === null ? `${movieMock}` : `${MOVIES_IMG_URL}${props.movie.image?.url}`}`,
    trailer: props.movie?.trailerLink,
    nameRU: props.movie.nameRU || 'Не указано',
    nameEN: props.movie.nameEN || 'Не указано',
    thumbnail: `${props.movie.image === null ? `${movieMock}` : `${MOVIES_IMG_URL}${props.movie.image?.formats?.thumbnail?.url}`}`,
    movieId: props.movie.id,
  }

  const duration = (minutes) => `${Math.floor(minutes / 60) % 24}ч ${minutes % 60}м`;
  const imageMock = `${props.movie.image === null ? `${movieMock}` : `${MOVIES_IMG_URL}${props.movie.image?.url}`}`;
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  const currentMovie = savedMovies.find((movie) => movie.nameRU === props.movie.nameRU);

  const location = useLocation();

  function handleLikeButtonClick() {
    props.onMovieSave(movie);
    setIsSaved(true);
  }

  function handleDisLike() {
    setIsSaved(false);
    console.log(currentMovie)
    props.onDeleteMovie(currentMovie._id);
  }

  function handleDeleteMovie() {
    props.onDeleteMovie(props.movie._id);
    setIsSaved(false);
  }

  useEffect(() => {
    if (currentMovie) {
      setIsSaved(true);
    }
  }, [currentMovie, location])

  return(
    <article className="movie-card">
      <figure className="movie-card__content">

        <figcaption className="movie-card__info">
          <h3 className="movie-card__title">{props.movie.nameRU}</h3>
          <p className="movie-card__duration">{duration(props.movie.duration)}</p>
        </figcaption>

        <a
          href={props.saved ? props.movie.trailer : props.movie.trailerLink}
          className="movie-card__link"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={props.saved ? props.movie.image : imageMock}
            className="movie-card__image"
            alt={`Постер к фильму: ${props.movie.nameRU}`}/>
        </a>

        {props.saved ?
          <button
            onClick={handleDeleteMovie}
          />
          :
          <button
            onClick={isSaved ? handleDisLike : handleLikeButtonClick}
          >
            Сохранить
          </button>
        }

        {/*<button className={`movie-card__button*/}
        {/*        ${isSaved && "movie-card__button_type_in-bookmark"}*/}
        {/*        ${props.isBookmarkPage && "movie-card__button_type_remove-bookmark"}`}*/}
        {/*        onClick={props.saved ? handleDisLike : handleLikeButtonClick}>*/}
        {/*  {isSaved || props.isBookmarkPage ? '' : 'Сохранить'}*/}
        {/*</button>*/}

      </figure>
    </article>
  );
}

export default MovieCard;
