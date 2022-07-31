/** POPUP VRIABLES */
const popupAddCard = document.querySelector('.popup_type_add-card');
const addCardButton = document.querySelector('.profile__add-button');
const addCardForm = document.querySelector('.popup__form_type_add-card-form');
const newCardDescription = popupAddCard.querySelector(
  '.popup__field_value_description'
);
const newCardLink = popupAddCard.querySelector('.popup__field_value_link');
const newCardClose = popupAddCard.querySelector('.popup__close');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editProfileCloseButton = document.querySelector('.popup__close');
const editProfileForm = document.querySelector('.popup__form');
const newUserName = popupEditProfile.querySelector('.popup__field_value_name');
const newUserProfession = popupEditProfile.querySelector(
  '.popup__field_value_profession'
);

const popupCardImage = document.querySelector('.popup_type_open-image');
const popupCardImageClose = popupCardImage.querySelector('.popup__close');

/** CARDS VARIABLES */
const cards = document.querySelector('.cards');
const cardsTemplate = document.querySelector('#cards__card').content;

/** PROFILE VARIABLES */
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

function editProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = newUserName.value;
  profileProfession.textContent = newUserProfession.value;
  openClosePopupToggler(popupEditProfile, evt);
}

/** CARDS */
function cardsInitialization() {
  initialCards.forEach((item) =>
    renderCard(createCard(item.link, item.name), cards)
  );
}

/** CARDS FUNCTIONS */
function createCard(link, description) {
  const newCard = cardsTemplate.cloneNode(true);
  newCard.querySelector('.cards__card-image').src = link;
  newCard.querySelector('.cards__card-image').alt = description;
  newCard.querySelector('.cards__card-title').textContent = description;

  newCard
    .querySelector('.cards__card-image')
    .addEventListener('click', (evt) =>
      openClosePopupToggler(popupCardImage, evt)
    );

  newCard
    .querySelector('.card__delete-button')
    .addEventListener('click', cardDelete);
  newCard
    .querySelector('.cards__like-button')
    .addEventListener('click', likeToggler);
  return newCard;
}

function renderCard(newCard, container) {
  container.append(newCard);
}

function submitNewCard(newCardLink, newCardDescription, container, evt) {
  evt.preventDefault();
  renderCard(
    createCard(newCardLink.value, newCardDescription.value),
    container
  );
  openClosePopupToggler(popupAddCard, evt);
}

function cardDelete(evt) {
  const target = evt.target;
  target.closest('.cards__card').remove();
}

function likeToggler(evt) {
  const target = evt.target;
  target.classList.toggle('cards__like-button_active');
}

function openClosePopupToggler(popup, evt) {
  popup.classList.toggle('popup_opened');

  if (popup.classList.contains('popup_type_open-image')) {
    const target = evt.target;
    popupCardImage.querySelector('.popup__image').src = target.src;
    popupCardImage.querySelector('.popup__image').alt = target.alt;
    popupCardImage.querySelector('.popup__image-subtitle').textContent =
      target.alt;
  }
}

cardsInitialization();

/** PROFILE */
profileEditButton.addEventListener('click', function (evt) {
  openClosePopupToggler(popupEditProfile, evt);
});
editProfileForm.addEventListener('submit', editProfileSubmit);

editProfileCloseButton.addEventListener('click', (evt) =>
  openClosePopupToggler(popupEditProfile, evt)
);

/** CARD */
addCardForm.addEventListener('submit', function (evt) {
  submitNewCard(newCardLink, newCardDescription, cards, evt);
});

addCardButton.addEventListener('click', function (evt) {
  openClosePopupToggler(popupAddCard, evt);
});

newCardClose.addEventListener('click', (evt) =>
  openClosePopupToggler(popupAddCard, evt)
);

/** IMAGE */
popupCardImageClose.addEventListener('click', (evt) =>
  openClosePopupToggler(popupCardImage, evt)
);
