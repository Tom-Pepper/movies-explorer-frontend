import React, { useState, useEffect } from 'react';
import {Redirect, Route, Switch, useHistory, useLocation} from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { register, editUserData, getUserData, saveMovie, deleteMovie, getSavedMovies, authorize } from '../../utils/MainApi';
import { getMovies, BASE_URL } from '../../utils/MovieApi';

function App() {
  // Хуки, стейты
  const [menuIsOpened, setMenuIsOpened] = useState(false);

  const [editProfileMessage, setEditProfileMessage] = React.useState('');
  const [registerErrorMessage, setRegisterErrorMessage] = React.useState('');
  const [loginErrorMessage, setLoginErrorMessage] = React.useState('');
  const [isUpdateSuccess, setIsUpdateSuccess] = React.useState(true);
  const [token, setToken] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const [isMoviesErrorActive, setIsMoviesErrorActive] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [isShortMoviesChecked, setIsShortMoviesChecked] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [isSaving, setIsSaving] = React.useState(false);

  const isLoggedIn = localStorage.getItem('loggedIn');

  const history = useHistory();
  const location = useLocation();

  /**
   * Проверка токена и установка текущего пользователя
   */
  function checkUserData(token) {
    getUserData(token)
      .then((res) => {
        if (res) {
          localStorage.setItem('loggedIn', 'true');
          setCurrentUser(res);
        }
      })
      .catch((err) => console.log(`Произошла ошибка в функции checkUserData: ${err}`));
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkUserData(token);
    }
  }, []);

  /**
   * Обработка чекбокса короткометражек. Изменение стейта на чек
   */
  function handleShortMoviesCheck(evt) {
    setIsShortMoviesChecked(evt.target.checked);
  }

  /**
   * Очистка ошибок
   */
  function clearAllErrorMessages() {
    setRegisterErrorMessage('');
    setLoginErrorMessage('');
    setEditProfileMessage('');
  }

  //======================== Регистрация, авторизация, изменение данных пользователя ==============//
  /**
   * Регистрация
   */
  function handleRegister(name, password, email) {
    setIsSaving(true);
    register(name, password, email)
      .then((res) => {
        if(res.user) {
          setRegisterErrorMessage('')
          handleLogin(password, email);
        } else if(res.error === 'Bad Request') {
          setRegisterErrorMessage('Введены невалидные данные');
        } else if(res.message) {
          setRegisterErrorMessage(res.message);
        }
      })
      .catch(() => {
        setRegisterErrorMessage('Что-то пошло не так...');
      })
      .finally(() => {
        setIsSaving(false);
      })
  }

  /**
   * Авторизация
   */
  function handleLogin(password, email) {
    setIsSaving(true);

    authorize(password, email)
      .then((data) => {
        if(data.token) {
          getUserData(data.token)
            .then((data) => setCurrentUser(data))
            .catch((err) => console.log(`Произошла ошибка: ${err}`))
          localStorage.setItem('loggedIn', 'true');
          setLoginErrorMessage('');
          history.push('/movies');
        } else if(data.error === 'Bad Request') {
          setLoginErrorMessage('Введены невалидные данные');
        } else if(data.message) {
          setLoginErrorMessage(data.message);
        }
      })
      .catch(() => {
        setLoginErrorMessage('Что-то пошло не так...');

      })
      .finally(() => {
        setIsSaving(false);
      })
  }

  /**
   * Редактирование данных пользователя
   * @param name
   * @param email
   * @param setIsEditing — стейт из Profile.js, отвечает за возможность редактирования формы
   */
  function handleEditUserInfo(name, email, setIsEditing) {
    setIsSaving(true);
    editUserData(token, name, email)
      .then((newUser) => {
        if(newUser._id) {
          setCurrentUser(newUser);
          setIsUpdateSuccess(true);
          setEditProfileMessage('Профиль обновлен успешно!');
        } else if(newUser.message){
          setEditProfileMessage(newUser.message);
          setIsUpdateSuccess(false);
        }
        return
      })
      .catch(() => {
        setEditProfileMessage('При обновлении профиля произошла ошибка');
        setIsUpdateSuccess(false);
      })
      .finally(() => {
        setIsSaving(false);
        setIsEditing(false);
      })
  }

  /**
   * Выход из учетной записи
   */
  function handleSignOut() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    setMovies([]);
    setAllMovies([]);
    history.push('/');
  }

  //================ Поиск, добавление и удаление фильмов ======================================//

  /**
   * Обработчик для поиска фильмов
   * @param movies
   * @param keyWord
   * @returns {*[]}
   */
  function handleSearchMovies(movies, keyWord) {
    let filteredMovies = [];

    movies.forEach((movie) => {
      if(movie.nameRU.indexOf(keyWord) > -1) {

        if(isShortMoviesChecked) {

          if(movie.duration <= 40) {
            return filteredMovies.push(movie);
          }
          return
        }
        return filteredMovies.push(movie);
      }
    })
    return filteredMovies;
  }

  /**
   * Поиск по сохраненным фильмам
   */
  function searchSavedMovies(keyWord) {
    const allSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const searchSavedResult = handleSearchMovies(allSavedMovies, keyWord);
    setSavedMovies(searchSavedResult);
  }

  /**
   * Поиск по фильмам
   * @param keyWord — запрос в поисковой строке
   */
  function searchMovies(keyWord) {
    setIsSearching(true);
    setMovies([]);
    setNotFound(false);
    setIsMoviesErrorActive(false);

    if(allMovies.length === 0) {
      getMovies()
        .then((movies) => {
          setAllMovies(movies)
          const searchResult = handleSearchMovies(movies, keyWord);

          if(searchResult.length === 0) {
            setNotFound(true);
            setMovies([]);

          } else {
            localStorage.setItem('movies', JSON.stringify(searchResult))
            setMovies(JSON.parse(localStorage.getItem('movies')));
          }
        })
        .catch(() => {
          setIsMoviesErrorActive(true);
          setMovies([]);
        })
        .finally(() => {
          setIsSearching(false);
          setIsShortMoviesChecked(false);
        })
    } else {
      const searchResult = handleSearchMovies(allMovies, keyWord);

      if (searchResult.length === 0) {
        setNotFound(true);
        setMovies([]);
        setIsSearching(false);
        setIsShortMoviesChecked(false);

      } else if (searchResult.length !== 0) {
        localStorage.setItem('movies', JSON.stringify(searchResult));
        setMovies(JSON.parse(localStorage.getItem('movies')));
        setIsSearching(false);
        setIsShortMoviesChecked(false);

      } else {
        setIsMoviesErrorActive(true);
        setMovies([]);
        setIsShortMoviesChecked(false);
      }
    }
  }

  /**
   * Добавление фильма в избранное
   * @param movie
   */
  function handleSaveMovie(movie) {
    saveMovie(token, movie)
      .then((savedMovie) => {
        const films = [...savedMovies, savedMovie];
        console.log(films)
        localStorage.setItem('savedMovies', JSON.stringify(films));
        setSavedMovies(prevState => ([...prevState, savedMovie]));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
  }

  /**
   * Удаление из избранного
   * @param movieId
   */
  function handleDeleteMovie(movieId) {

    deleteMovie(token, movieId)
      .then(() => {
        const newSavedMovies = savedMovies.filter((deletedMovie) => {return deletedMovie._id !== movieId})
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}, попробуйте еще раз`);
      })
  }

  //============================= Эффекты и провверки ================================================//

  /**
   * Проверка токена
   */
  useEffect(() => {

    function checkToken() {
      if(localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        const searchedMovies = JSON.parse(localStorage.getItem('movies'));

        if(token) {
          Promise.all([getUserData(token), getSavedMovies(token)])
            .then(([userData, movies]) => {
              setCurrentUser(userData);
              setToken(localStorage.getItem('token'));
              const films = [...savedMovies, movies];
              localStorage.setItem('savedMovies', JSON.stringify(films));
              setSavedMovies(prevState => ([...prevState, movies]));
              setMovies(searchedMovies);
              localStorage.setItem('loggedIn', 'true');
            })
            .catch((err) => {
                console.log(`Ошибка ${err}, попробуйте еще раз`);
              }
            )
        }
      }
    }
    checkToken();

  }, [history, isLoggedIn])

  useEffect(() => {
    const token = localStorage.getItem('token');
    setEditProfileMessage('');

    getSavedMovies(token)
      .then((res) => {
        setSavedMovies(res);
      })
  }, [location]);

  //============================= Обработчики меню ================================================//
  /**
   * Функция открытия бургер-меню
   */
  function handleOpenMenu() {
    setMenuIsOpened(true);
    window.addEventListener('click', handleClosePopupWithOverlayClick);
  }

  /**
   * Функция закрытия бургер-меню
   */
  function handleCloseMenu() {
    setMenuIsOpened(false);
    window.removeEventListener('click', handleClosePopupWithOverlayClick);
  }

  /**
   * Функция закрытия бургер-меню по клику на оверлей
   * @param evt — событие, где отслеживается клик
   */
  function handleClosePopupWithOverlayClick(evt) {
    if (evt.target.classList.contains('navigation__wrapper')) {
      handleCloseMenu();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Switch>

          <Route exact path="/">
            <Main
              loggedIn={isLoggedIn}
              menuIsOpened={menuIsOpened}
              openMenu={handleOpenMenu}
              closeMenu={handleCloseMenu}
            />
          </Route>

          <Route exact path="/signin">
            {isLoggedIn
              ? <Redirect to="/" />
              : <Login
                  onLogin={handleLogin}
                  errorMessage={loginErrorMessage}
                  onClear={clearAllErrorMessages}
                  isSaving={isSaving}
                />
            }
          </Route>

          <Route exact path="/signup">
            {isLoggedIn
              ? <Redirect to="/" />
              : <Register
                  onRegister={handleRegister}
                  errorMessage={registerErrorMessage}
                  onClear={clearAllErrorMessages}
                  isSaving={isSaving}
                />
            }
          </Route>

          <ProtectedRoute
            exact path="/movies"
            component={Movies}
            loggedIn={isLoggedIn}
            menuIsOpened={menuIsOpened}
            openMenu={handleOpenMenu}
            closeMenu={handleCloseMenu}
            movies={movies}
            onSearchMovies={searchMovies}
            isSearching={isSearching}
            notFound={notFound}
            isErrorActive={isMoviesErrorActive}
            onMovieSave={handleSaveMovie}
            onDeleteMovie={handleDeleteMovie}
            savedMovies={savedMovies}
            onShortMoviesCheck={handleShortMoviesCheck}
            isShortMovieChecked={isShortMoviesChecked}
          />

          <Route exact path="/saved-movies">
            <SavedMovies
              loggedIn={isLoggedIn}
              menuIsOpened={menuIsOpened}
              openMenu={handleOpenMenu}
              closeMenu={handleCloseMenu}
            />
          </Route>

          <ProtectedRoute
            exact path="/profile"
            component={Profile}
            loggedIn={isLoggedIn}
            menuIsOpened={menuIsOpened}
            openMenu={handleOpenMenu}
            closeMenu={handleCloseMenu}
            onLogout={handleSignOut}
            onChangeUser={handleEditUserInfo}
            message={editProfileMessage}
            isUpdateSuccess={isUpdateSuccess}
            isSaving={isSaving}
          />

          <Route path="*">
            <NotFoundPage />
          </Route>

        </Switch>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
