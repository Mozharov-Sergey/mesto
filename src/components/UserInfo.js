export default class UserInfo {
  constructor(userData) {
    this._name = userData.name;
    this._profession = userData.profession;
  }

  getUserInfo() {
    return {
      name: this._name.textContent, 
      profession: this._profession.textContent
    };
  }

  setUserInfo(newUserData) {
    this._name.textContent = newUserData.name;
    this._profession.textContent = newUserData.info;
  }
}
