import React from 'react';

import './Register.css';
import logo from "../../images/logo.svg";
import {NavLink} from "react-router-dom";
import Form from "../Form/Form";
import Input from "../Input/Input";

function Register({
                    onRegister,
                    handleOnChange,
                    values,
                    isLoading,
                    errors,
                    isValid,
                    submitError,
                  }) {

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values);
  }

  /**
   * Обработка статуса ошибок для передачи ошибки в валидацию
   */
  const errorStatus = (status) => {
    if(status === '400') {
      return "При регистрации что-то пошло не так..."
    }
    if(status === '409') {
      return "Пользователь с таким email уже существует"
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
    <div className="register">
      <NavLink to="/"><img src={logo} alt="Логотип Movie Explorer" className="header__logo register__header"/></NavLink>
      <h2 className="register__title">Добро пожаловать!</h2>
      <Form
        buttonText={isLoading? 'Загружаем...' : 'Зарегистрироваться'}
        text="Уже зарегистрированы?"
        url="/signin"
        linkText="Войти"
        onSubmit={handleSubmit}
        isValid={isValid}
        errorMsg={errorMsg}
        isLoading={isLoading}
      >
        <Input
          id="user-name"
          type="text"
          name="username"
          inputTitle="Имя"
          minLength="2"
          maxLength="30"
          errorText={errors.username}
          value={values.username || ''}
          onChange={handleOnChange}
          isValid={isValid}
        />
        <Input
          id="user-email"
          type="email"
          name="email"
          inputTitle="E-mail"
          minLength="7"
          maxLength="200"
          errorText={errors.email}
          value={values.email || ''}
          onChange={handleOnChange}
          isValid={isValid}
        />
        <Input
          id="user-password"
          type="password"
          name="password"
          inputTitle="Пароль"
          minLength="8"
          maxLength="200"
          errorText={errors.password}
          value={values.password || ''}
          onChange={handleOnChange}
          isValid={isValid}
        />
      </Form>
    </div>
  );
}

export default Register;
