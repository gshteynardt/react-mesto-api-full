import React from 'react';
import Popup from './Popup';
import unsuccess from '../images/info_no.svg';
import success from '../images/info_yes.svg';

const InfoTooltip = ({ isSuccess, isOpen, onClose }) => {
  const imgUnsuccess = <img src={unsuccess} alt="Успешно"/>;
  const imgSuccess = <img src={success} alt="Неудача"/>;

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      name={'info'}
    >
      {isSuccess ? imgSuccess : imgUnsuccess}
      <h2 className="popup__title popup__title_theme_info">
        {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
      </h2>
    </Popup>
  );
};

export default InfoTooltip;
