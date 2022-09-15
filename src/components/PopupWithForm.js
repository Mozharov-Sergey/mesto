import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popup, validator, callback) {
    super(popup);
    this._callback = callback;
    this._validator = validator;
    this._form = this._popup.querySelector('.popup__form');
    this.userNameNew = this._popup.querySelector('.popup__field_value_name');
    this.userProfessionNew = this._popup.querySelector('.popup__field_value_profession');
    this._getInputValues = this._getInputValues.bind(this);
    this._callback = this._callback.bind(this);
    this._fields = Array.from(this._form.querySelectorAll('.popup__field'));
    this.setEventListeners();
  }

  _getInputValues() {
    this.fieldsValues = {};
    this._fields.forEach((field) => {
      this.fieldsValues[field.name] = field.value;
    });
    return this.fieldsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._callback(evt, this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInputValues(data) {
    this._fields.forEach((input) => {
      input.value = data[input.id];
    });
  }

  open() {
    super.open();
    this._validator.buttonStateControl();
  }
}
