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

function editProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = newUserName.value;
  profileProfession.textContent = newUserProfession.value;
  closeModalWindow(popupEditProfile);
}

// CARDS
function cardsInitialization() {
  initialCards.forEach((item) =>
    renderCard(createCard(item.link, item.name), cards)
  );
  cards.addEventListener('click', likeToggler);
  cards.addEventListener('click', cardDelete);
  cards.addEventListener('click', function (evt) {
    evt.preventDefault();
    target = evt.target;
    openModalWindow(popupCardImage, target);
  });
}

// CARDS FUNCTIONS
function createCard(link, description) {
  let newCard = cardsTemplate.cloneNode(true);
  newCard.querySelector('.cards__card-image').src = link;
  newCard.querySelector('.cards__card-image').alt = description;
  newCard.querySelector('.cards__card-title').textContent = description;
  return newCard;
}

function renderCard(newCard, container) {
  container.append(newCard);
}

function submitNewCard(newCardLink, newCardDescription, container) {
  renderCard(
    createCard(newCardLink.value, newCardDescription.value),
    container
  );
  closeModalWindow(
    newCardLink.parentElement.parentElement.parentElement.parentElement
  );
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

// MODAL WINDOWS
function openModalWindow(modalWindow) {
  if (!target.classList.contains('cards__card-image')) {
    return;
    // Не смотря на условие target.classList.contains('cards__card-image')
    // открытие карточки срабатывает при нажатии кнопки удаления карточки или лайка.
    //Первое условие if(!...)призвано что бы этого избежать.
    // Подозреваю, что это не самое изящное решение, а верное кроется где то в области работы с событими,
    // но за 8 часов поисков
    // лучшего не нашел (((
  } else if (target.classList.contains('cards__card-image')) {
    popupCardImage.querySelector('.popup__image').src = target.src;
    popupCardImage.querySelector('.popup__image').alt = target.alt;
    popupCardImage.querySelector('.popup__image-subtitle').textContent =
      target.alt;
  }
  modalWindow.classList.add('popup_opened');
}

function closeModalWindow(modalWindow) {
  modalWindow.classList.remove('popup_opened');
}

cardsInitialization();

//PROFILE
editButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  target = evt.target;
  openModalWindow(popupEditProfile);
});
editProfileForm.addEventListener('submit', editProfileSubmit);

//CARD
addCardForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  submitNewCard(newCardLink, newCardDescription, cards);
});

addCardButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  target = evt.target;
  openModalWindow(popupAddCard);
});

//CLOSE
newCardClose.addEventListener('click', () => closeModalWindow(popupAddCard));
editProfileCloseButton.addEventListener('click', () =>
  closeModalWindow(popupEditProfile)
);
popupCardImageClose.addEventListener('click', () =>
  closeModalWindow(popupCardImage)
);
