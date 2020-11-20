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

// Loading User Information from the Server
api.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({name: res.name, about: res.about})
    userInfo.setUserAvatar(res.avatar)
    userId = res._id;
  })
  .catch(err => console.log(err));


  // Edit Profile Modal 
const editProfileModal = new PopupWithForm('.modal_type_edit-profile', (data) => { 
  api.setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo({name: res.name, about: res.about})
      editProfileModal.saving();
      editProfileModal.close();
    })
    .catch(err => console.log(err));
}); 

// Avatar Modal
const avatarModal = new PopupWithForm('.modal_type_avatar', (data) => {
  api.setUserAvatar(data)
    .then((data) => {
      userInfo.setUserAvatar({avatar: data.avatar})
      const avatarImage = document.querySelector('.profile__avatar');
      avatarImage.src = data.avatar.src;
      avatarModal.saving();
      avatarModal.close();
    })
    .catch(err => console.log(err));
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

// Function Render Card
function renderCard() {  
  const cardsList = new Section({
    renderer: (data) =>  {
      const card = new Card({data}, handleCardClick, handleDeleteClick, handleLikeClick, '.card-template'); 
      const cardElement = card.createCard(data, userId);
      cardsList.addItem(cardElement);
    },
  }, cardContainerSelector) 
}

// Loading Cards from the Server
api.getCardList()
  .then(userCards => {
    const cardsList = new Section({
      items: userCards,
      renderer: (data) =>  {
        const card = new Card({data}, handleCardClick, handleDeleteClick, handleLikeClick, '.card-template'); 
        const cardElement = card.createCard(userId);
        cardsList.addItem(cardElement);
      },
    }, cardContainerSelector)  

    cardsList.renderer();
  })
  .catch(err => console.log(err));

function handleDeleteClick(cardId, card) {
  deleteModal.open(cardId, card)
}

function handleLikeClick(cardId, card) {
  // const cardId = e.target.data;
  // const liked = e.target.classList.contains('card__like-button_active');

  api.cardLikesCount(cardId, card)
    .then((res) => {
      console.log('card', res)
      card.classList.toggle('card__like-button_active');
    })
    .catch(err => console.log(err))
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

function handleCardClick() { 
  imageModal.open({name: this._name, link: this._link}); 
   
    modalImageTitle.textContent = this._name;   
    modalImage.src = this._link;   
    modalImage.alt = this._name; 
} 

const addCardModal = new PopupWithForm('.modal_type_add-card', (data) => {
  api.addCard(data)
    .then((res) => {
      console.log(res)
      renderCard(res);
      addCardModal.close();
    })
    .catch(err => console.log(err))
});

const addCardButton = document.querySelector('.profile__add-button'); 
addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  addCardModal.open();
  addFormValidator.disableSubmitButton();
}); 
addCardModal.close();

addCardModal.setEventListeners();

// Image Modal 
const imageModal = new PopupWithImage('.modal_type_image'); 
imageModal.setEventListeners(); 
   
// Form Validation 
const editFormValidator = new FormValidator(defaultConfig, editProfileForm);  
const addFormValidator = new FormValidator(defaultConfig, addCardForm);  
const avatarFormValidator = new FormValidator(defaultConfig, avatarForm);
  
editFormValidator.enableValidation();  
addFormValidator.enableValidation();  
avatarFormValidator.enableValidation();