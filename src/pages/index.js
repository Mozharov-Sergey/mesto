import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  profileName,
  profileProfession,
  validators,
  validatorsConfig,
  buttonAddCard,
  buttonEditProfile,
  formAddCard,
  formEditProfile,
  apiOptions,
  avatar,
  formChangeAvatar
} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
let cardList = {}; 

const popupImagePreviewObject = new PopupWithImage('.popup_type_open-image');
export const userInfo = new UserInfo({ name: profileName, profession: profileProfession });
const apiController = new Api(apiOptions);

const cards = apiController.getInitialCards();
const userData = apiController.getUserData();


function userAvatarChange(link) {
  apiController.changeUserAvatar(link)
  .then((res) => {
    avatar.style.backgroundImage = `url('${res.avatar}')`;
  })
  .finally((res)=> {
    popupChangeAvatar.close();
  })  
}


/** ФУНКЦИИ ИНИЦИАЛИЗАЦИИ */
function cardsInitialization() {
  cards
.then((res) => {
  return cardList = new Section(
    {
      items: res,
      renderer: (item, container) => {
        const card = new Card(item, 'cards__card', () => {
          popupImagePreviewObject.open(item.link, item.name);
        }).generateCard();
        container.prepend(card);
      },
    },
    '.cards'
  );
})
.then((res) => res.addItems())
}
function initialSettingUserInfo() {
  userData.then((data) => {
    userInfo.setUserInfo({ name: data.name, info: data.about });
    avatar.style.backgroundImage = `url('${data.avatar}')`;
  });
}

function initializationFormValidation() {
  // Отказ от создания классов валидаторов в цикле в пользу именованых классов что бы иметь возможность вызвать buttonStateControl
  // для конкретной кнопки отправки формы
  validators.validatorFormAddImage = new FormValidator(validatorsConfig, formAddCard);
  validators.validatorFormAddImage.enableValidation();
  validators.validatorFormEditProfile = new FormValidator(validatorsConfig, formEditProfile);
  validators.validatorFormEditProfile.enableValidation();
  validators.validatorFormChangeAvatar = new FormValidator(validatorsConfig, formChangeAvatar);
  validators.validatorFormChangeAvatar.enableValidation();
}



/** ВЫЗОВЫ ФУНКЦИЙ ИНИЦИАЛИЗАЦИИ */
cardsInitialization();
initializationFormValidation();
initialSettingUserInfo();

/** РЕДАКТИРОВАНИЕ ПРОФИЛЯ */
export const popupEditProfileObject = new PopupWithForm(
  '.popup_type_edit-profile',
  validators.validatorFormEditProfile,

  (evt, inputValues) => {
    evt.preventDefault();
    const values = inputValues;
    apiController.changeUserData(values.profileName, values.profileFunction)
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, info: res.about });
    })
    .finally((res)=> {
      popupEditProfileObject.close();
    })    
  }
);

export const popupChangeAvatar = new PopupWithForm(
  '.popup_type_change-avatar',
  validators.validatorFormChangeAvatar,
  (evt, inputValues) => {
    evt.preventDefault();
    const values = inputValues;
    userAvatarChange(values.avatar);
  }
  
)

/** ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ */
const popupAddImageObject = new PopupWithForm(
  '.popup_type_add-card', // Создать обьект идентификаторов и подсовывать элемент обьекта идентификаторов '.popup_type_add-card
  validators.validatorFormAddImage,
  (evt, inputValues) => {
    evt.preventDefault();
    const values = inputValues;
    cardList.addItem({ name: values.newCardDescription, link: values.newCardLink });
    validators.validatorFormAddImage.buttonStateControl();
    popupAddImageObject.close();
  }
);

/** УСТАНОВКА СЛУШАТЕЛЕЙ */
// buttonEditProfile.addEventListener('click', popupEditProfileObject.open);
buttonEditProfile.addEventListener('click', () => {
  validators.validatorFormEditProfile.resetValidation();
  popupEditProfileObject.setInputValues(userInfo.getUserInfo());
  popupEditProfileObject.open();
});
buttonAddCard.addEventListener('click', () => {
  validators.validatorFormAddImage.resetValidation();
  popupAddImageObject.open();
});
avatar.addEventListener('click', () => {

  validators.validatorFormChangeAvatar.resetValidation();
  apiController.getUserData().then((res) => {
    popupChangeAvatar.setInputValues({avatar: res.avatar,})
    validators.validatorFormChangeAvatar.buttonStateControl();
  })
  
  popupChangeAvatar.open();
})
