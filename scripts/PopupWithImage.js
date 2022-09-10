import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup, callback) {
    super(popup);
    this._callback = callback;
  }

  test() {
    console.log(this._popup);
  }

  open() {
    super.open();
    this._image = this._popup.querySelector('.popup__image');
    this._imageSubtitle = this._popup.querySelector('.popup__image-subtitle');
    this._callback(this._image, this._imageSubtitle);
  }

  close() {
    super.close();
  }
}