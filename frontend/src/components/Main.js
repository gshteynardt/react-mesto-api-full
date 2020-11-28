import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { InitialCards } from '../contexts/initialCards';

const Main = ({
  onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onPopupDeleteCard, onPopupImg,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const cards = React.useContext(InitialCards);

  const { avatar, about, name } = currentUser;

  return (
    <>
      <main className="page__content">
        <section className="profile page__profile">
          <div className="profile__info">
            <div className="profile__wrap">
              <img src={avatar} alt="фотография пользователя" className="profile__avatar"/>
              <button type="button" className="button button_edit-avatar" onClick={onEditAvatar}>
                <svg width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26 3.454L6.77 22.794 3.336 19.29 22.517 0 26 3.454zM0 26l5.102-1.53-3.581-3.453L0 26z"
                        fill="#fff"/>
                </svg>
              </button>
            </div>
            <div className="profile__container">
              <h2 className="profile__name">{name}</h2>
              <p className="profile__job">{about}</p>
              <button type="button" className="button button_edit" onClick={onEditProfile}></button>
            </div>
          </div>
          <button type="button" className="button button_add" onClick={onAddPlace}></button>
        </section>
        <section className="elements">
          <ul className="elements__items">
            {
              cards.map((card) => <Card
                  card={card}
                  key={card._id}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onPopupDeleteCard={onPopupDeleteCard}
                  onPopupImg={onPopupImg}
                  />)
            }
          </ul>
        </section>
      </main>

    </>
  );
};

export default Main;
