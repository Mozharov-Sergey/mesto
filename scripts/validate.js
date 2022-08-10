config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible',
};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    buttonStateControl(form);
    form.addEventListener('submit', (evt) => {

    });
    setEventListeners(form);
  });
}

function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  
  buttonStateControl(form);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(form, inputElement);
      buttonStateControl(form);
    });
  });
}

function isValid(form, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(form, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(form, inputElement);
  }
}

function buttonStateControl(form) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  switch (checkInputValidity(inputList)) {
    case true:
      buttonStateActive(submitButton);

      break;
    case false:
      buttonStateDisabled(submitButton);
      break;
  }
}

function showInputError(form, inputElement, validationMessage) {
  inputElement.classList.add(config.inputErrorClass);
  const errorElement = form.querySelector(`.${inputElement.id}-input-error`);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = validationMessage;
}

function hideInputError(form, inputElement) {
  inputElement.classList.remove(config.inputErrorClass);
  const errorElement = form.querySelector(`.${inputElement.id}-input-error`);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

function buttonStateActive(button) {
  button.removeAttribute('disabled');
  button.classList.remove(config.inactiveButtonClass);
}

function buttonStateDisabled(button) {
  button.setAttribute('disabled', 'disabled');
  button.classList.add(config.inactiveButtonClass);
}

function checkInputValidity(inputList) {
  const formIsValid = inputList.every((elem) => elem.validity.valid === true);
  return formIsValid;
}

enableValidation(config);
