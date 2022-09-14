import { popupCardImage, popupCardImageContent, popupCardTitle } from '../pages/index.js';
import PopupWithImage from './PopupWithImage.js';

export default class Card {
  constructor(data, templateSelector) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._imageUrl = data.link;
    this._title = data.name;
    this._handlerLike = this._handlerLike.bind(this);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`#${this._templateSelector}`)
      .content.querySelector(`.${this._templateSelector}`)
      .cloneNode(true);
    return cardElement;
  }

  _handlerLike() {
    this._likeButton.classList.toggle('cards__like-button_active');
  }

  _handlerRemoveCard = () => {
    this._cardElement.remove();
  };

  _handleCardClick() {
    this._popupImagePreview = new PopupWithImage('.popup_type_open-image', (image, subtitle) => {
      image.src = this._imageUrl;
      image.alt = this._title;
      subtitle.textContent = this._title;
    });
    this._popupImagePreview.open();
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector('.cards__like-button');
    this._likeButton.addEventListener('click', this._handlerLike); // Вариант сохранения контекста с помощью привязки контекста .bind(this);

    this._deleteButton = this._cardElement.querySelector('.card__delete-button');
    this._deleteButton.addEventListener('click', this._handlerRemoveCard); // Вариант сохранения контекста this с помощью стрелочной функции

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardImage = this._cardElement.querySelector('.cards__card-image');
    this._cardTitle = this._cardElement.querySelector('.cards__card-title');

    this._cardImage.src = this._imageUrl;
    this._cardTitle.textContent = this._title;
    this._cardImage.alt = this._title;

    this._setEventListeners();
    return this._cardElement;
  }
}
