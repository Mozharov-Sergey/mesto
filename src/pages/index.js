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
  formChangeAvatar,
  buttonSubmitChangeUserData,
  buttonSubmitNewCard,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import PopupAcception from '../components/PopupAcception.js';
let cardList = {};
import { changeButtonText } from '../utils/utils.js';

const apiController = new Api(apiOptions);
const userInfo = new UserInfo({ name: profileName, profession: profileProfession }); // Данные из полей формы сразу обновляются в функции инициализации данных пользователя.

function start() {
  return Promise.all([apiController.getUserData(), apiController.getInitialCards()])
    .catch((err) => console.log(err))
    .then(([user, cards]) => {
      userInfo.setUserInfo({
        name: user.name,
        info: user.about,
        id: user._id,
        avatar: user.avatar,
      });
      avatar.style.backgroundImage = `url('${user.avatar}')`;
      return [user, cards];
    })
    .catch((err) => console.log(err))
    .then(([user, cards]) => {
      const array = cards.reverse(); // Разворачиваем массив, что бы новые карточки появлялись в начале.
      return (cardList = new Section(
        {
          items: array,
          renderer: (item, container) => {
            const card = new Card(
              item,
              'cards__card',

              //handleCardClick
              () => {
                popupImagePreviewObject.open(item.link, item.name);
              },

              // handleCardRemove
              (cardElement, cardId) => {
                popupAcceptionDeleteCard.open(cardElement, cardId);
              },
              // НЕ ПОНЯЛ КОМЕНТАРИЯ ПО ПОВОДУ УДАЛЕНИЯ КАРТОЧЕК. У МЕНЯ ИКОНКА ВПОЛНЕ КОРРЕКТНО ПОЯВЛЯЕТСЯ И УДАЛЯЕТСЯ
              // ПРУФЫ: https://disk.yandex.ru/d/ELAgUpq70ZVb0A

              // handleLike
              (cardId) => {
                return apiController.likeCard(cardId);
              },

              // handleUnlike
              (cardId) => {
                return apiController.unlikeCard(cardId);
              },

              userInfo.getUserId()
              
            ).generateCard();
            
            container.prepend(card);
          },
        },
        '.cards'
      ));
    })
    .then((res) => res.addItems())
    .catch((err) => console.log(err));
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


start();
initializationFormValidation();

/** ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ */
const popupEditProfileObject = new PopupWithForm(
  '.popup_type_edit-profile',
  validators.validatorFormEditProfile,

  (evt, inputValues) => {
    evt.preventDefault();
    changeButtonText(buttonSubmitChangeUserData, 'Сохранение...');
    apiController
      .changeUserData(inputValues.profileName, inputValues.profileFunction)
      .then((res) => {
        userInfo.setUserInfo({ name: res.name, info: res.about });
      })
      .catch((err) => console.log(err))
      .then((res) => {
        popupEditProfileObject.close();
      })
      .catch((err) => console.log(err))
      .finally((res) => changeButtonText(buttonSubmitChangeUserData, 'Сохранить'));
  }
);

/** ПОПАП ИЗМЕНЕНИЯ АВАТАРА */
const popupChangeAvatar = new PopupWithForm(
  '.popup_type_change-avatar',
  validators.validatorFormChangeAvatar,
  (evt, inputValues) => {
    evt.preventDefault();
    changeButtonText(buttonSubmitChangeUserData, 'Сохранение...');
    apiController
      .changeUserAvatar(inputValues.avatar)
      .then((res) => {
        avatar.style.backgroundImage = `url('${res.avatar}')`;
      })
      .catch((err) => console.log(err))
      .then((res) => {
        popupChangeAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally((res) => changeButtonText(buttonSubmitChangeUserData, 'Сохранить'));
  }
);

/** ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ */
const popupAddImageObject = new PopupWithForm(
  '.popup_type_add-card',
  validators.validatorFormAddImage,
  (evt, inputValues) => {
    evt.preventDefault();
    changeButtonText(buttonSubmitNewCard, 'Сохранение...');
    apiController
      .addCard(inputValues.newCardLink, inputValues.newCardDescription)
      .then((res) => {
        cardList.addItem(res);
      })
      .catch((err) => console.log(err))
      .then((res) => {
        popupAddImageObject.close();
        validators.validatorFormAddImage.buttonStateControl();
      })
      .catch((err) => console.log(err))
      .finally((res) => changeButtonText(buttonSubmitNewCard, 'Сохранить'));
  }
);

/** ПОПАП ПОДТВЕРЖДЕНИЯ УДАЛЕНИЯ КАРТОЧКИ */
const popupAcceptionDeleteCard = new PopupAcception('.popup_type_acception', (card, cardId) => {
  const deleteController = apiController.deleteCard(cardId);
  deleteController
    .then((res) => {
      card.remove();
    })
    .then((err) => {
      popupAcceptionDeleteCard.close();
    })
    .catch((err) => console.log(err));
});
popupAcceptionDeleteCard.setEventListeners();

const popupImagePreviewObject = new PopupWithImage('.popup_type_open-image');

/** УСТАНОВКА СЛУШАТЕЛЕЙ */
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
  popupChangeAvatar.open();
});
