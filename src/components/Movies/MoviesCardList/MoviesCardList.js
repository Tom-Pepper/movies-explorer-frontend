import React, {useEffect, useState} from 'react';

import './MoviesCardList.css';
import MovieCard from "../MoviesCard/MovieCard";

import {
  FOR_FIVE_COLUMNS, FOR_MOBILE, FOR_THREE_AND_FOUR_COLUMNS, FOR_TWO_COLUMNS, FOR_TWO_COLUMNS_MOBILE,
  LAZY_LOAD_DESKTOP_FIVE_COLUMNS,
  LAZY_LOAD_DESKTOP_FOUR_COLUMNS, LAZY_LOAD_DESKTOP_THREE_COLUMNS, LAZY_LOAD_MOBILE,
  SHORT_MOVIE_DURATION
} from "../../../utils/constants";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {

  /**
   * Стейты для отображения кол-ва фильмов в зависимости от устройства, настройка лейзи-лоада
   */

  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(FOR_FIVE_COLUMNS);
  const [loadMore, setLoadMore] = useState(LAZY_LOAD_DESKTOP_FOUR_COLUMNS);
  const [screenSize, setScreenSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  function debounce(fn, ms) {
    let timer;
    return (_) => {
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }

  /**
   * Установка стейта в зависимости от текущего разрешения экрана
   */
  useEffect(() => {
    const debounceResizer = debounce(function handleResize() {
      setScreenSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener('resize', debounceResizer);

    return (_) => {
      window.removeEventListener('resize', debounceResizer);
    };
  });

  useEffect(() => {
    props.movies && setItems(props.movies);

    if (screenSize.width <= 717) {
      setVisible(FOR_MOBILE);
      setLoadMore(LAZY_LOAD_MOBILE);
    }

    if (screenSize.width > 717 && screenSize.width < 1280) {
      setVisible(FOR_TWO_COLUMNS);
      setLoadMore(LAZY_LOAD_MOBILE);
    }

    if (screenSize.width > 1280) {
      setVisible(FOR_THREE_AND_FOUR_COLUMNS);
      setLoadMore(LAZY_LOAD_DESKTOP_THREE_COLUMNS);
    }
  }, [props.movies, screenSize.width]);

  const loadMoreMovies = () => {
    setVisible((prev) => prev + loadMore);
  };

  /**
   * Фильтр фильмов по продолжительности (короткометражки)
   * @param movie — принимает фильм и сравнивает его продолжительность с константой
   * @returns {*}
   */
  function filterShortMovies(movie) {
    return movie.filter((item) => item.duration <= SHORT_MOVIE_DURATION)
  }

  return(
    <section className="movies-card-list">
      {props.isLoading && <Preloader />}
      {props.searchError !== '' && <span className="input__error input__error_visible">{props.searchError}</span>}
      {props.savedMovies?.length === 0 && (
        <span className="input__error input__error_visible">Вы не добавили в закладки ни одного фильма</span>
      )}
      <div className="movies-card-list__movies-wrapper">
        {props.movies &&
        (props.isShortMovie ? filterShortMovies(items) : items)
          .slice(0, visible)
          .map((data) => {
            return (
              <MovieCard
                isBookmarkPage={props.isInBookmark}
                key={data.id}
                movie={data}
                onSaveMovie={props.onSaveMovie}
              />
            );
          })
        }
        {props.savedMovies &&
        (props.isShortMovie ? filterShortMovies(props.savedMovies) : props.savedMovies)
          .map((data) => {
            return (
              <MovieCard
                isBookmarkPage={props.isInBookmark}
                key={data._id}
                savedMovie={data}
                onDeleteMovie={props.onDeleteMovie}
              />
            );
          })
        }
      </div>
      {
        props.isBookmarkPage ?
          (
            <div className="saved-movies__footer-gap" />
          ) : (
           props.movies && items.length > visible &&
            (<button
              className="movies-card-list__lazy-load-button"
              onClick={loadMoreMovies}
            >Ещё</button>)
          )
      }
    </section>
  );
}

export default MoviesCardList;
