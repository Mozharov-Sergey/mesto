import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './constants.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';

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
export const userNameNew = popupEditProfile.querySelector('.popup__field_value_name');
export const userProfessionNew = popupEditProfile.querySelector('.popup__field_value_profession');
const popupCardImage = document.querySelector('.popup_type_open-image');
const popupCardImageContent = popupCardImage.querySelector('.popup__image');
const popupCardTitle = popupCardImage.querySelector('.popup__image-subtitle');
const buttonClosePopupCardImage = popupCardImage.querySelector('.popup__close');

/** CARDS VARIABLES */
const cardsContainer = document.querySelector('.cards');

/** PROFILE VARIABLES */
const profileEditButton = document.querySelector('.profile__edit-button');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');

/** VALIDATION VARIABLES */
export const validators = {};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item, container) => {
      const card = new Card(item, 'cards__card').generateCard();
      container.append(card);
    },
  },
  '.cards'
);

const popupEditProfileObject = new PopupWithForm('.popup_type_edit-profile', (evt, inputValues) => {
  evt.preventDefault();
  const values = inputValues();
  profileName.textContent = values.profileName;
  profileProfession.textContent = values.profileFunction; // Profession, Function - нужно разобраться.
  popupEditProfileObject.close();
});

const popupAddImageObject = new PopupWithForm('.popup_type_add-card', (evt, inputValues)=> {
  evt.preventDefault();
  const values = inputValues();
  cardList.addItem({ name: values.newCardDescription, link:  values.newCardLink});
  validators.validatorFormAddImage.buttonStateControl();
  popupAddImageObject.close();
});

function cardsInitialization() {
  cardList.addItems();
}

// function editProfileSubmit(evt) {
//   evt.preventDefault();
//   profileName.textContent = userNameNew.value;
//   profileProfession.textContent = userProfessionNew.value;
//   closePopup(popupEditProfile);
// }

/** CARDS */

// function submitNewCard(newCardLink, newCardDescription, evt) {
//   evt.preventDefault();
//   cardList.addItem({ name: newCardDescription.value, link: newCardLink.value });
//   formAddCard.reset();
//   validators.validatorFormAddImage.buttonStateControl();
//   closePopup(popupAddCard);
// }

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

// function closePopupByEscape(evt) {
//   if (evt.key === 'Escape') {
//     const popup = document.querySelector('.popup_opened');
//     closePopup(popup);
//   }
// }

// function closePopupByClick(evt) {
//   if (evt.target.classList.contains('popup')) {
//     closePopup(evt.target);
//   }
// }

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
// document.addEventListener('click', closePopupByClick);

/** PROFILE */
profileEditButton.addEventListener('click', popupEditProfileObject.open);

// formEditProfile.addEventListener('submit', editProfileSubmit);

// buttonCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));

/** CARD */
// formAddCard.addEventListener('submit', function (evt) {
//   submitNewCard(cardLinkNew, cardDescriptionNew, evt);
// });

buttonAddCard.addEventListener('click', popupAddImageObject.open);

// cardCloseNew.addEventListener('click', () => closePopup(popupAddCard));

/** IMAGE */
// buttonClosePopupCardImage.addEventListener('click', () => closePopup(popupCardImage));

export { openPopup, popupCardImage, popupCardTitle, popupCardImageContent };
