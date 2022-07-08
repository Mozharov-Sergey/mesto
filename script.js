let popup = document.querySelector(".popup");
let editButton = document.querySelector(".edit-button");
let closeButton = document.querySelector(".popup__close");
let submitProfileButton = document.querySelector(".submit-button");

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

  let profileName = document.querySelector('.profile__name');
  let profileFunction = document.querySelector('.profile__function');

  profileName.innerText = newUserName;
  profileFunction.innerText = newUserFunction;
  editProfileClose()
}

editButton.addEventListener("click", editProfileOpen);
closeButton.addEventListener("click", editProfileClose);
submitProfileButton.addEventListener("click", formSubmitHandler);
