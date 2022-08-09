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
  closePopup(popupEditProfile);
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
    .addEventListener('click', function () {
      const popupPreview = popupCardImage;
      popupPreview.querySelector('.popup__image').src = link;
      popupPreview.querySelector('.popup__image').alt = description;
      popupPreview.querySelector('.popup__image-subtitle').textContent =
        description;
      openPopup(popupPreview);
    });

  newCard
    .querySelector('.card__delete-button')
    .addEventListener('click', cardDelete);
  newCard
    .querySelector('.cards__like-button')
    .addEventListener('click', likeToggler);
  return newCard;
}

function renderCard(newCard, container) {
  container.prepend(newCard);
}

function submitNewCard(newCardLink, newCardDescription, container, evt) {
  evt.preventDefault();
  renderCard(
    createCard(newCardLink.value, newCardDescription.value),
    container
  );
  addCardForm.reset();
  closePopup(popupAddCard);
}

function cardDelete(evt) {
  const target = evt.target;
  target.closest('.cards__card').remove();
}

function likeToggler(evt) {
  const target = evt.target;
  target.classList.toggle('cards__like-button_active');
}

function setClosePopupListeners(popup){
  const popupOverlay = popup;

  popupOverlay.addEventListener('click', function(evt){
    if(evt.target.classList.contains('popup')){
      closePopup(popup);
    }
  });

  document.addEventListener('keydown',(evt) => {
    if(evt.key === 'Escape'){
      closePopup(popup);
    }
  })
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  setClosePopupListeners(popup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

cardsInitialization();





/** PROFILE */

profileEditButton.addEventListener('click', function () {
  popupEditProfile.querySelector('.popup__field_value_name').value =
    profileName.textContent;
  popupEditProfile.querySelector('.popup__field_value_profession').value =
    profileProfession.textContent;
  openPopup(popupEditProfile);
});

editProfileForm.addEventListener('submit', editProfileSubmit);

editProfileCloseButton.addEventListener('click', () =>
  closePopup(popupEditProfile)
);

/** CARD */
addCardForm.addEventListener('submit', function (evt) {
  submitNewCard(newCardLink, newCardDescription, cards, evt);
});

addCardButton.addEventListener('click', () => openPopup(popupAddCard));

newCardClose.addEventListener('click', () => closePopup(popupAddCard));

/** IMAGE */
popupCardImageClose.addEventListener('click', () => closePopup(popupCardImage));
