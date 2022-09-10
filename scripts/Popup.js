export default class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOnFieldsClose = this._handleClickOnFieldsClose.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  _handleEscClose(evt) { 
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleClickOnFieldsClose(evt) { // Не идеальное название функции. Нужно еще подумать.
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose = this._popup.querySelector('.popup__close');
    this._buttonClose.addEventListener('click', this.close);

    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleClickOnFieldsClose);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  };

  close() {
    this._popup.classList.remove('popup_opened');
    this._buttonClose.removeEventListener('click', this.close);
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleClickOnFieldsClose);

    //  if (this._popup.classList.contains('popup_type_open-image')){
    //   this.remove();
    //  }
    // По скольку для каждой конкретной карточки создается отдельный экземпляр Popup, то по хорошему его стоит удалять при закрытии попапа.
    // Но так и не понял как заставить экземпляр класса удалить самого себя. this.remove() не работает (
  };
}
