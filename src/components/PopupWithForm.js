import Popup from './Popup.js';
import { userInfo } from '../pages/index.js';
import { validators, userNameNew, userProfessionNew} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popup, callback) {
    super(popup);
    this._callback = callback;
    this._form = this._popup.querySelector('.popup__form');
    this._getInputValues = this._getInputValues.bind(this);
    this._callback = this._callback.bind(this);
    this.setEventListeners();
  }

  _getInputValues() {
    this.fields = Array.from(this._form.querySelectorAll('.popup__field'));
    this.fieldsValues = {};
    this.fields.forEach((field) => {
      this.fieldsValues[field.name] = field.value;
    });
    return this.fieldsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._callback(evt, this._getInputValues());}
    );
  }

  close() {
    super.close();
    this._form.reset();
  }

  open() {
    super.open();
    const userData = userInfo.getUserInfo();
    userNameNew.value = userData.name;
    userProfessionNew.value = userData.info;
    validators.validatorFormEditProfile.buttonStateControl();
  }
}
