let popup = document.querySelector(".popup");
let editButton = document.querySelector(".edit-button");
let closeButton = document.querySelector(".popup__close");
let submitProfileButton = document.querySelector(".submit-button");
let cards = document.querySelector(".cards");

function editProfileOpen() {
  popup.classList.add("popup_opened");
}

function editProfileClose() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let newUserName = popup.querySelector(".popup__field_name").value;
  let newUserFunction = popup.querySelector(".popup__field_function").value;

  let profileName = document.querySelector(".profile__name");
  let profileFunction = document.querySelector(".profile__function");

  profileName.innerText = newUserName;
  profileFunction.innerText = newUserFunction;
  editProfileClose();
}

function likeToggler(event) {
  target = event.target;
  if (target.classList.contains("like-button")) {
    target.classList.toggle("like-button_active");
  }
}

editButton.addEventListener("click", editProfileOpen);
closeButton.addEventListener("click", editProfileClose);
submitProfileButton.addEventListener("click", formSubmitHandler);
cards.addEventListener("click", likeToggler);
