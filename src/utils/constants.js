export const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: '29666a6f-1d5a-4d3a-91e9-5a126f6d6591',
    'Content-Type': 'application/json'
  },
}


export const validatorsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible',
};
export const validators = {};

// ФОРМЫ
export const formAddCard = document.querySelector('.popup__form_type_add-card-form');
export const formEditProfile = document.querySelector('.popup__form');
export const formChangeAvatar = document.querySelector('.popup_type_change-avatar');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupCardImage = document.querySelector('.popup_type_open-image');

// ПОЛЯ И ЭЛЕМЕНТЫ
export const userNameNew = popupEditProfile.querySelector('.popup__field_value_name');
export const userProfessionNew = popupEditProfile.querySelector('.popup__field_value_profession');
export const popupCardImageContent = popupCardImage.querySelector('.popup__image');
export const popupCardTitle = popupCardImage.querySelector('.popup__image-subtitle');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');
export const cardsContainer = document.querySelector('.cards');
export const avatar = document.querySelector('.profile__image');

// КНОПКИ
export const buttonAddCard = document.querySelector('.profile__add-button');
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonSubmitChangeUserData = popupEditProfile.querySelector('.popup__submit-button');
export const buttonSubmitChangeUserAvatar = formChangeAvatar.querySelector('.popup__submit-button');
export const buttonSubmitNewCard = formAddCard.querySelector('.popup__submit-button');

