import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  profileName,
  profileProfession,
  validators,
  validatorsConfig,
  buttonAddCard,
  buttonEditProfile,
  formAddCard,
  formEditProfile,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

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
  validators.validatorFormAddImage = new FormValidator(validatorsConfig, formAddCard);
  validators.validatorFormAddImage.enableValidation();
  validators.validatorFormEditProfile = new FormValidator(validatorsConfig, formEditProfile);
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
