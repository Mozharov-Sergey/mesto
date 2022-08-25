class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._imageUrl = data.link;
    this._title = data.name;
    this._isLiked = data.isLiked;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`#${this._templateSelector}`)
      .content.querySelector(`.${this._templateSelector}`)
      .cloneNode(true);
    return cardElement;
  }

  _handlerLike() {
    // this теряет контекст. Здесь - cards__like-button
    this.classList.toggle('cards__like-button_active');
  }

  _handlerRemoveCard() {
    // this теряет контекст. Здесь - cards__delete-button
    this.closest('.cards__card').remove();
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector('.cards__like-button');
    this._likeButton.addEventListener('click', this._handlerLike);

    this._deleteButton = this._cardElement.querySelector(
      '.card__delete-button'
    );
    this._deleteButton.addEventListener('click', this._handlerRemoveCard);

    this.cardImage = this._cardElement.querySelector('.cards__card-image');
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector('.cards__card-image').src = this._imageUrl;
    this._cardElement.querySelector('.cards__card-title').textContent =
      this._title;
    const like = this._cardElement.querySelector('.cards__like-button');
    if (this._isLiked) {
      like.classList.add('cards__like-button_active');
    }
    return this._cardElement;
  }
}

export { Card };
