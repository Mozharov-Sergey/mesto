import { profileName, profileProfession } from '../utils/constants.js';
// Пока оставил импорт тут ради удобства. Имею ввиду, что импорта тут быть не должно, а данные нужно запрашивать с бэка, но его пока нет.
export default class UserInfo {
  constructor(userData) {
    this._name = userData.name;
    this._info = userData.info;
  }

  getUserInfo() {
    return {
      name: this._name,
      info: this._info,
    };
  }

  setUserInfo(newUserData) {
    this._name = newUserData.name;
    this._info = newUserData.info;
    profileName.textContent = this._name;
    profileProfession.textContent = this._info;
  }
}
