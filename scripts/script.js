// POPUP
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close");
let popupForm = document.querySelector(".popup__form");
// Значения newUserName и newUserFunction вычисляются
// в момент вызова submitPopupFormHandler
let newUserName;
let newUserFunction;

// PROFILE
let editButton = document.querySelector(".profile__edit-button");
let profileName = document.querySelector(".profile__name");
let profileFunction = document.querySelector(".profile__profession");

function editProfileOpen() {
  popup.classList.add("popup_opened");
}

function editProfileClose() {
  popup.classList.remove("popup_opened");
}

function submitPopupFormHandler(evt) {
  evt.preventDefault();

  newUserName = popup.querySelector(".popup__field_value_name").value;
  newUserFunction = popup.querySelector(".popup__field_value_profession").value;

  profileName.textContent = newUserName;
  profileFunction.textContent = newUserFunction;
  editProfileClose();
}

editButton.addEventListener("click", editProfileOpen);
closeButton.addEventListener("click", editProfileClose);
popupForm.addEventListener("submit", submitPopupFormHandler);

// Эти переменная, слушатель и его хендлер likeToggler  будут использованы в следующем спринте

let cards = document.querySelector(".cards");

function likeToggler(event) {
  target = event.target;
  if (target.classList.contains("cards__like-button")) {
    target.classList.toggle("cards__like-button_active");
  }
}

cards.addEventListener("click", likeToggler);
