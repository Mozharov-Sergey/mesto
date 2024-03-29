export default class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
    this._buttonClose = this._popup.querySelector('.popup__close');
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

  _handleClickOnFieldsClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', this.close);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleClickOnFieldsClose);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleClickOnFieldsClose);
    this._popup.classList.remove('popup_opened');
  }
}
