import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from '../components/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

/** VARIABLES */
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible',
};

const buttonAddCard = document.querySelector('.profile__add-button');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const formAddCard = document.querySelector('.popup__form_type_add-card-form');
const formEditProfile = document.querySelector('.popup__form');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const userNameNew = popupEditProfile.querySelector('.popup__field_value_name');
export const userProfessionNew = popupEditProfile.querySelector('.popup__field_value_profession');
export const popupCardImage = document.querySelector('.popup_type_open-image');
export const popupCardImageContent = popupCardImage.querySelector('.popup__image');
export const popupCardTitle = popupCardImage.querySelector('.popup__image-subtitle');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession');
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

/** ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ */
export const userInfo = new UserInfo({ name: 'Сергей Можаров', info: 'web-developer' });

/** ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
export const popupEditProfileObject = new PopupWithForm('.popup_type_edit-profile', (evt, inputValues) => {
  evt.preventDefault();
  const values = inputValues;
  userInfo.setUserInfo({ name: values.profileName, info: values.profileFunction });
  popupEditProfileObject.close();
});

/** ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ */
const popupAddImageObject = new PopupWithForm('.popup_type_add-card', (evt, inputValues) => {
  evt.preventDefault();
  const values = inputValues;
  cardList.addItem({ name: values.newCardDescription, link: values.newCardLink });
  validators.validatorFormAddImage.buttonStateControl();
  popupAddImageObject.close();
});

/** ФУНКЦИИ ИНИЦИАЛИЗАЦИИ */
function cardsInitialization() {
  cardList.addItems();
}

function initializationFormValidation() {
  // Отказ от создания классов валидаторов в цикле в пользу именованых классов что бы иметь возможность вызвать buttonStateControl
  // для конкретной кнопки отправки формы
  validators.validatorFormAddImage = new FormValidator(config, formAddCard);
  validators.validatorFormAddImage.enableValidation();
  validators.validatorFormEditProfile = new FormValidator(config, formEditProfile);
  validators.validatorFormEditProfile.enableValidation();
}

function initialSettingUserInfo() {
  const userData = userInfo.getUserInfo();
  profileName.textContent = userData.name;
  profileProfession.textContent = userData.info;
}

/** ВЫЗОВЫ ФУНКЦИЙ ИНИЦИАЛИЗАЦИИ */
cardsInitialization();
initializationFormValidation();
initialSettingUserInfo();

/** УСТАНОВКА СЛУШАТЕЛЕЙ */
buttonEditProfile.addEventListener('click', popupEditProfileObject.open);
buttonAddCard.addEventListener('click', popupAddImageObject.open);
