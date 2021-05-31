import React from 'react';

import './Form.css';
import {NavLink} from "react-router-dom";

function Form(props) {
  return(
    <form
      name={props.name}
      className="form"
      onSubmit={props.onSubmit}
      noValidate
    >

      { props.children }

      <span className={`input__error ${!props.isValid && "input__error_visible"}`}>{props.errorMsg}</span>
      <button
        type="submit"
        className={`form__button ${!props.disabled && 'form__button_disabled'}`}
      >
        {props.buttonText}
      </button>
      <div className="form__subText-wrapper">
        <p className="form__text">{props.text}</p>
        <NavLink to={props.url} className="form__link" onClick={props.onClear}>{props.linkText}</NavLink>
      </div>
    </form>
  );
}

export default Form;
