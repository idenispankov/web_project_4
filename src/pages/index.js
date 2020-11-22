import './index.css'; 
 
import FormValidator from '../components/FormValidator.js';  
import Card from '../components/Card.js';  
import Section from '../components/Section.js'; 
import UserInfo from '../components/UserInfo.js'; 
import PopupWithImage from '../components/PopupWithImage.js'; 
import PopupWithForm from '../components/PopupWithForm.js'; 
import Api from '../components/Api.js';
import { 
  defaultConfig, 
  cardContainerSelector,
  addCardForm, 
  modalImage, 
  modalImageTitle,
  editProfileInputs
} from '../utils/constants.js'; 

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-6",
  headers: {
    authorization: "7de1d63b-0ba0-4390-89a7-2fe6bdf9eada",
    "Content-Type": "application/json"
  }
});

const editProfileForm = document.querySelector('.form_type_profile');
const editAvatarForm = document.querySelector('.form_type_avatar');

// User Info 
let userId = null;

const userInfo = new UserInfo({
  nameSelector: '.profile__text',
  aboutSelector: '.profile__paragraph',
  avatarSelector: '.profile__avatar'
}); 
    

// Loading User Information from the Server
api.getUserInfo()
  .then((res) => {
    userId = res._id;
    userInfo.setUserInfo({name: res.name, about: res.about})
    userInfo.setUserAvatar(res.avatar)
  })
  .catch(err => console.log(err));


//   Profile Modal
  const editProfileModal = new PopupWithForm('.modal_type_edit-profile', editProfileSubmitHandler)

  function editProfileSubmitHandler(data) {
    api.setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo({name: res.name, about: res.about})
        editProfileModal.close();
      })
      .catch(err => console.log(err))
  }


  const editProfileButton = document.querySelector('.profile__edit-button'); 
  editProfileButton.addEventListener('click', () => { 
  const initialUserInfo = userInfo.getUserInfo(); 
 
  Object.keys(editProfileInputs).forEach((input) => { 
    editProfileInputs[input].value = initialUserInfo[input]; 
    editFormValidator.checkInputValidity(editProfileInputs[input]); 
  }); 
 
  editProfileModal.open(); 
}); 

editProfileModal.setEventListeners();


// Avatar Modal
const editAvatarModal = new PopupWithForm('.modal_type_avatar', editAvatarSubmitHandler);

function editAvatarSubmitHandler(data) {
  api.setUserAvatar(data)
    .then((res) => {
      const avatarImage = document.querySelector('.profile__avatar');
      avatarImage.src = res.avatar;
      editAvatarModal.close();
    })
    .catch(err => console.log(err))
}

const editAvatarButton = document.querySelector('.profile__avatar-edit');
editAvatarButton.addEventListener('click', () => {
  editAvatarModal.open();
})

editAvatarModal.setEventListeners();


// Card Handlers
function handleCardClick() {
  imageModal.open({name: this._name, link: this._link}); 
    modalImageTitle.textContent = this._name;   
    modalImage.src = this._link;   
    modalImage.alt = this._name; 
}

function handleDeleteClick(cardId, card) {
  deleteModal.open(cardId, card)
}

// Remder Cards List
api.getCardList()
  .then(userCards => {
    const cardsList = new Section({
      items: userCards,
      renderer: (data) => {
        const card = new Card({data}, {handleCardClick, handleDeleteClick, handleLikeClick}, '.card-template')
        cardsList.addItem(card.createCard(data, userId))
      }
    }, cardContainerSelector)
    cardsList.renderer()
  })
  .catch(err => console.log(err));

  // Image Modal 
const imageModal = new PopupWithImage('.modal_type_image'); 
imageModal.setEventListeners(); 


// Add Card Modal (Needs improvement on render card on page UI)
const addCardModal = new PopupWithForm('.modal_type_add-card', addCardSubmitHandler);

function addCardSubmitHandler(data) {
  api.addCard(data)
    .then((data) => {
      console.log('DATA 3', data)
      renderCard(data)
      addCardModal.close();
    })
    .catch(err => console.log(err))
}

const addCardButton = document.querySelector('.profile__add-button');
addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  addCardModal.open()
  addFormValidator.disableSubmitButton();
})

addCardModal.setEventListeners();


// Function Render Card
function renderCard(data) {  
  const cardsList = new Section({
    renderer: () =>  {
      const card = new Card({data}, handleCardClick, handleDeleteClick, handleLikeClick, '.card-template'); 
      cardsList.addItem(card.createCard(data, userId));
    },
  }, cardContainerSelector) 
}


const deleteModal = new PopupWithForm('.modal_type_delete-card', (cardId, card) => {
  api.deleteCard(cardId)
    .then(() => {
      card.remove();
      deleteModal.close();
    })
    .catch(err => console.log(err))
})

deleteModal.setEventListeners();



function handleLikeClick(cardId, card) {
   
}

// Form Validation 
const editFormValidator = new FormValidator(defaultConfig, editProfileForm);  
const addFormValidator = new FormValidator(defaultConfig, addCardForm);  
const avatarFormValidator = new FormValidator(defaultConfig, editAvatarForm);
  
editFormValidator.enableValidation();  
addFormValidator.enableValidation();  
avatarFormValidator.enableValidation();