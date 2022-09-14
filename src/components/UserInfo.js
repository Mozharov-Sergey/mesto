// import { profileName, profileProfession } from '../pages/index.js';
import { profileName, profileProfession } from '../utils/constants.js';

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
