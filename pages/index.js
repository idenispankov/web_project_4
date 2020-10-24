import FormValidator from '../components/FormValidator.js'; 
import Card from '../components/Card.js'; 
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  initialCards,
  defaultConfig,
  cardContainerSelector,
  editProfileButton,
  editProfileForm,
  submitEditProfileButton,
  addCardButton,
  addCardForm,
  editProfileInputs,
  modalImage,
  modalImageTitle
} from '../utils/constants.js'; 
 
/////////////////////////////////////////////////////////////////////////// 

// User Info
const userInfo = new UserInfo({nameSelector: '.profile__text', aboutSelector: '.profile__paragraph'});

// Edit Profile Submit Handler  
function profileSubmitHandler(e) {  
  e.preventDefault();   
  editProfileModal.close();
  
}  

// Edit Profile Modal
const editProfileModal = new PopupWithForm('.modal_type_edit-profile', () => {
  editProfileModal.close();
});

// Initial User Info Open Edit Profile Form
editProfileButton.addEventListener('click', () => {
  const initialUserInfo = userInfo.getUserInfo();

  Object.keys(editProfileInputs).forEach((input) => {
    editProfileInputs[input].value = initialUserInfo[input];
    editFormValidator._checkInputValidity(editProfileInputs[input]);
  });

  editProfileModal.open();
});

editProfileModal.setEventListeners();
submitEditProfileButton.addEventListener('submit', profileSubmitHandler);


// Add Card Modal
const addCardModal = new PopupWithForm('.modal_type_add-card');
addCardModal.setEventListeners();

addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  addCardModal.open();
});


// Image Modal
const imageModal = new PopupWithImage('.modal_type_image');
imageModal.setEventListeners();

/////
function handleCardClick() {
  imageModal.open({name: this._name, link: this._link});
  
    modalImageTitle.textContent = this._name;  
    modalImage.src = this._link;  
    modalImage.alt = this._name;
}

///// 


  
// Render Card 
function renderCard(data) {  
  const card = new Card(data, '.card-template', handleCardClick); 
  const cardElement = card.createCard(); 
  cardsList.addItem(cardElement); 
}  
  
const cardsList = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, '.card-template', handleCardClick);
    const cardElement = card.createCard();
    cardsList.addItem(cardElement);
  }
}, cardContainerSelector)

// // Initial Cards Data  
cardsList.renderer();
  
// Add Card Submit Handler  
function addCardSubmitHandler(e) {  
  e.preventDefault();  
  renderCard({name: this._name, link: this._link}); 
  addCardModal.close();
  addCardForm.reset();
}  
  
addCardForm.addEventListener('submit', addCardSubmitHandler);  

// Form Validation
const editFormValidator = new FormValidator(defaultConfig, editProfileForm); 
const addFormValidator = new FormValidator(defaultConfig, addCardForm); 
 
editFormValidator.enableValidation(); 
addFormValidator.enableValidation(); 