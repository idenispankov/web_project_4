import {toggleModal} from '../components/utils.js'; 
import FormValidator from '../components/FormValidator.js'; 
import Card from '../components/Card.js'; 
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {
  initialCards,
  defaultConfig,
  // cardsList,
  cardContainerSelector,
  editProfileModal,
  addCardModal,
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
  inputTitle,
  inputUrl
} from '../utils/constants.js'; 
 
/////////////////////////////////////////////////////////////////////////// 
 
// New Form Validators 
 
const editFormValidator = new FormValidator(defaultConfig, editProfileForm); 
const addFormValidator = new FormValidator(defaultConfig, addCardForm); 
 
editFormValidator.enableValidation(); 
addFormValidator.enableValidation(); 

// User Info
const userInfo = new UserInfo({nameSelector: '.profile__text', aboutSelector: '.profile__paragraph'});

// Image Modal Open
// const openImageModal = (data) => {
//   imageModalWindow.open(data);
// }

// const imageModalPopup = new PopupWithImage();
  
// Profile Submit Handler  
function profileSubmitHandler(e) {  
  e.preventDefault();  
  profileName.textContent = inputName.value;  
  profileAbout.textContent = inputAbout.value;  
  toggleModal(editProfileModal);  
}  
  
// Modal Edit Profile Click Events  
editProfileButton.addEventListener('click', () => {  
  
  inputName.value = profileName.textContent;  
  inputAbout.value = profileAbout.textContent;  
  
  toggleModal(editProfileModal);  
});  
  
closeProfileButton.addEventListener('click',() => {  
  toggleModal(editProfileModal);  
});  
  
editProfileForm.addEventListener('submit', profileSubmitHandler);  
  
// // Modal Image Click Events  
closeCardImageButton.addEventListener('click', () => {  
  toggleModal(imageModalWindow);  
});  
  
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
  
// Modal Add Card Click Events  
addCardButton.addEventListener('click', () => {   
  addCardModal.open();
});  
  
closeAddCardFormButton.addEventListener('click', () => {  
  addCardModal.close();
});  
  
// Add Card Submit Handler  
function addCardSubmitHandler(e) {  
  e.preventDefault();  
  renderCard({name: inputTitle.value, link: inputUrl.value});  
  inputTitle.value = inputTitle.textContent;  
  inputUrl.value = inputUrl.textContent;  
  toggleModal(addCardModal); 
  addCardForm.reset(); 
}  
  
addCardForm.addEventListener('submit', addCardSubmitHandler);  