export default class Card { 
  constructor({data, handleCardClick, handleDeleteClick, handleLikeClick}, templateElementSelector) { 
    this._name = data.name; 
    this._link = data.link;
    this._id = data.id;
    this._owner = data.owner;
     
    this._templateElementSelector = templateElementSelector;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  } 

  // Private Getting Card Template Function 
  _getCardTemplate() { 
    return document
    .querySelector(this._templateElementSelector)
    .content
    .cloneNode(true);
  } 

  // Private Event Listeners Function 
  _setEventListeners() { 
    this._cardElements.cardLikeButton.addEventListener('click', this._toggleLikeButton.bind(this)); 

    
    this._cardElements.cardDeleteButton.addEventListener('click', () => {
      this._handleDeleteClick();
    }); 


    this._cardElements.cardImage.addEventListener('click', (data) => {
      this._handleCardClick({name: data.title, link: data.link});
    }); 
  } 
 
 
  // Private Like Button Function 
  _toggleLikeButton(e) { 
    e.target.classList.toggle('card__like-button_active'); 
  } 
 
  // Public Create Card Function 
  createCard(owner) { 
    this._card = this._getCardTemplate(); 
 
    const cardLikeButton = this._card.querySelector('.card__like-button'); 

    const cardDeleteButton = this._card.querySelector('.card__delete-button');
    // if(this._owner === owner) {
    //   cardDeleteButton.data = this._id;
    // } else {
    //   cardDeleteButton.remove()
    // }
    if(this._owner === owner) cardDeleteButton.data = this._id;
    else cardDeleteButton.remove();

    const cardImage = this._card.querySelector('.card__image'); 

    cardImage.id = this._id;
    cardImage.src = this._link; 
    cardImage.alt = this._name; 
 
    const cardText = this._card.querySelector('.card__text'); 
    cardText.textContent = this._name;
 
    this._cardElements = { 
      cardLikeButton, 
      cardDeleteButton, 
      cardImage 
    } 
    this._setEventListeners(); 
 
    return this._card; 
   } 

    // Private Delete Card Function 
  _deleteCard(e) { 
    e.target.parentNode.remove();
  } 
}  