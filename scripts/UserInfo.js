export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._name = document,querySelector(nameSelector);
    this._about = document,querySelector(aboutSelector);
  }

  getUserInfo() {
    return {name: this._nameSelector.textContent, about: this._aboutSelector.textContent};
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}