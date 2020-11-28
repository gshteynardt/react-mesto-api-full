import React, { useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { TextForSubmitBtn } from '../contexts/TextForSubmitBtn';
import Popup from './Popup';

export const PopupDeleteCard = ({
  card, isOpen, onClose, onCardDelete,
}) => {
  const textForSubmitBtn = useContext(TextForSubmitBtn);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    onCardDelete(card);
  };

  return (
    <Popup
      name="card-delete popup__title_theme_card-delete"
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopupWithForm
        title="Вы уверены?"
        onSubmit={handleDeleteClick}
        textSubmitBtn={textForSubmitBtn.confirm}
      >
        <label className="popup__field">
          <span className="popup__error"></span>
        </label>
      </PopupWithForm>
    </Popup>
  );
};
