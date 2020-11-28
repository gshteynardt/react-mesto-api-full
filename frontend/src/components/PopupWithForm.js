import React from 'react';

function PopupWithForm({
  name, title, children, onSubmit, textSubmitBtn,
}) {
  return (
      <form
        className={`popup__content popup__content_theme_${name}`}
        noValidate
        onSubmit={onSubmit}
      >
        <h2 className="popup__title popup__title_theme_profile">{title}</h2>
        <div className="popup__fields">
          {children}
          <button type="submit" className="button button_submit">
            {textSubmitBtn}
          </button>
        </div>
      </form>
  );
}

export default PopupWithForm;
