export default class UserInfo {
  constructor(userName, userJob) {
    this._name = userName;
    this._job = userJob;
  }

  getUserInfo() {
    this._userData = {name: this._name.textContent, job: this._job.textContent};
    return this._userData;
  }

  setUserInfo({name, job}) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}