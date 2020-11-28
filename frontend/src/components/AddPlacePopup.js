import React, { useContext, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import { TextForSubmitBtn } from '../contexts/TextForSubmitBtn';
import Popup from './Popup';

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {
  const nameRef = useRef();
  const linkRef = useRef();
  const textForSubmitBtn = useContext(TextForSubmitBtn);
  // обработчик события submit
  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  };

  return (
    <Popup
      name="elements"
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopupWithForm
        title="Новое место"
        onSubmit={handleSubmit}
        textSubmitBtn={textForSubmitBtn.save}
      >
        <label className="popup__field">
          <input
            ref={nameRef}
            type="text"
            className="popup__input popup__input_type_place"
            name="name"
            placeholder="Название"
            minLength="1"
            maxLength="30"
            required
          />
          <span className="popup__error"></span>
        </label>

        <label className="popup__field">
          <input
            ref={linkRef}
            type="url"
            className="popup__input popup__input_type_link"
            name="link"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__error"></span>
        </label>
      </PopupWithForm>
    </Popup>
  );
};

export default AddPlacePopup
