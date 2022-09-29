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
  buttonSubmitChangeUserAvatar,
  buttonSubmitNewCard
} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import PopupWithImage from '../components/PopupWithImage.js';
import Api from '../components/Api.js';
import PopupAcception from '../components/PopupAcception.js';
let cardList = {};

const apiController = new Api(apiOptions);
const user = apiController.getUserData();

const popupAcceptionDeleteCard = new PopupAcception('.popup_type_acception', (card, cardId) => {
  card.remove();
  apiController.deleteCard(cardId);
  popupAcceptionDeleteCard.close();
});
popupAcceptionDeleteCard.setEventListeners();

const popupImagePreviewObject = new PopupWithImage('.popup_type_open-image');
const userInfo = new UserInfo({ name: profileName, profession: profileProfession }); // Данные из полей формы сразу обновляются в функции инициализации данных пользователя.
const cards = apiController.getInitialCards();

/** ФУНКЦИИ ИНИЦИАЛИЗАЦИИ */
function cardsInitialization() {
  return user.then((userData) => {
    userInfo.setUserInfo({ name: userData.name, info: userData.about, id: userData._id }); // Получаем информацию о пользователе
    cards // Только после того, как информация о пользователе получена ее можно передавать в карточки
      .then((res) => {
        const array = Array.from(res).reverse(); // Разворачиваем массив, что бы новые карточки появлялись в начале.
        return (cardList = new Section(
          {
            items: array,

            renderer: (item, container) => {
              const card = new Card(
                item, //data
                'cards__card', //template selector

                //handleCardClick
                () => {
                  popupImagePreviewObject.open(item.link, item.name);
                },

                // handleCardRemove
                (cardElement, cardId) => {
                  popupAcceptionDeleteCard.open(cardElement, cardId);
                },

                // handleLike
                (cardId, likeButton, likesCounter) => {
                  apiController.likeCard(cardId).then((res) => {
                    likeButton.classList.add('cards__like-button_active');
                    likesCounter.textContent = res.likes.length;
                  });
                },

                // handleUnlike
                (cardId, likeButton, likesCounter) => {
                  apiController.unlikeCard(cardId).then((res) => {
                    likeButton.classList.remove('cards__like-button_active');
                    likesCounter.textContent = res.likes.length;
                  });
                },
                // userInfo
                userInfo.getUserInfo()
              ).generateCard();
              container.prepend(card);
            },
          },
          '.cards'
        ));
      })
      .then((res) => res.addItems());
  });
}

function initialSettingUserInfo() {
  return user.then((data) => {
    userInfo.setUserInfo({ name: data.name, info: data.about, id: data._id });
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
initialSettingUserInfo();
cardsInitialization();
initializationFormValidation();

/** РЕДАКТИРОВАНИЕ ПРОФИЛЯ */
const popupEditProfileObject = new PopupWithForm(
  '.popup_type_edit-profile',
  validators.validatorFormEditProfile,

  (evt, inputValues) => {
    evt.preventDefault();
    const values = inputValues;
    apiController
      .changeUserData(values.profileName, values.profileFunction)
      .then((res) => {
        return res;
      })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          Promise.reject(
            console.log(
              `Что-то пошло не так с запросом к странице ${this._baseUrl}/users/me при попытке редактирования профиля`
            )
          );
        }
      })
      .then((res) => {
        buttonSubmitChangeUserData.textContent = 'Сохранение...';
        userInfo.setUserInfo({ name: res.name, info: res.about });
        setTimeout(() => (buttonSubmitChangeUserData.textContent = 'Сохранить'), 3000);
      })
      .finally((res) => {
        popupEditProfileObject.close();
      });
  }
);

/** ПОПАП ИЗМЕНЕНИЯ АВАТАРА */
const popupChangeAvatar = new PopupWithForm(
  '.popup_type_change-avatar',
  validators.validatorFormChangeAvatar,
  (evt, inputValues) => {
    evt.preventDefault();
    const values = inputValues;
    apiController
      .changeUserAvatar(values.avatar)
      .then((res) => {
        buttonSubmitChangeUserAvatar.textContent = 'Сохранение...';
        avatar.style.backgroundImage = `url('${res.avatar}')`;
        setTimeout(() => (buttonSubmitChangeUserAvatar.textContent = 'Сохранить'), 3000);
      })
      .finally((res) => {
        popupChangeAvatar.close();
      });
  }
);

/** ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ */
const popupAddImageObject = new PopupWithForm(
  '.popup_type_add-card',
  validators.validatorFormAddImage,
  (evt, inputValues) => {
    evt.preventDefault();
    const values = inputValues;

    apiController
      .addCard(values.newCardLink, values.newCardDescription)
      .then((res) => {
        buttonSubmitNewCard.textContent = 'Сохранение...';
        cardList.addItem(res);
        setTimeout(() => (buttonSubmitNewCard.textContent = 'Сохранить'), 3000);
      })
      .finally((res) => popupAddImageObject.close());
    validators.validatorFormAddImage.buttonStateControl();
  }
);

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
  apiController.getUserData().then((res) => {
    popupChangeAvatar.setInputValues({ avatar: res.avatar });
    validators.validatorFormChangeAvatar.buttonStateControl();
  });

  popupChangeAvatar.open();
});
