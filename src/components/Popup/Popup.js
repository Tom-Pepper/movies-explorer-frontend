import React from "react";

import './Popup.css';

function Popup({ isOpened, onSubmit, title, onClose }) {
  return(
    <div className={`popup ${isOpened && "popup_is-opened"}`}>
      <div className="popup__container">
        <form
          className="popup__content"
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="popup__title">{title}</h2>
          <button
            type="button"
            onClick={onClose}
          />
        </form>
      </div>
    </div>
  );
}

export default Popup;
