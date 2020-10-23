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
  addCardButton
  // addCardForm,
  // modalFigure,
  // closeEditProfileButton
  // closeAddCardFormButton,
  // closeCardImageButton
} from '../utils/constants.js'; 
 
/////////////////////////////////////////////////////////////////////////// 

// User Info
const userInfo = new UserInfo({nameSelector: '.profile__text', aboutSelector: '.profile__paragraph'});

// Profile Submit Handler  
// function profileSubmitHandler(e) {  
//   e.preventDefault();   
//   editProfileModal.close();  
// }  

// Edit Profile Modal
const editProfileModal = new PopupWithForm('.modal_type_edit-profile');
editProfileModal.setEventListeners();

editProfileButton.addEventListener('click', () => {
  editProfileModal.open();
});

// Add Card Modal
const addCardModal = new PopupWithForm('.modal_type_add-card');
addCardModal.setEventListeners();

addCardButton.addEventListener('click', () => {
  addCardModal.open();
});

// Image Modal
const imageModal = new PopupWithImage('.modal_type_image');
imageModal.setEventListeners();

  
// Render Card 
// function renderCard(data) {  
//   const card = new Card(data, '.card-template'); 
//   const cardElement = card.createCard(); 
//   cardsList.prepend(cardElement); 
// }  
  
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '.card-template');
    const cardElement = card.createCard();
    cardsList.addItem(cardElement);
  }
}, cardContainerSelector)

// // Initial Cards Data  
cardsList.renderer();
  
// Add Card Submit Handler  
// function addCardSubmitHandler(e) {  
//   e.preventDefault();  
//   renderCard({name: inputTitle.value, link: inputUrl.value});  
//   inputTitle.value = inputTitle.textContent;  
//   inputUrl.value = inputUrl.textContent;  
//   toggleModal(addCardModal); 
//   addCardForm.reset(); 
// }  
  
// addCardForm.addEventListener('submit', addCardSubmitHandler);  

// Form Validation
// const editFormValidator = new FormValidator(defaultConfig, editProfileForm); 
// const addFormValidator = new FormValidator(defaultConfig, addCardForm); 
 
// editFormValidator.enableValidation(); 
// addFormValidator.enableValidation(); 