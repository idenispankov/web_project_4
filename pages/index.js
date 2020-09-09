// Modal Windows
const editProfileModal = document.querySelector('.modal_type_edit-profile');
const addCardModal = document.querySelector('.modal_type_add-card');
const imageModalWindow = document.querySelector('.modal_type_image');

// Open Buttons
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Submit Form Buttons
const editProfileForm = editProfileModal.querySelector('.form_type_profile');
const AddCardForm = addCardModal.querySelector('.form_type_card');
const modalFigure = imageModalWindow.querySelector('.modal__figure');

// Close Buttons
const closeProfileButton = editProfileModal.querySelector('.form__close-button');
const closeAddCardFormButton = addCardModal.querySelector('.form__close-button');
const closeCardImageButton = modalFigure.querySelector('.form__close-button_type-image');

// Edit Profile Form Inputs
const inputName = editProfileForm.querySelector('.form__input_type_name');
const inputAbout = editProfileForm.querySelector('.form__input_type_about');

const profileName = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__paragraph');

// Add Card Form Inputs
const inputTitle = AddCardForm.querySelector('.form__input_type_card-title');
const inputUrl = AddCardForm.querySelector('.form__input_type_card-url');

// Toggle Function
function toggleModal(modal) {
  modal.classList.toggle('modal_is-open');
};

// Profile Submit Handler
function profileSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  toggleModal(editProfileModal);
};

// Modal Edit Profile Click Events
editProfileButton.addEventListener('click', () => {

  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;

  toggleModal(editProfileModal);
});

closeProfileButton.addEventListener('click',() => {
  toggleModal(editProfileModal);
})

editProfileForm.addEventListener('submit', profileSubmitHandler);

// Modal Image Click Events
closeCardImageButton.addEventListener('click', () => {
  toggleModal(imageModalWindow);
});


// Initial Cards Array
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];


// Card Template and List Declaration
const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
const list = document.querySelector('.elements__list');

// Create Card
function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardText = cardElement.querySelector('.card__text');
  const cardImage = cardElement.querySelector('.card__image');

  cardText.textContent = data.name;
  cardImage.src = data.link;

  cardImage.addEventListener('click', () => {
    const modalImage = imageModalWindow.querySelector('.modal__image');
    const modalImageTitle = imageModalWindow.querySelector('.modal__image-title');

    modalImage.src = data.link;
    modalImageTitle.textContent = data.name;

    toggleModal(imageModalWindow);
  });

  // Card Like Button
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  function toggleHeart(e) {
    e.target.classList.toggle('card__like-button_active');
  };

  cardLikeButton.addEventListener('click', toggleHeart);

  // Card Delete Button
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  function deleteCard() {
    list.removeChild(cardElement);
  }

  cardDeleteButton.addEventListener('click', deleteCard);

  return cardElement;
};

function renderCard(data) {
  list.prepend(createCard(data));
};

// Initial Cards Data
initialCards.forEach(cardsData => {
  renderCard(cardsData);
});

// Modal Add Card Click Events
addCardButton.addEventListener('click', () => {
  toggleModal(addCardModal);
});

closeAddCardFormButton.addEventListener('click', () => {
  toggleModal(addCardModal);
});

// Add Card Submit Handler
function addCardSubmitHandler(e) {
  e.preventDefault();
  renderCard({name: inputTitle.value, link: inputUrl.value});
  toggleModal(addCardModal);
};

AddCardForm.addEventListener('submit', addCardSubmitHandler);