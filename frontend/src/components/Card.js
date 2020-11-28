import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = ({
  card, onCardClick, onCardLike, onPopupDeleteCard, onPopupImg,
}) => {

  const {
    link, name, likes, owner,
  } = card;

  // определяем владельца карточки
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = owner === currentUser._id;
  // создаем className для кнопки удаления
  const cardDeleteButtonClassName = (
    `button ${isOwn ? 'elements__delete-button_visible' : 'elements__delete-button_hidden'}`
  );

  // проверяем лайк, поставленный текущим пользователем
  const isLiked = likes.some((i) => i === currentUser._id);
  // создаем className для кнопки like
  const cardLikeButtonClassName = isLiked ? 'button button__like button__like_active' : 'button button__like';

  const handleCardClick = () => {
    onPopupImg();
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onPopupDeleteCard();
    onCardClick(card);
  };

  return <>
    <li className="elements__item">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
        <svg width="18" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.458 18.142c.06.67.61 1.158 1.28 1.158H14.26c.67 0 1.22-.508 1.28-1.158L16.72 5.79H1.28l1.178 12.352zM16.72 1.93h-5.14v-.65C11.58.569 11.011 0 10.3 0H7.72C7.01 0 6.44.569 6.44 1.28v.65H1.28C.569 1.93 0 2.499 0 3.21c0 .711.569 1.28 1.28 1.28h15.44c.711 0 1.28-.569 1.28-1.28 0-.711-.569-1.28-1.28-1.28z"
            fill="#fff"/>
        </svg>
      </button>
      <img src={link} alt={name} onClick={handleCardClick} className="elements__img" />
      <div className="elements__wrap">
        <h2 className="elements__title">{name}</h2>
        <div className="elements__container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
          <h3 className="elements__likes">{likes.length}</h3>
        </div>
      </div>
    </li>
  </>;
};

export default Card;
