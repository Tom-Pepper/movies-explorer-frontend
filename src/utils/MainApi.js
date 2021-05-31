/**
 * Основное API, внутреннее для работы с movies-explorer-api
 */

// const BASE_URL = 'https://api.pepperjs.nomoredomains.club';
const BASE_URL = 'http://localhost:3000';

/**
 * Регистрация пользователя
 * @param name
 * @param password
 * @param email
 * @returns {Promise<any>}
 */
export function register (name, password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": name,
      "password": password,
      "email": email
    })
  })
    .then((res) => res.json())
}

/**
 * Авторизация пользователя
 * @param password
 * @param email
 * @returns {Promise<any>}
 */
export function authorize (password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
    .then((response => response.json()))
    .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
      }
      return data;
    })
}

/**
 * Получение данных пользователя
 * @param token
 * @returns {Promise<any>}
 */
export function getUserData(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    // .then(data => data)
}

/**
 * Редактирование данных пользователя
 * @param token
 * @param name
 * @param email
 * @returns {Promise<any>}
 */
export function editUserData(token, name, email) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
    .then(res => res.json())
    .then(data => data)
}

/**
 * Получение объекта с сохраненными фильмами
 * @param token
 * @returns {Promise<any>}
 */
export function getSavedMovies(token) {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => data)
}

/**
 * Добавление фильма в закладки
 * @param token
 * @param movie
 * @returns {Promise<any>}
 */
export function saveMovie(token, movie) {

  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailer: movie.trailer,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId
    })
  })
    .then(res => res.json())
    .then(data => data)
}

/**
 * Удаление фильма из закладок
 * @param token
 * @param movieId
 * @returns {Promise<any>}
 */
export function deleteMovie(token, movieId) {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => data)
}
