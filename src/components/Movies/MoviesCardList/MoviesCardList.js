import React from 'react';

import './MoviesCardList.css';
import MovieCard from "../MoviesCard/MovieCard";

import image_1 from '../../../images/movies-thumbnails/banksy.png';
import image_2 from '../../../images/movies-thumbnails/banksy-2.png';
import image_3 from '../../../images/movies-thumbnails/banksy-3.png';
import image_4 from '../../../images/movies-thumbnails/banksy-4.png';
import image_5 from '../../../images/movies-thumbnails/banksy-5.png';
import image_6 from '../../../images/movies-thumbnails/banksy-6.png';
import image_7 from '../../../images/movies-thumbnails/banksy-7.png';
import image_8 from '../../../images/movies-thumbnails/banksy-8.png';
import image_9 from '../../../images/movies-thumbnails/banksy-9.png';


function MoviesCardList() {
  return(
    <section className="movies-card-list">
      <div className="movies-card-list__movies-wrapper">
        <MovieCard
          movieImage={image_1}
          isInBookmark={true}
        />
        <MovieCard movieImage={image_2}/>
        <MovieCard movieImage={image_3}/>
        <MovieCard movieImage={image_4}/>
        <MovieCard movieImage={image_5}/>
        <MovieCard movieImage={image_6}/>
        <MovieCard movieImage={image_7}/>
        <MovieCard movieImage={image_8}/>
        <MovieCard movieImage={image_9}/>
      </div>
      <button className="movies-card-list__lazy-load-button">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
