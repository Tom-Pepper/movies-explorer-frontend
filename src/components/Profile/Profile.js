import React, {useContext, useState} from 'react';

import './Profile.css';
import Header from "../Header/Header";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Profile(props) {
  const user = useContext(CurrentUserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [popupIsOpened, setPopupIsOpened] = useState(false);

  function handleEditProfile(evt) {
    evt.preventDefault();
    setIsEditing(true);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onSubmit(props.values, setIsEditing, setPopupIsOpened);
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

  const errorMsg = errorStatus(props.submitError);

  return(
    <div className="profile">

      <Header
        loggedIn={props.loggedIn}
        isProfilePageActive={true}
        menuIsOpened={props.menuIsOpened}
        openMenu={props.openMenu}
        closeMenu={props.closeMenu}
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
            className={`profile__input ${!props.isValid && "input__field_state_error"}`}
            disabled={!isEditing}
            name="name"
            placeholder={user.name || "Введите новое имя"}
            onChange={props.handleOnChange}
            value={props.values.name || ''}
            minLength="2"
            maxLength="30"
            required
          />
        </div>
        <span className={`input__error ${!props.isValid && "input__error_visible"}`}>{props.errors.name}</span>
        <div className="profile__field-wrapper">
          <label className="profile__label">Email
          </label>
          <input
            type="text"
            className={`profile__input ${!props.isValid && "input__field_state_error"}`}
            disabled={!isEditing}
            name="email"
            placeholder={user.email || "Введите новый email"}
            onChange={props.handleOnChange}
            value={props.values.email || ''}
            minLength="7"
            maxLength="200"
            required
          />
        </div>
        <span className={`input__error ${!props.isValid && "input__error_visible"}`}>{props.errors.email}</span>
        <span className={`input__error ${!props.isValid && "input__error_visible"}`}>Одно из полей не заполнено или
          заполнено не корректно</span>
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
                onClick={props.onLogout}
              >Выйти из аккаунта</button>
            </div>
          ) : (
            <div className="profile__form-actions-wrapper">
              <button
                className="profile__action-button profile__action-button_action_save"
                type="submit"
                disabled={!props.isValid}
              >{props.isLoading ? 'Сохранение...' : 'Сохранить'}</button>
            </div>
          )}
        </div>
      </form>

    </div>
  );
}

export default Profile;
