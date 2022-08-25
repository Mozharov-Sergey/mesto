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
const addCardButton = document.querySelector('.profile__add-button');
const addCardForm = document.querySelector('.popup__form_type_add-card-form');
const newCardDescription = popupAddCard.querySelector('.popup__field_value_description');
const newCardLink = popupAddCard.querySelector('.popup__field_value_link');
const newCardClose = popupAddCard.querySelector('.popup__close');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editProfileCloseButton = document.querySelector('.popup__close');
const editProfileForm = document.querySelector('.popup__form');
const newUserName = popupEditProfile.querySelector('.popup__field_value_name');
const newUserProfession = popupEditProfile.querySelector('.popup__field_value_profession');
const popupCardImage = document.querySelector('.popup_type_open-image');
const popupCardImageContent = popupCardImage.querySelector('.popup__image');
const popupCardTitle = popupCardImage.querySelector('.popup__image-subtitle');
const popupCardImageClose = popupCardImage.querySelector('.popup__close');

/** CARDS VARIABLES */
const cardsContainer = document.querySelector('.cards');

/** PROFILE VARIABLES */
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

function editProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = newUserName.value;
  profileProfession.textContent = newUserProfession.value;
  closePopup(popupEditProfile);
}

/** CARDS */
function cardsInitialization() {
  initialCards.forEach((item) => {
    const card = new Card(item, 'cards__card').generateCard(); // generateCard возвращает разметку карточки

    // При создании карточки сразу навешиваем слушатель открытия попапа.
    setPreviewCardListener(card);
    cardsContainer.append(card);
  });
}

// Т.к наполнение попапа карточки происходит как при инициализации, так и при добавлении новых карточек,
// Руководствуясь приципом DRY решил вынести создание слушателя открытия попапа превью карточки в отдельную функцию
function setPreviewCardListener(card) {
  card.querySelector('.cards__card-image').addEventListener('click', () => {
    popupCardImageContent.src = card.querySelector('.cards__card-image').src;
    popupCardImageContent.alt = card.querySelector('.cards__card-title').textContent;
    popupCardTitle.textContent = card.querySelector('.cards__card-title').textContent;
    openPopup(popupCardImage);
  });
}

function submitNewCard(newCardLink, newCardDescription, templateSelector, evt) {
  evt.preventDefault();

  const card = new Card(
    { name: newCardDescription.value, link: newCardLink.value },
    templateSelector
  ).generateCard();
  setPreviewCardListener(card);
  cardsContainer.prepend(card);

  addCardForm.reset();
  const submitButton = addCardForm.querySelector(config.submitButtonSelector);
  buttonStateDisabled(submitButton); // Нарушение принципа DRY. Аналогичная функция есть в FormValidator.js.
  //Возможно стоит ее сделать статической, или передать ее в конструктор классаа, но такого в ТЗ нет.
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

function buttonStateDisabled(button) {
  button.setAttribute('disabled', 'disabled');
  button.classList.add(config.inactiveButtonClass);
}

function initializationFormValidation() {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    validator.enableValidation();
  });
}

/** ВЫЗОВЫ */
cardsInitialization();
initializationFormValidation();

/** LISTENERS */
document.addEventListener('click', closePopupByClick);

/** PROFILE */
profileEditButton.addEventListener('click', function () {
  newUserName.value = profileName.textContent;
  newUserProfession.value = profileProfession.textContent;
  openPopup(popupEditProfile);
});

editProfileForm.addEventListener('submit', editProfileSubmit);

editProfileCloseButton.addEventListener('click', () => closePopup(popupEditProfile));

/** CARD */
addCardForm.addEventListener('submit', function (evt) {
  submitNewCard(newCardLink, newCardDescription, 'cards__card', evt);
});

addCardButton.addEventListener('click', () => openPopup(popupAddCard));

newCardClose.addEventListener('click', () => closePopup(popupAddCard));

/** IMAGE */
popupCardImageClose.addEventListener('click', () => closePopup(popupCardImage));
