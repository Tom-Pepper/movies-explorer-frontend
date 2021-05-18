import React from 'react';

import './Form.css';
import {NavLink} from "react-router-dom";

function Form({ name, buttonText, linkText, url, text, children, submitHandler, isLoading, isValid, errorMsg }) {
  return(
    <form name={name} method="post" className="form" onSubmit={submitHandler} noValidate>
      { children }
      <button className={`form__button ${!isValid && 'form__button_disabled'}`} disabled={!isValid}>
        {buttonText}
      </button>
      <span className={`${!isValid && "input__error input__error_visible"}`}>{errorMsg}</span>
      <div className="form__subText-wrapper">
        <p className="form__text">{text}</p>
        <NavLink to={url} className="form__link">{linkText}</NavLink>
      </div>
    </form>
  );
}

export default Form;
