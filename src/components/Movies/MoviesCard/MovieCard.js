import React, {useState} from 'react';

import './MoviesCard.css';

function MovieCard({ movieImage, isBookmarkPage }) {

  const [isInBookmark, setIsInBookmark] = useState(false);

  function handleAddBookmark() {
    setIsInBookmark(!isInBookmark);
  }

  return(
    <article className="movie-card">
      <figure className="movie-card__content">
        <figcaption className="movie-card__info">
          <h3 className="movie-card__title">В погоне за Бэнкси</h3>
          <p className="movie-card__duration">27 минут</p>
        </figcaption>
        <img src={movieImage} className="movie-card__image" alt="В погоне за Бэнкси"/>
        <button className={`movie-card__button
                ${isInBookmark && "movie-card__button_type_in-bookmark"}
                ${isBookmarkPage && "movie-card__button_type_remove-bookmark"}`}
                onClick={handleAddBookmark}>
          {isInBookmark || isBookmarkPage ? '' : 'Сохранить'}
        </button>
      </figure>
    </article>
  );
}

export default MovieCard;
