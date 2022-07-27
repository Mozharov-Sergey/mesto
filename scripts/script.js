// CARDS VARIABLES
let cards = document.querySelector('.cards');
let cardsTemplate = document.querySelector('#cards__card').content;

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

// POPUP VRIABLES
let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let popupAddCard = document.querySelector('.popup_type_add-card');
let addCardButton = document.querySelector('.profile__add-button');
let addCardForm = document.querySelector('.popup_type_add-card-form');
let closeButton = document.querySelector('.popup__close');
let editProfileForm = document.querySelector('.popup__form');

let newUserName = popupEditProfile.querySelector('.popup__field_value_name');
let newUserProfession = popupEditProfile.querySelector(
  '.popup__field_value_profession'
);

// CARDS VARIABLES
let newCardDescription = popupAddCard.querySelector(
  '.popup__field_value_description'
);
let newCardLink = popupAddCard.querySelector('.popup__field_value_link');
let newCardClose = popupAddCard.querySelector('.popup__close');
let popupCardImage = document.querySelector('.popup_type_open-image');
let popupCardImageClose = popupCardImage.querySelector('.popup__close');

// PROFILE VARIABLES
let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');

function editProfileOpen() {
  popupEditProfile.classList.add('popup_opened');
  newUserName.value = profileName.textContent;
  newUserProfession.value = profileProfession.textContent;
}

function editProfileClose() {
  popupEditProfile.classList.remove('popup_opened');
}

function editProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = newUserName.value;
  profileProfession.textContent = newUserProfession.value;
  editProfileClose();
}

// CARDS
function cardsInitialization() {
  initialCards.forEach(function (item) {
    newCard = cardsTemplate.querySelector('.cards__card').cloneNode(true);
    newCard.querySelector('.cards__card-image').src = item.link;
    newCard.querySelector('.cards__card-image').alt = item.name;
    newCard.querySelector('.cards__card-title').textContent = item.name;
    cards.append(newCard);
  });
}

function addCardOpen() {
  popupAddCard.classList.add('popup_opened');
}

function addCardSubmit(evt) {
  evt.preventDefault();
  newCard = cardsTemplate.cloneNode(true);
  newCard.querySelector('.cards__card-image').src = newCardLink.value;
  newCard.querySelector('.cards__card-image').alt = newCardDescription.value;
  newCard.querySelector('.cards__card-title').textContent =
    newCardDescription.value;
  cards.append(newCard);
  addCardClose();
}

function addCardClose() {
  popupAddCard.classList.remove('popup_opened');
}

function cardDelete(evt) {
  evt.preventDefault();
  target = evt.target;
  if (target.classList.contains('card__delete-button')) {
    target.closest('.cards__card').remove();
  }
}

function likeToggler(evt) {
  target = evt.target;
  if (target.classList.contains('cards__like-button')) {
    target.classList.toggle('cards__like-button_active');
  }
}

function cardImageOpen(evt) {
  target = evt.target;
  if (target.classList.contains('cards__card-image')) {
    popupCardImage.classList.add('popup_opened');
  }

  popupCardImage.querySelector('.popup__image').src = target.src;
  popupCardImage.querySelector('.popup__image').alt = target.alt;
  popupCardImage.querySelector('.popup__image-subtitle').textContent =
    target.alt;
}

function cardImageClose() {
  popupCardImage.classList.remove('popup_opened');
}

cardsInitialization();

//EDIT PROFILE
editButton.addEventListener('click', editProfileOpen);
closeButton.addEventListener('click', editProfileClose);
editProfileForm.addEventListener('submit', editProfileSubmit);
// CARDS
addCardButton.addEventListener('click', addCardOpen);
addCardForm.addEventListener('submit', addCardSubmit);
newCardClose.addEventListener('click', addCardClose);
cards.addEventListener('click', likeToggler);
cards.addEventListener('click', cardDelete);
cards.addEventListener('click', cardImageOpen);
popupCardImageClose.addEventListener('click', cardImageClose);
