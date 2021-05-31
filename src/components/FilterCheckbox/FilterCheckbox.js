import React from 'react';

import './FilterCheckbox.css';

function FilterCheckbox(props) {
  return(
    <div className="checkbox__wrapper">
      <label className="checkbox">
        <input
          type="checkbox"
          name="short-movie-checkbox"
          className="checkbox__input"
          onChange={props.onChange}
          checked={props.isChecked}
        />
        <span className="checkbox__switcher"/>
      </label>
      <p className="checkbox__title">{props.checkboxName}</p>
    </div>
  );
}

export default FilterCheckbox;
