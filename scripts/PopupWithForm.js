import Popup from './Popup.js';
import {validators} from './script.js';

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const userNameNew = popupEditProfile.querySelector('.popup__field_value_name');
const userProfessionNew = popupEditProfile.querySelector('.popup__field_value_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');




export default class PopupWithForm extends Popup {
  constructor(popup, callback) {
    super(popup);
    this._callback = callback;
    this._form = this._popup.querySelector('.popup__form')
    this._getInputValues = this._getInputValues.bind(this);
    this._callback = this._callback.bind(this);
  }

  _getInputValues() {
    this.fields = Array.from(this._form.querySelectorAll('.popup__field'));
    this.fieldsValues = {};
    this.fields.forEach((field) => {
    this.fieldsValues[field.name] = field.value;
    });
    return this.fieldsValues;
    // Заменить на функцию класса user_info
  }

  // Вызывается в родительском классе
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {this._callback(evt, this._getInputValues)});
  }

  close() {
    super.close();
    this._form.reset();
  }

  open() {
    super.open();
    // ПОТОМ ЗДЕСЬ БУДЕТ МЕТОД КЛАССА USERINFO
    userNameNew.value = profileName.textContent;
    userProfessionNew.value = profileProfession.textContent;
    validators.validatorFormEditProfile.buttonStateControl();
    console.log('opened')
  }
}


