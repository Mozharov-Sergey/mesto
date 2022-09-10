import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup, callback) {
    super(popup);
    this._callback = callback;
  }
 
  test() {
    console.log(this._popup);
  }

  // open() {
    
  // }
}


const popupWithImageObject = new PopupWithImage('.popup_type_open-image',2);
popupWithImageObject.test();

