import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './constants.js';

// Обьект передаваемый в класс валидации.
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible',
};

/** POPUP VRIABLES */
const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('.popup__form_type_add-card-form');
const formEditProfile = document.querySelector('.popup__form');
const cardDescriptionNew = popupAddCard.querySelector('.popup__field_value_description');
const cardLinkNew = popupAddCard.querySelector('.popup__field_value_link');
const cardCloseNew = popupAddCard.querySelector('.popup__close');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonCloseEditProfile = document.querySelector('.popup__close');
const userNameNew = popupEditProfile.querySelector('.popup__field_value_name');
const userProfessionNew = popupEditProfile.querySelector('.popup__field_value_profession');
const popupCardImage = document.querySelector('.popup_type_open-image');
const popupCardImageContent = popupCardImage.querySelector('.popup__image');
const popupCardTitle = popupCardImage.querySelector('.popup__image-subtitle');
const buttonClosePopupCardImage = popupCardImage.querySelector('.popup__close');

/** CARDS VARIABLES */
const cardsContainer = document.querySelector('.cards');

/** PROFILE VARIABLES */
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

/** VALIDATION VARIABLES */
const validators = {};

function editProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = userNameNew.value;
  profileProfession.textContent = userProfessionNew.value;
  closePopup(popupEditProfile);
}

/** CARDS */
function createCard(data, template) {
  return new Card(data, template).generateCard();
}

function cardsInitialization() {
  initialCards.forEach((item) => {
    const card = createCard(item, 'cards__card');
    cardsContainer.append(card);
  });
}

function submitNewCard(newCardLink, newCardDescription, templateSelector, evt) {
  evt.preventDefault();

  const card = createCard({ name: newCardDescription.value, link: newCardLink.value }, templateSelector);
  cardsContainer.prepend(card);

  formAddCard.reset();
  validators.validatorFormAddImage.buttonStateControl();
  closePopup(popupAddCard);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

function initializationFormValidation() {
  // Отказ от создания классов валидаторов в цикле в пользу именованых классов что бы иметь возможность вызвать buttonStateControl
  // для конкретной кнопки отправки формы
  validators.validatorFormAddImage = new FormValidator(config, formAddCard);
  validators.validatorFormAddImage.enableValidation();
  validators.validatorFormEditProfile = new FormValidator(config, formEditProfile);
  validators.validatorFormEditProfile.enableValidation();
}

/** ВЫЗОВЫ */
cardsInitialization();
initializationFormValidation();

/** LISTENERS */
document.addEventListener('click', closePopupByClick);

/** PROFILE */
profileEditButton.addEventListener('click', function () {
  userNameNew.value = profileName.textContent;
  userProfessionNew.value = profileProfession.textContent;
  openPopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', editProfileSubmit);

buttonCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));

/** CARD */
formAddCard.addEventListener('submit', function (evt) {
  submitNewCard(cardLinkNew, cardDescriptionNew, 'cards__card', evt);
});

buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));

cardCloseNew.addEventListener('click', () => closePopup(popupAddCard));

/** IMAGE */
buttonClosePopupCardImage.addEventListener('click', () => closePopup(popupCardImage));

export { openPopup, popupCardImage, popupCardTitle, popupCardImageContent };
