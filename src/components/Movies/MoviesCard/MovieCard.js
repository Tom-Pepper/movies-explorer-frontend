import React, {useEffect, useState} from 'react';

import './MoviesCard.css';

import {MOVIES_IMAGE_URL} from "../../../utils/constants";

function MovieCard(props) {

  const [isInBookmark, setIsInBookmark] = useState(false);
  const savedMoviesInStore = JSON.parse(localStorage.getItem('savedMovies'));

  const durationFloor = (min) => {
    return `${Math.floor(min / 60) % 24}ч ${min % 60}м`;
  }

  const handleAddBookmark = () => {
    props.onSaveMovie(props.movie, isInBookmark, setIsInBookmark);
  };

  const handleDeleteBookmark = () => {
    props.onDeleteMovie(props.savedMovie);
  }

  return(
    <article className="movie-card">
      <figure className="movie-card__content">
        <figcaption className="movie-card__info">
          <h3 className="movie-card__title">{props.movie ? props.movie.nameRU : props.savedMovie.nameRU}</h3>
          <p className="movie-card__duration">{props.movie ? durationFloor(props.movie.duration) : durationFloor(props.savedMovie.duration)}</p>
        </figcaption>
        <a
          href={props.movie ? `${props.movie.trailerLink}` : `${props.savedMovie.trailer}`}
          className="movie-card__link"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={props.movie ? `${MOVIES_IMAGE_URL}${props.movie.image?.url}` : `${props.savedMovie.image}`}
            className="movie-card__image"
            alt={props.movie ? `Постер к фильму: ${props.movie.title}` : `Постер к фильму: ${props.savedMovie.title}`}/>
        </a>
        {
          !props.isBookmarkPage ?
            <button className={`movie-card__button ${isInBookmark && "movie-card__button_type_in-bookmark"}`}
                    onClick={handleAddBookmark}
            >
              {isInBookmark || props.isBookmarkPage ? '' : 'Сохранить'}
            </button>
            :
            <button className={`movie-card__button ${props.isBookmarkPage && "movie-card__button_type_remove-bookmark"}`}
                    onClick={handleDeleteBookmark}
            >
              {isInBookmark || props.isBookmarkPage ? '' : 'Сохранить'}
            </button>
        }
      </figure>
    </article>
  );
}

export default MovieCard;
