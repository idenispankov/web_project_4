import './index.css'; 
 
import FormValidator from '../components/FormValidator.js';  
import Card from '../components/Card.js';  
import Section from '../components/Section.js'; 
import UserInfo from '../components/UserInfo.js'; 
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm.js'; 
import Api from '../components/Api.js';
import { 
  initialCards, 
  defaultConfig, 
  cardContainerSelector, 
  editProfileForm, 
  addCardForm, 
  editProfileInputs, 
  modalImage, 
  modalImageTitle,
  // avatarModal,
  avatarForm
} from '../utils/constants.js'; 

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-6",
  headers: {
    authorization: "7de1d63b-0ba0-4390-89a7-2fe6bdf9eada",
    "Content-Type": "application/json"
  }
});

// User Info 
let userId = null;
const userInfo = new UserInfo({
  nameSelector: '.profile__text',
  aboutSelector: '.profile__paragraph',
  avatarSelector: '.profile__avatar'
}); 
 
 
// Image Modal 
const imageModal = new PopupWithImage('.modal_type_image'); 
imageModal.setEventListeners(); 
 
function handleCardClick() { 
  imageModal.open({name: this._name, link: this._link}); 
   
    modalImageTitle.textContent = this._name;   
    modalImage.src = this._link;   
    modalImage.alt = this._name; 
} 
 
// Loading User Information from the Server
api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({name: res.name, about: res.about})
    userInfo.setUserAvatar(res.avatar)
    userId = res._id;
  })
 
// Edit Profile Modal 
const editProfileModal = new PopupWithForm('.modal_type_edit-profile', (data) => { 
  api.setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo({name: res.name, about: res.about})
      editProfileModal.close();
    })
    .catch((err) => {
      console.log(err);
    });
}); 

// Avatar Modal
const avatarModal = new PopupWithForm('.modal_type_avatar', (data) => {
  api.setUserAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar({avatar: res.avatar})
      avatarModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
})

const editAvatarButton = document.querySelector('.profile__avatar-edit');
editAvatarButton.addEventListener('click', () => {
  avatarModal.open()
})
 
editProfileModal.setEventListeners(); 
avatarModal.setEventListeners();
 
// Initial User Info Open Edit Profile Form 
const editProfileButton = document.querySelector('.profile__edit-button'); 
editProfileButton.addEventListener('click', () => { 
  const initialUserInfo = userInfo.getUserInfo(); 
 
  Object.keys(editProfileInputs).forEach((input) => { 
    editProfileInputs[input].value = initialUserInfo[input]; 
    editFormValidator.checkInputValidity(editProfileInputs[input]); 
  }); 
 
  editProfileModal.open(); 
}); 
 
 
// Add Card Modal  
const addCardModal = new PopupWithForm('.modal_type_add-card', addCardSubmitHandler); 
addCardModal.setEventListeners(); 
 
const addCardButton = document.querySelector('.profile__add-button');  
addCardButton.addEventListener('click', () => { 
  addCardForm.reset(); 
  addCardModal.open(); 
  addFormValidator.disableSubmitCardButton(); 
});  
 
function addCardSubmitHandler(data) { 
  renderCard({name: data.title, link: data.url}, '.card-template', handleCardClick); 
  addCardModal.close(); 
} 
 
   
// Render Card  
function renderCard(data) {   
  const card = new Card(data, '.card-template', handleCardClick);  
  const cardElement = card.createCard();  
  cardsList.addItem(cardElement);  
}   
   
// Cards List 
const cardsList = new Section({ 
  items: initialCards, 
  renderer: renderCard, 
}, cardContainerSelector) 
 
// // Initial Cards Data   
cardsList.renderer(); 
   
// Form Validation 
const editFormValidator = new FormValidator(defaultConfig, editProfileForm);  
const addFormValidator = new FormValidator(defaultConfig, addCardForm);  
const avatarFormValidator = new FormValidator(defaultConfig, avatarForm);
  
editFormValidator.enableValidation();  
addFormValidator.enableValidation();  
avatarFormValidator.enableValidation();