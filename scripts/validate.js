config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
 //////////////////////////////////////
    });
    setEventListeners(form);

  })
}

function setEventListeners(form) {
  inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(form, inputElement);
      // checkInputValidity(form);
    })
  })
}

function isValid(form, inputElement) {
  if(!inputElement.validity.valid){
    showInputError(form, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(form, inputElement);
  }
}

function showInputError(form, inputElement, validationMessage) {
  inputElement.classList.add('popup__field_type_error');
  const errorElement = form.querySelector(`.${inputElement.id}-input-error`);
  errorElement.classList.add('popup__error_visible');
  errorElement.textContent = validationMessage;
}

function hideInputError(form, inputElement) {
  inputElement.classList.remove('popup__field_type_error');
  const errorElement = form.querySelector(`.${inputElement.id}-input-error`);
  // Не совсем понимаю как должен работать модификатор 'popup__error_visible'
  // Формально требование соблюдено и добавляю/убираю его по необходимости.
  // Логика подсказывает, что в нем я должен добавлять единственный стиль 
  // display или visible что бы открыть и закрыть поле.Но тогда изначально, в предыдущем классе 
  // {$inputElement.id}-input-error стиль должен быть установлен как display:none.
  // И тогда придется для каждого спана придется создавать отдельный css файл и копипастить все остальные стили.
  // С точки зрения DRY это не верно. Вижу выход - добавтить третий класс для спанов, содержащий
  // непосредственно их стили, но такого в теории небыло. Пока прописываю стили спана в модификаторе,
  // но головой понимаю, что это не верно. В общем путаница со стилями Spanа.
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
}

function hasInvalidInput() {}

function toggleButtonState(button) {
  if(button.hasAttribute('disabled')){
    console.log('Да');
  }else console.log('Нет');
}

function checkInputValidity(form) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const formIsValid = inputList.every((elem) => elem.validity.valid === true);
  console.log(formIsValid);
}


enableValidation(config);

















enableValidation(config);