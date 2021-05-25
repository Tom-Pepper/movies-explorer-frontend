/**
 * API для работы с сервисом beatfilm-movies
 */

import { BASE_URL, MOVIES_API_URL, MOVIES_IMAGE_URL } from "./constants";

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
};

/**
 * Получение списка фильмов с beatfilm API
 */
export const getMovies = () => {
  return fetch(`${MOVIES_API_URL}/`)
    .then((res) => getResponse(res));
};

/**
 * Добавить фильм в закладки
 * @param movie — фильм
 */
export const bookmarkMovie = (movie) => {
  const {
    movieId = movie.id,
    nameRU,
    nameEN,
    trailer = movie.trailerLink,
    country,
    director,
    duration,
    year,
    description,
  } = movie;

  const image = `${MOVIES_IMAGE_URL}${movie.image?.url}`;
  const thumbnail = `${MOVIES_API_URL}${movie.image?.formats.thumbnail.url}`;

  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      movieId,
      nameRU,
      nameEN,
      director,
      year,
      duration,
      description,
      trailer,
      country,
      image,
      thumbnail,
    }),
  })
    .then((res) => getResponse(res));
};

/**
 * Удаление фильма из сохраненных
 * @param movieId — id удаляемого фильма
 */
export const unBookMarkMovie = (movieId) => {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
    .then((res) => getResponse(res));
};

/**
 * Получение списка сохраненных в закладки фильмов
 * @returns {Promise<never>}
 */
export const getBookmarkedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
    .then((res) => getResponse(res));
};
