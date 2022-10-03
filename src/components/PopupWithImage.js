import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup, callback) {
    super(popup);
    super.setEventListeners();
    this._callback = callback;
    this._image = this._popup.querySelector('.popup__image');
    this._imageSubtitle = this._popup.querySelector('.popup__image-subtitle');
  }

  open(link, description) {
    this._image.src = link;
    this._image.alt = description;
    this._imageSubtitle.textContent = description;
    super.open();
  }
}
