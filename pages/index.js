// Modals
const editProfileModal = document.querySelector('.modal_type_edit-profile');
const addCardModal = document.querySelector('.modal_type_add-card');
const imageModal = document.querySelector('.modal_type_image');

// Open Buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// Close Buttons
const closeEditButton = editProfileModal.querySelector('.form__close-button');
const closeAddButton = addCardModal.querySelector('.form__close-button');

// Form Profile Block
const formProfile = document.querySelector('.form_type_profile');

const inputName = document.querySelector('.form__input_type_name');
const inputAbout = document.querySelector('.form__input_type_about');

const profileName = document.querySelector('.profile__text');
const profileAbout = document.querySelector('.profile__paragraph');


// Functions
function toggleModal(modal) {
  modal.classList.toggle('modal_is-open');

  if (editProfileModal.classList.contains('modal_is-open')) {
    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
  }
};

function submitPrevent(e) {
  e.preventDefault();

  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;

  toggleModal(editProfileModal);
};


// Buttons Events
editButton.addEventListener('click', () => {
  toggleModal(editProfileModal);
});

closeEditButton.addEventListener('click', () => {
  toggleModal(editProfileModal);
});

formProfile.addEventListener('submit', submitPrevent);

addButton.addEventListener('click', () => {
  toggleModal(addCardModal);
});

closeAddButton.addEventListener('click', () => {
  toggleModal(addCardModal);
});


// ////////////////////////////////////////////////////////////////////////////////


// Initial Cards
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

const cardTemplate = document.querySelector('.card-template').content.querySelector('.card');
const list = document.querySelector('.elements__list');


// Create Card
initialCards.forEach(data => {

  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardText = cardElement.querySelector('.card__text');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardCreateButton = addCardModal.querySelector('.form__create-button');

  cardText.textContent = data.name;
  cardImage.src = data.link;

  // Card Image
  cardImage.addEventListener('click', () => {
    
    const modalImage = imageModal.querySelector('.modal__image');
    const modalImageTitle = imageModal.querySelector('.modal__image-title');

    modalImage.src = data.link;
    modalImageTitle.textContent = data.name;

    toggleModal(imageModal);
  });

  // Card Create Function
  cardCreateButton.addEventListener('submit',() => {

    const inputTitle = addCardModal.querySelector('.form__input_type_card-text');
    const inputUrl = addCardModal.querySelector('.form__input_type_card-url');

    inputTitle.textContent = cardText.value;
    inputUrl.src = inputUrl.value;

    list.unshift(cardElement);

    toggleModal(addCardModal);
  });

  // Card Like Button
  function toggleHeart(e) {
    e.target.classList.toggle('card__like-button_active');
  };

  const likeButton = cardElement.querySelector('.card__like-button');

  likeButton.addEventListener('click', toggleHeart);

  // Card Delete Function
  cardDeleteButton.addEventListener('click', () => {
    list.removeChild(cardElement);
  });

  list.prepend(cardElement);
});