export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleRemoveCard,
    handleLike,
    handleUnlike,
    userId
  ) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._imageUrl = data.link;
    this._likes = data.likes.length;
    this._title = data.name;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._userId = userId;
    this._handleRemoveCard = handleRemoveCard;
    this._handleRemoveCard = this._handleRemoveCard.bind(this);
    this._handleLike = handleLike;
    this._handleLike = this._handleLike.bind(this);
    this._handleUnlike = handleUnlike;
    this._handleUnlike = this._handleUnlike.bind(this);
    this._handleCardClick = handleCardClick;
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector('.cards__like-button');
    this._deleteButton = this._cardElement.querySelector('.card__delete-button');
    this._cardImage = this._cardElement.querySelector('.cards__card-image');
    this._cardTitle = this._cardElement.querySelector('.cards__card-title');
    this._likesCounter = this._cardElement.querySelector('.cards__likes-counter');
    this._isLiked = this._checkIsLiked();
  }

  _checkIsLiked() {
    return this._data.likes.some((item) => {
      
      return (item._id === this._userId);
    });
  }

  like(numberOfLikes, button, counter) {
    button.classList.add('cards__like-button_active');
    counter.textContent = numberOfLikes;

  }

  dislike(numberOfLikes, button, counter) {
    button.classList.remove('cards__like-button_active');
    counter.textContent = numberOfLikes;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`#${this._templateSelector}`)
      .content.querySelector(`.${this._templateSelector}`)
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (this._isLiked) {
        this._isLiked = false;
        this._handleUnlike(this._cardId, this.dislike, this._likeButton, this._likesCounter);
        
        

      } else {
        this._isLiked = true;
        this._handleLike(this._cardId, this.like, this._likeButton, this._likesCounter);
        
      }
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleRemoveCard(this._cardElement, this._cardId);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generateCard() {
    this._cardImage.src = this._imageUrl;
    this._cardTitle.textContent = this._title;
    this._cardImage.alt = this._title;

    if (this._userId !== this._cardOwnerId) {
      this._deleteButton.classList.add('cards__delete-button_disabled');
    }

    if (this._data.likes) {
      this._likesCounter.textContent = this._likes;
    } else {
      this._likesCounter.textContent = 0; // Если информация о лайках не приходит, следовательно карточка создается пользователем.
    }

    if (this._checkIsLiked()) {
      this._likeButton.classList.add('cards__like-button_active');
    }

    this._setEventListeners();
    return this._cardElement;
  }
}
