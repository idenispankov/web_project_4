import {toggleModal} from '../components/utils.js'; 
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
  // cardsList,
  cardContainerSelector,
  // editProfileModal,
  // addCardModal,
  // imageModalWindow,
  editProfileButton,
  addCardButton,
  editProfileForm,
  addCardForm,
  closeProfileButton,
  closeAddCardFormButton,
  closeCardImageButton,
  // inputName,
  // inputAbout,
  // inputTitle,
  // inputUrl
} from '../utils/constants.js'; 
 
/////////////////////////////////////////////////////////////////////////// 

// User Info
const userInfo = new UserInfo({nameSelector: '.profile__text', aboutSelector: '.profile__paragraph'});

// Image Popup
const imageModalPopup = new PopupWithImage('.modal_type_image');


// Image Modal Open
// const openImageModal = (data) => {
//   imageModalWindow.open(data);
// }



// // Modal Image Click Events  
closeCardImageButton.addEventListener('click', () => {  
  closeCardImageButton.close();
});  
  
// Profile Submit Handler  
function profileSubmitHandler(e) {  
  e.preventDefault();  
  // profileName.textContent = inputName.value;  
  // profileAbout.textContent = inputAbout.value;  
  // userInfo.setUserInfo();
  editProfileModal.close();
} 

const editProfileModal = new PopupWithForm('.modal_type_edit-profile', profileSubmitHandler);
editProfileModal.setEventListeners();
  
// Modal Edit Profile Click Events  
editProfileButton.addEventListener('click', () => {  
  
  // userInfo.getUserInfo();
  editProfileModal.open(); 
});  
  
closeProfileButton.addEventListener('click',() => {  
  editProfileModal.close();
});  
  
// editProfileForm.addEventListener('submit', profileSubmitHandler);  
  
  
// // Render Card 
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
  
// Add Card Modal
const addCardModal = new PopupWithForm('.modal_type_add-card');
addCardModal.setEventListeners();

addCardButton.addEventListener('click', () => {   
  addCardModal.open();
});  
  
closeAddCardFormButton.addEventListener('click', () => {  
  addCardModal.close();
});  
  
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

// New Form Validators 
 
const editFormValidator = new FormValidator(defaultConfig, editProfileForm); 
const addFormValidator = new FormValidator(defaultConfig, addCardForm); 
 
editFormValidator.enableValidation(); 
addFormValidator.enableValidation(); 