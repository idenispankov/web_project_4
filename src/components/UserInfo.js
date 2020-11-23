export default class UserInfo { 
  constructor(nameSelector, aboutSelector, avatarSelector) { 
    this._name = nameSelector;
    this._about = aboutSelector;
    this._avatar = avatarSelector;
  } 
 
  getUserInfo() { 
    return {name: this._name.textContent, about: this._about.textContent}; 
  } 
 
  setUserInfo(name, about, avatar) { 
    this._name.textContent = name; 
    this._about.textContent = about;
    this._avatar.src = avatar;
  }; 

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
} 