// POPUP
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close");
let popupForm = document.querySelector(".popup__form");
let newUserName = popup.querySelector(".popup__field_value_name");
let newUserProfession = popup.querySelector(".popup__field_value_profession");

// PROFILE
let editButton = document.querySelector(".profile__edit-button");
let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__profession");

function editProfileOpen() {
  popup.classList.add("popup_opened");
  newUserName.value = profileName.innerText;
  newUserProfession.value = profileProfession.innerText;
}

function editProfileClose() {
  popup.classList.remove("popup_opened");
}

function submitPopupFormHandler(evt) {
  evt.preventDefault();
  profileName.textContent = newUserName.value;
  profileProfession.textContent = newUserProfession.value;
  editProfileClose();
}

editButton.addEventListener("click", editProfileOpen);
closeButton.addEventListener("click", editProfileClose);
popupForm.addEventListener("submit", submitPopupFormHandler);

// Эти переменная, слушатель и его хендлер likeToggler  будут использованы в следующем спринте

// let cards = document.querySelector(".cards");

// function likeToggler(event) {
//   target = event.target;
//   if (target.classList.contains("cards__like-button")) {
//     target.classList.toggle("cards__like-button_active");
//   }
// }

// cards.addEventListener("click", likeToggler);
