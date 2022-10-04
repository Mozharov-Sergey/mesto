export default class FormValidator {
  constructor(config, form) {
    this.config = config;
    this._form = form;
    this._submitButton = form.querySelector(this.config.submitButtonSelector);
    this.inputList = Array.from(form.querySelectorAll(this.config.inputSelector));
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this.buttonStateControl();
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }

  _setEventListeners() {
    this.buttonStateControl();
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this.buttonStateControl();
      });
    });
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  buttonStateControl() {
    switch (this._checkInputValidity(this.inputList)) {
      case true:
        this._buttonStateActive();
        break;

      case false:
        this._buttonStateDisabled();
        break;
    }
  }

  _buttonStateActive() {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(this.config.inactiveButtonClass);
  }

  _buttonStateDisabled() {
    this._submitButton.setAttribute('disabled', 'disabled');
    this._submitButton.classList.add(this.config.inactiveButtonClass);
  }

  _showInputError(inputElement, validationMessage) {
    inputElement.classList.add(this.config.inputErrorClass);
    const errorElement = this._form.querySelector(`.${inputElement.id}-input-error`);
    errorElement.classList.add(this.config.errorClass);
    errorElement.textContent = validationMessage;
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this.config.inputErrorClass);
    const errorElement = this._form.querySelector(`.${inputElement.id}-input-error`);
    errorElement.classList.remove(this.config.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputList) {
    const formIsValid = inputList.every((elem) => elem.validity.valid === true);
    return formIsValid;
  }
}
