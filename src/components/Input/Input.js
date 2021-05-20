import React from 'react';

import './Input.css';

function Input({ type, id, inputTitle, name, minLength, maxLength, errorText, value, onChange, isValid }) {
  return(
    <div className="input">
      <label className="input__label">{inputTitle}</label>
      <input
        required
        className={`input__field ${!isValid && `input__field_state_error`}`}
        type={type}
        id={id}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />
      <span className={`input__error ${!isValid && "input__error_visible"}`}>{errorText}</span>
    </div>
  );
}

export default Input;
