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
  modalImageTitle
} from '../utils/constants.js';

// Api
const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-6",
  headers: {
    authorization: "7de1d63b-0ba0-4390-89a7-2fe6bdf9eada",
    "Content-Type": "application/json"
  }
});

// 1. Loading User Information from the Server
const profileUserInfo = new UserInfo({nameSelector: '.profile__text', aboutSelector: '.profile__paragraph'})

api.getUserInfo()
.then((res) => {
  profileUserInfo.setUserInfo({name: res.name, about: res.about})
})


// 2. Loading Cards from the Server
api.getCardList()
.then(res => {
  const cardsList = new Section({
    items: res,
    renderer: renderCard,
  }, cardContainerSelector)  
  
  function renderCard(data) {  
    const card = new Card({data, handleCardClick}, '.card-template'); 
    const cardElement = card.createCard(); 
    cardsList.addItem(cardElement); 
  }   
  cardsList.renderer();
  console.log(res)
})

// 3. Editing the Profile
const editProfileModal = new PopupWithForm('.modal_type_edit-profile', editProfileSubmitHandler)

function editProfileSubmitHandler(data) {
  api.setUserInfo(data)
  .then((res) => {
    profileUserInfo.setUserInfo({name: res.name, about: res.about})
  })
  editProfileModal.close()
}

// Initial User Info Open Edit Profile Form
const editProfileButton = document.querySelector('.profile__edit-button');
editProfileButton.addEventListener('click', () => {
  const initialUserInfo = profileUserInfo.getUserInfo();

  Object.keys(editProfileInputs).forEach((input) => {
    editProfileInputs[input].value = initialUserInfo[input];
    editFormValidator.checkInputValidity(editProfileInputs[input]);
  });

  editProfileModal.open();
});

editProfileModal.setEventListeners();

// 4. Adding a New Card
// Add Card Modal 
const addCardModal = new PopupWithForm('.modal_type_add-card', addCardSubmitHandler);

const addCardButton = document.querySelector('.profile__add-button'); 
addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  addCardModal.open();
  addFormValidator.disableSubmitButton();
}); 

function addCardSubmitHandler(data) {
  api.addCard(data)
  .then(res => {
    renderCard(res);
  })
  addCardModal.close();
}

addCardModal.setEventListeners();

const deleteCardModal = new PopupWithForm('.modal_type_delete-card', (data) => {

});

function deleteButtonSubmitHandler(cardId, data) {
  api.deleteCard(cardId)
  .then((res) => {
    card.remove();
  })
}

function deleteButtonClickHandler(cardId) {
  deleteCardModal.open();
}
const deleteCardButton = document.addEventListener('click', deleteButtonClickHandler)

deleteCardModal.setEventListeners()

/////////////////////////////////////////////////////////////////////////////////////////////
// Initial Cards List
const cardsList = new Section({
  items: initialCards,
  renderer: renderCard,
}, cardContainerSelector)  

// Render Card 
function renderCard(data) {  
  const card = new Card({data, handleCardClick}, '.card-template'); 
  const cardElement = card.createCard(); 
  cardsList.addItem(cardElement); 
}  

// Initial Cards Data  
cardsList.renderer();
/////////////////////////////////////////////////////////////////////////////////////////////

// Image Modal
const imageModal = new PopupWithImage('.modal_type_image');
imageModal.setEventListeners();

function handleCardClick() {
  imageModal.open({name: this._name, link: this._link});
  
    modalImageTitle.textContent = this._name;  
    modalImage.src = this._link;  
    modalImage.alt = this._name;
}

// Form Validation
const editFormValidator = new FormValidator(defaultConfig, editProfileForm); 
const addFormValidator = new FormValidator(defaultConfig, addCardForm); 
 
editFormValidator.enableValidation(); 
addFormValidator.enableValidation(); 