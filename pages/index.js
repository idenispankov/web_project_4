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
  inputName,
  inputAbout,
  modalFigure
  // inputTitle,
  // inputUrl
} from '../utils/constants.js'; 
 
/////////////////////////////////////////////////////////////////////////// 
// User Info
const userInfo = new UserInfo({nameSelector: '.profile__text', aboutSelector: '.profile__paragraph'});

// Edit Profile Modal
const editProfileModal = new PopupWithForm('.modal_type_edit-profile', profileSubmitHandler);
editProfileModal.setEventListeners();
  
editProfileButton.addEventListener('click', () => {  
  
  const initialUserInfo = userInfo.getUserInfo();

  editProfileModal.open(); 
});  
  
closeProfileButton.addEventListener('click',() => {  
  editProfileModal.close();
}); 

// Add Card Modal
const addCardModal = new PopupWithForm('.modal_type_add-card', profileSubmitHandler);
addCardModal.setEventListeners();

addCardButton.addEventListener('click', () => {   
  addCardModal.open();
});  
  
closeAddCardFormButton.addEventListener('click', () => {  
  addCardModal.close();
});  
  

// Image Popup
const imageModal = new PopupWithImage('.modal_type_image');
modalFigure.addEventListener('click', () => {
  imageModal.open();
})


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
  
  
// // Render Card 
function renderCard(data) {  
  const card = new Card(data, '.card-template'); 
  const cardElement = card.createCard(); 
  cardsList.addItem(cardElement); 
}  
  
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
function addCardSubmitHandler(e) {  
  e.preventDefault();  
  renderCard({name: this._name, link: this._link});  
  // this._name.value = name.textContent;
  // this._link.value = link.textContent;  
  addCardModal.close();
  addCardForm.reset(); 
}  
  
addCardForm.addEventListener('submit', addCardSubmitHandler);  

// New Form Validators 
 
const editFormValidator = new FormValidator(defaultConfig, editProfileForm); 
const addFormValidator = new FormValidator(defaultConfig, addCardForm); 
 
editFormValidator.enableValidation(); 
addFormValidator.enableValidation(); 