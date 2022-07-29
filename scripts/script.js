// POPUP VRIABLES
const popupAddCard = document.querySelector('.popup_type_add-card');
const addCardButton = document.querySelector('.profile__add-button');
const addCardForm = document.querySelector('.popup__form_type_add-card-form');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editProfileCloseButton = document.querySelector('.popup__close');
const editProfileForm = document.querySelector('.popup__form');
const newUserName = popupEditProfile.querySelector('.popup__field_value_name');
const newUserProfession = popupEditProfile.querySelector(
  '.popup__field_value_profession'
);

// CARDS VARIABLES
const cards = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#cards__card').content;
const newCardDescription = popupAddCard.querySelector(
  '.popup__field_value_description'
);
const newCardLink = popupAddCard.querySelector('.popup__field_value_link');
const newCardClose = popupAddCard.querySelector('.popup__close');
const popupCardImage = document.querySelector('.popup_type_open-image');
const popupCardImageClose = popupCardImage.querySelector('.popup__close');

// PROFILE VARIABLES
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

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
    newCard = cardsTemplate.querySelector('.cards__card').cloneNode(true); // ПРОВЕРИТЬ!!!!!!!!!!!!!!!!!!!!!!
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
editProfileCloseButton.addEventListener('click', editProfileClose);
editProfileForm.addEventListener('submit', editProfileSubmit);
// CARDS
addCardButton.addEventListener('click', addCardOpen);
addCardForm.addEventListener('submit', addCardSubmit);
newCardClose.addEventListener('click', addCardClose);
cards.addEventListener('click', likeToggler);
cards.addEventListener('click', cardDelete);
cards.addEventListener('click', cardImageOpen);
popupCardImageClose.addEventListener('click', cardImageClose);
