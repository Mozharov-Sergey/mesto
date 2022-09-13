//CARDS VAR
const cardTemplate = document.querySelector('#cards__card').content;
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

//PAGE
let page = document.querySelector('.page');

// POPUP
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let popupForm = document.querySelector('.popup__form');
let newUserName = popup.querySelector('.popup__field_value_name');
let newUserProfession = popup.querySelector('.popup__field_value_profession');

// PROFILE
let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

//CARDS
let allCards = document.querySelector('.cards');
const addCardFormTemplate = document.querySelector('#popup').content;
let addCardFormContainer = addCardFormTemplate.querySelector('.popup');
let addCardForm = addCardFormTemplate.querySelector('.popup__form');  //
let addCardFormOpenButton = document.querySelector('.profile__add-button');
let addCardFormCloseButton = addCardFormContainer.querySelector('.popup__close');
let addCardFormSubmitButton = addCardFormContainer.querySelector('.popup__submit-button');


// LIKES FUNCTIONS
function likeToggler(event) {
  event.preventDefault();
  let target = event.target;
  if (target.classList.contains('cards__like-button')){
    event.target.classList.toggle("cards__like-button_active");
  }
}

// EDIT PROFILE FUNCTIONS
function editProfileOpen() {
  popup.classList.add('popup_opened');
  newUserName.value = profileName.textContent;
  newUserProfession.value = profileProfession.textContent;
}

function editProfileClose() {
  popup.classList.remove('popup_opened');
}


function editProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = newUserName.value;
  profileProfession.textContent = newUserProfession.value;
  editProfileClose();
}

// CARDS FUNCTIONS
function createInitialCards() {
  initialCards.forEach(function (item) {
    const cardItem = cardTemplate.querySelector('.cards__card').cloneNode(true);
    cardItem.querySelector('.cards__card-image').src = item.link;
    cardItem.querySelector('.cards__card-title').textContent = item.name;
    allCards.append(cardItem);
  });
}

function addCardFormRender() {
  // form atributes
  addCardFormContainer.querySelector('.popup__form').name = 'popup__form-add-image';
  addCardFormContainer.querySelector('.popup__form').action = '#';
  addCardFormContainer.querySelector('.popup__form').method = 'POST';

  // title
  addCardFormContainer.querySelector('.popup__title').textContent = 'Новое место';

  // place title
  addCardFormContainer.querySelector('.popup__field_value_name').name = 'newPlaceTitle';
  addCardFormContainer.querySelector('.popup__field_value_name').placeholder = 'Название';

  // link
  addCardFormContainer.querySelector('.popup__field_value_profession').name = 'newPlaceImageLink';
  addCardFormContainer.querySelector('.popup__field_value_profession').placeholder = 'Ссылка на картинку';

  // submit
  addCardFormContainer.querySelector('.popup__submit-button').textContent = 'Создать';

  page.prepend(addCardFormContainer);
  addCardFormContainer.classList.add('popup_opened');
}

function addCardClose() {
  addCardFormContainer.classList.remove('popup_opened');
}

function createCard(event) {
  event.preventDefault();

  const cardItem = cardTemplate.querySelector('.cards__card').cloneNode(true);
  
  cardItem.querySelector('.cards__card-title').textContent = addCardForm.querySelector('.popup__field_value_name').value;
  cardItem.querySelector('.cards__card-image').src = addCardForm.querySelector('.popup__field_value_profession').value;
  allCards.append(cardItem);
  addCardClose();
}

function deleteCard(event) {
  event.preventDefault();
  let target = event.target;
  if(target.classList.contains('cards__trash')){
    target.closest('.cards__card').remove();
  }
}

createInitialCards();

//LIKE
allCards.addEventListener("click", likeToggler);

//EDIT PROFILE LISTENERS
editButton.addEventListener('click', editProfileOpen);
closeButton.addEventListener('click', editProfileClose);
popupForm.addEventListener('submit', editProfileSubmit);

//CARDS LISTENERS
addCardFormOpenButton.addEventListener('click', addCardFormRender);
addCardFormCloseButton.addEventListener('click', addCardClose);
addCardForm.addEventListener('submit', createCard);
allCards.addEventListener('click', deleteCard);






