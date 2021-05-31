import React from 'react';

import './Input.css';

function Input(props) {
  return(
    <div className="input">
      <label className="input__label">{props.inputTitle}</label>
      <input
        required
        className={`input__field ${!props.isValid && "input__field_state_error"}`}
        type={props.type}
        name={props.name}
        minLength={props.minLength}
        maxLength={props.maxLength}
        value={props.value || ''}
        onChange={props.onChange}
      />
      <span className={`input__error ${!props.isValid && "input__error_visible"}`}>
        {props.errorText}
      </span>
    </div>
  );
}

export default Input;
