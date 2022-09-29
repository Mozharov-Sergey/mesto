import Popup from "./Popup";

export default class PopupAcception extends Popup {
  constructor(popup, callback){
    super(popup);
    this._acceptButton = this._popup.querySelector('.popup__submit-button');
    this._callback = callback;
    this._callback = this._callback.bind(this);
  }

  open(card, id) {
    super.open()
    this.card = card;
    this.id = id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._acceptButton.addEventListener('click', () => {
      this._callback(this.card, this.id);
    });
  }
}