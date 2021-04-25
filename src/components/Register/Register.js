import React from 'react';

import './Register.css';
import logo from "../../images/logo.svg";
import {NavLink} from "react-router-dom";
import Form from "../Form/Form";
import Input from "../Input/Input";

function Register() {
  return(
    <div className="register">
      <NavLink to="/"><img src={logo} alt="Логотип Movie Explorer" className="header__logo register__header"/></NavLink>
      <h2 className="register__title">Добро пожаловать!</h2>
      <Form
        buttonText="Зарегистрироваться"
        text="Уже зарегистрированы?"
        url="/signin"
        linkText="Войти"
      >
        <Input
          id="user-name"
          type="text"
          name="name"
          inputTitle="Имя"
          minLength="2"
          maxLength="20"
          errorText="Что-то пошло не так..."
        />
        <Input
          id="user-email"
          type="email"
          name="email"
          inputTitle="E-mail"
          minLength="7"
          maxLength="200"
          errorText="Что-то пошло не так..."
        />
        <Input
          id="user-password"
          type="password"
          name="password"
          inputTitle="Пароль"
          minLength="8"
          maxLength="200"
          errorText="Что-то пошло не так..."
        />
      </Form>
    </div>
  );
}

export default Register;
