import React, {useContext, useState} from 'react';

import './Profile.css';
import Header from "../Header/Header";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Popup from "../Popup/Popup";

function Profile({
                   values,
                   onSubmit,
                   submitError,
                   loggedIn,
                   menuIsOpened,
                   openMenu,
                   closeMenu,
                   isValid,
                   handleOnChange,
                   errors,
                   onLogout,
                   isLoading,
                 }) {
  const user = useContext(CurrentUserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [popupIsOpened, setPopupIsOpened] = useState(false);

  function handleEditProfile(evt) {
    evt.preventDefault();
    setIsEditing(true);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values, setIsEditing, setPopupIsOpened);
  }

  function closePopup() {
    setPopupIsOpened(false);
  }

  /**
   * Обработка статуса ошибок для передачи ошибки в валидацию
   */
  const errorStatus = (status) => {
    if(status === '400') {
      return "При изменении данных что-то пошло не так..."
    }
    if(status === '500') {
      return "Произошла ошибка на сервере"
    }
    if(status === '404') {
      return "Страница не найдена"
    }
  }

  const errorMsg = errorStatus(submitError);

  return(
    <div className="profile">

      <Header
        loggedIn={loggedIn}
        isProfilePageActive={true}
        menuIsOpened={menuIsOpened}
        openMenu={openMenu}
        closeMenu={closeMenu}
      />

      <h2 className="register__title account__title">Привет, {user.name}!</h2>
      <form
        onSubmit={handleSubmit}
        className="profile__form"
        name="profile-form"
        autoComplete="off"
      >
        <div className="profile__field-wrapper">
          <label className="profile__label">Имя
          </label>
          <input
            type="text"
            className={`profile__input ${!isValid && "input__field_state_error"}`}
            disabled={!isEditing}
            name="name"
            placeholder={user.name || "Введите новое имя"}
            onChange={handleOnChange}
            value={values.name || ''}
            minLength="2"
            maxLength="30"
            required
          />
        </div>
        <span className={`input__error ${!isValid && "input__error_visible"}`}>{errors.name}</span>
        <div className="profile__field-wrapper">
          <label className="profile__label">Email
          </label>
          <input
            type="text"
            className={`profile__input ${!isValid && "input__field_state_error"}`}
            disabled={!isEditing}
            name="email"
            placeholder={user.email || "Введите новый email"}
            onChange={handleOnChange}
            value={values.email || ''}
            minLength="7"
            maxLength="200"
            required
          />
        </div>
        <span className={`input__error ${!isValid && "input__error_visible"}`}>{errors.email}</span>
        <div className="profile__form-actions">
          {!isEditing ? (
            <div className="profile__form-actions-wrapper">
              <button
                type="button"
                className="profile__action-button profile__action-button_action_edit"
                onClick={handleEditProfile}
              >Редактировать</button>
              <button
                type="button"
                className="profile__action-button profile__action-button_action_logout"
                onClick={onLogout}
              >Выйти из аккаунта</button>
            </div>
          ) : (
            <div className="profile__form-actions-wrapper">
              <button
                className="profile__action-button profile__action-button_action_save"
                type="submit"
                disabled={!isValid}
              >{isLoading ? 'Сохранение...' : 'Сохранить'}</button>
            </div>
          )}
        </div>
      </form>

      {/*<Popup*/}
      {/*  isOpened={popupIsOpened}*/}
      {/*  onClose={closePopup}*/}
      {/*  title="Выйти из учетной записи?"*/}
      {/*/>*/}

    </div>
  );
}

export default Profile;
