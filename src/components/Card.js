export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._imageUrl = data.link;
    this._title = data.name;
    this._handlerLike = this._handlerLike.bind(this);
    this.handleCardClick = handleCardClick;
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector('.cards__like-button');
    this._deleteButton = this._cardElement.querySelector('.card__delete-button');
    this._cardImage = this._cardElement.querySelector('.cards__card-image');
    this._cardTitle = this._cardElement.querySelector('.cards__card-title');
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

  _setEventListeners() {
    this._likeButton.addEventListener('click', this._handlerLike); // Вариант сохранения контекста с помощью привязки контекста .bind(this);

    this._deleteButton.addEventListener('click', this._handlerRemoveCard); // Вариант сохранения контекста this с помощью стрелочной функции

    this._cardImage.addEventListener('click', () => {
      this.handleCardClick();
    });
  }

  generateCard() {
    this._cardImage.src = this._imageUrl;
    this._cardTitle.textContent = this._title;
    this._cardImage.alt = this._title;

    this._setEventListeners();
    return this._cardElement;
  }
}
