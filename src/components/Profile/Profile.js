import React, {useContext, useEffect, useState} from 'react';

import './Profile.css';
import Header from "../Header/Header";
import {useFormWithValidation} from "../../utils/formValidator";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

function Profile(props) {

  const [isEditing, setIsEditing] = useState(false);
  const { values, errors, setValues, isFormValid, handleChange } = useFormWithValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues])


  function handleEditProfile(evt) {
    evt.preventDefault();
    setIsEditing(true);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onChangeUser(values.name, values.email, setIsEditing);
  }

  function handleCancelEdit() {
    setIsEditing(false);
  }

  return(
    <div className="profile">

      <Header
        loggedIn={props.loggedIn}
        isProfilePageActive={true}
        menuIsOpened={props.menuIsOpened}
        openMenu={props.openMenu}
        closeMenu={props.closeMenu}
      />

      <h2 className="register__title account__title">Привет, {currentUser.name}!</h2>
      <form
        className="profile__form"
        name="profile-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="profile__field-wrapper">
          <label className="profile__label">Имя
          </label>
          <input
            type="text"
            className="profile__input"
            name="name"
            placeholder="Введите новое имя"
            minLength="2"
            maxLength="30"
            value={values.name || ""}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>
        <span className={`input__error ${!isFormValid && "input__error_visible"}`}>{errors.name}</span>
        <div className="profile__field-wrapper">
          <label className="profile__label">Email
          </label>
          <input
            type="text"
            className="profile__input"
            name="email"
            placeholder="Введите новый email"
            minLength="7"
            maxLength="200"
            value={values.email || ""}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>
        <span className={`input__error ${!isFormValid && "input__error_visible"}`}>{errors.email}</span>
        <div className="profile__form-actions">
          {!isEditing ? (
            <div className="profile__form-actions-wrapper">
              <button
                className="profile__action-button profile__action-button_action_edit"
                onClick={handleEditProfile}
              >
                Редактировать
              </button>

              <button
                type="button"
                className="profile__action-button profile__action-button_action_logout"
                onClick={props.onLogout}
              >
                Выйти из аккаунта
              </button>
            </div>
          ) : (
            <div className="profile__form-actions-wrapper">
              <button
                type="submit"
                className="profile__action-button profile__action-button_action_save"
                disabled={!isFormValid}
              >
                {props.isSaving ? "Сохраняем..." : "Сохранить"}
              </button>

              <button
                type="button"
                className="profile__action-button profile__action-button_action_cancel"
                onClick={handleCancelEdit}
              >
                Отмена
              </button>
            </div>
          )}
        </div>
      </form>

    </div>
  );
}

export default Profile;
