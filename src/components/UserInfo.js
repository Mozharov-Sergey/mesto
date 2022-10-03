export default class UserInfo {
  constructor(userData) {
    this._name = userData.name;
    this._profession = userData.profession;
    this._id = '';
    this._avatar = '';
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      profession: this._profession.textContent,
      id: this._id,
    };
  }

  getUserId() {
    return this._id;
  }

  getUserAvatar() {
    return this._avatar;
  }

  setUserInfo(newUserData) {
    this._name.textContent = newUserData.name;
    this._profession.textContent = newUserData.info;
    this._id = newUserData.id;
    this._avatar = newUserData.avatar;
  }
}
