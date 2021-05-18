import React from 'react';

import './Register.css';
import logo from "../../images/logo.svg";
import {NavLink} from "react-router-dom";
import Form from "../Form/Form";
import Input from "../Input/Input";

function Register({
                    submitHandler,
                    regData,
                    isLoading,
                    handleOnChange,
                    error,
                    isValid,
                    submitError,
                  }) {

  const formHandler = (evt) => {
    evt.preventDefault();
    submitHandler(regData);
  }

  /**
   * Обработка статуса ошибок для передачи ошибки в валидацию
   */
  const errorStatus = (status) => {
    if(status === 400) {
      return "При регистрации что-то пошло не так..."
    }
    if(status === 409) {
      return "Пользователь с таким email уже существует"
    }
    if(status === 500) {
      return "Произошла ошибка на сервере"
    }
    if(status === 404) {
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
        submitHandler={formHandler}
        isLoading={isLoading}
        isValid={isValid}
        errorMsg={errorMsg}
      >
        <Input
          id="user-name"
          type="text"
          name="name"
          inputTitle="Имя"
          minLength="2"
          maxLength="30"
          errorText={error.name}
          regData={regData.name || ''}
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
          errorText={error.email}
          regData={regData.email}
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
          errorText={error.password}
          regData={regData.password}
          onChange={handleOnChange}
          isValid={isValid}
        />
      </Form>
    </div>
  );
}

export default Register;
