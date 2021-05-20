import React, {useContext, useEffect, useState} from 'react';

import './Profile.css';
import Header from "../Header/Header";
import {checkAuth} from "../../utils/MainApi";

function Profile({ menuIsOpened, openMenu, closeMenu, loggedIn, logoutHandler }) {

  const token = localStorage.getItem('jwt');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    checkAuth(token)
      .then((res) => setUser(res));
  }, [])

  function handleEditProfile(e) {
    e.preventDefault();
    setIsEditing(true);
  }
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
      <form method="post" className="profile__form" name="profile-form" noValidate>
        <div className="profile__field-wrapper">
          <label className="profile__label">Имя
          </label>
          <input type="text" className="profile__input" required disabled={!isEditing} name="profile-name-input"
                 placeholder="Введите новое имя" minLength="2" maxLength="30"/>
        </div>
        <div className="profile__field-wrapper">
          <label className="profile__label">Email
          </label>
          <input type="text" className="profile__input" required disabled={!isEditing} name="profile-email-input"
                 placeholder="Введите новый email" minLength="7" maxLength="200"/>
        </div>
        <div className="profile__form-actions">
          {!isEditing ? (
            <div className="profile__form-actions-wrapper">
              <button className="profile__action-button profile__action-button_action_edit" onClick={handleEditProfile}>
                Редактировать</button>
              <button className="profile__action-button profile__action-button_action_logout" onClick={logoutHandler}>
                Выйти из аккаунта</button>
            </div>
          ) : (
            <div className="profile__form-actions-wrapper">
              <button className="profile__action-button profile__action-button_action_save">
                Сохранить</button>
            </div>
          )}
        </div>
      </form>

    </div>
  );
}

export default Profile;
