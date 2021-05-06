import React from 'react';

import './MoviesCard.css';

function MovieCard({ movieImage, isInBookmark }) {
  return(
    <article className="movie-card">
      <figure className="movie-card__content">
        <figcaption className="movie-card__info">
          <h3 className="movie-card__title">В погоне за Бэнкси</h3>
          <p className="movie-card__duration">27 минут</p>
        </figcaption>
        <img src={movieImage} className="movie-card__image" alt="В погоне за Бэнкси"/>
        <button className={`movie-card__button ${isInBookmark && "movie-card__button_type_in-bookmark"}`}>
          {isInBookmark ? '' : 'Сохранить'}
        </button>
      </figure>
    </article>
  );
}

export default MovieCard;
