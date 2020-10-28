import './index.css';

import FormValidator from '../components/FormValidator.js'; 
import Card from '../components/Card.js'; 
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  initialCards,
  defaultConfig,
  cardContainerSelector,
  editProfileForm,
  addCardForm,
  editProfileInputs,
  modalImage,
  modalImageTitle
} from '../utils/constants.js';


// Image Modal
const imageModal = new PopupWithImage('.modal_type_image');
imageModal.setEventListeners();

function handleCardClick() {
  imageModal.open({name: this._name, link: this._link});
  
    modalImageTitle.textContent = this._name;  
    modalImage.src = this._link;  
    modalImage.alt = this._name;
}


// User Info
const userInfo = new UserInfo({nameSelector: '.profile__text', aboutSelector: '.profile__paragraph'});


// Edit Profile Modal
const editProfileModal = new PopupWithForm('.modal_type_edit-profile', (data) => {
  userInfo.setUserInfo({name: data.inputName, about: data.inputAbout});
  editProfileModal.close();
});

editProfileModal.setEventListeners();

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
  addFormValidator.disableSubmitButton();
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
 
editFormValidator.enableValidation(); 
addFormValidator.enableValidation(); 