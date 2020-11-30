import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import { EditProfilePopup } from '../components/EditProfilePopup';
import { EditAvatarPopup } from '../components/EditAvatarPopup';
import { PopupDeleteCard } from '../components/PopupDeleteCard';
import AddPlacePopup from '../components/AddPlacePopup';
import ImagePopup from '../components/ImagePopup';
import api from '../utils/api.js';
import { transformCard } from '../utils/transformCard';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { InitialCards } from '../contexts/initialCards';
import { TextForSubmitBtn, textForSubmitBtn } from '../contexts/TextForSubmitBtn';
import { token } from '../utils/token';

const MainPage = ({ userData }) => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isImgPopupOpen, setIsImgPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleDeleteCardClick = () => {
    setIsDeleteCardPopupOpen(!isDeleteCardPopupOpen);
  };

  const handleImgCardClick = () => {
    setIsImgPopupOpen(!isImgPopupOpen);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsImgPopupOpen(false);
    setSelectedCard(null);
  };

  const signOut = () => {
    token.remove('mesto');
    history.push('./signin');
  };

  useEffect(() => {
    setIsLoading(true);
    api.getAppInfo()
      .then((data) => {
        const [initialCards, currentUserData] = data;
        setCurrentUser(currentUserData);
        const items = initialCards.map((card) => transformCard(card));
        setCards(items);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  // обновляем данные пользователя
  const handleUpdateUser = (data) => {
    api.editUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  // обновляем автар
  const handleUpdateAvatar = (avatar) => {
    api.changeUserPicture(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  // функция лайков и дизлайков
  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  };

  // обработчик добавления новых карточек
  const handleAddPlaceSubmit = (newCard) => {
    api.createCard(newCard)
      .then((newCard) => {
        const newItem = transformCard(newCard);
        setCards([...cards, newItem]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  // обработчик удаления карточек
  const handleCardDelete = (card) => {
    console.log(card)
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  return (
    <InitialCards.Provider value={cards}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header>
            <div>
              <span className="mail">{userData.email}</span>
              <button
                className="button link link_theme_header"
                onClick={signOut}
              >Выйти</button>
            </div>
          </Header>
          {isLoading
            ? <Preloader />
            : <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onPopupDeleteCard={handleDeleteCardClick}
              onPopupImg={handleImgCardClick}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
            />}
          <Footer />

          <TextForSubmitBtn.Provider value={textForSubmitBtn}>
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <PopupDeleteCard
              isOpen={isDeleteCardPopupOpen}
              onClose={closeAllPopups}
              card={selectedCard}
              onCardDelete={handleCardDelete}
            />

            <ImagePopup
              isOpen={isImgPopupOpen}
              onClose={closeAllPopups}
              card={selectedCard}
            />
          </TextForSubmitBtn.Provider>
        </div>
      </CurrentUserContext.Provider>
    </InitialCards.Provider>
  );
};

export default MainPage;
