export class FormValidator {
  constructor(config, form) {
    this.config = config;
    this.form = form;
  }

  enableValidation() {
    this._buttonStateControl(this.form); // Возможно это лишнее. Функция повторно вызывается в _setEventListenets
    this._setEventListeners(this.form);
  }

  _setEventListeners(form) {
    const inputList = Array.from(
      form.querySelectorAll(this.config.inputSelector)
    );

    this._buttonStateControl(form);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(form, inputElement);
        this._buttonStateControl(form);
      });
    });
  }

  _isValid(form, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(form, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(form, inputElement);
    }
  }

  _buttonStateControl(form) {
    const inputList = Array.from(
      form.querySelectorAll(this.config.inputSelector)
    );
    const submitButton = form.querySelector(this.config.submitButtonSelector);

    switch (this._checkInputValidity(inputList)) {
      case true:
        this._buttonStateActive(submitButton);
        break;

      case false:
        this._buttonStateDisabled(submitButton);
        break;
    }
  }

  _buttonStateActive(button) {
    button.removeAttribute('disabled');
    button.classList.remove(this.config.inactiveButtonClass);
  }

  _buttonStateDisabled(button) {
    button.setAttribute('disabled', 'disabled');
    button.classList.add(this.config.inactiveButtonClass);
  }

  _showInputError(form, inputElement, validationMessage) {
    inputElement.classList.add(this.config.inputErrorClass);
    const errorElement = form.querySelector(`.${inputElement.id}-input-error`);
    errorElement.classList.add(this.config.errorClass);
    errorElement.textContent = validationMessage;
  }

  _hideInputError(form, inputElement) {
    inputElement.classList.remove(this.config.inputErrorClass);
    const errorElement = form.querySelector(`.${inputElement.id}-input-error`);
    errorElement.classList.remove(this.config.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputList) {
    const formIsValid = inputList.every((elem) => elem.validity.valid === true);
    return formIsValid;
  }
}
