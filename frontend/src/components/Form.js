import React from 'react';

const Form = ({
  title, submitText, children, onSubmit, link,
}) => (
    <div className={'form__container'}>
      <form
        className="form"
        noValidate
        onSubmit={onSubmit}
      >
        <h2 className="form__title">{title}</h2>
        <div className="popup__fields">
          { children }
        </div>
        <button
          type="submit"
          className="button button_submit form__submit"
        >
          { submitText }
        </button>
      </form>
      { link }
    </div>
);

export default Form;
