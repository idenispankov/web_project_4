import Popup from './Popup.js'; 
 
export default class PopupWithForm extends Popup { 
  constructor(popupSelector, handleSubmit) { 
    super(popupSelector); 
 
    this._handleSubmit = handleSubmit; 
    this._inputs = this._popupItem.querySelectorAll('.form__input'); 
    this._submit = this._popupItem.querySelectorAll('.form__button_type_save');
    this._submitText = this._submit.textContent;
  } 
 
  _getInputsValue() { 
    this._inputsValue = Array.from(this._inputs); 
    this._formValues = {}; 
    this._inputsValue.forEach((input) => { 
      this._formValues[input.name] = input.value; 
    }); 
    return this._formValues; 
  } 
 
  open(cardId, card) {
    if(this._popupItem.classList.contains('modal_type_delete-card')) {
      this.cardId = cardId;
      this.card = card;
    }
    super.open();
  }

  close() {
    super.close();
    setTimeout(() => {
      this._submitText = this._submit.textContent;
    }, 200)
  }

  saving() {
    this._submit.textContent = 'Saving...';
  }


  setEventListeners() {
    this._popupItem.addEventListener('submit', (e) => {
      e.preventDefault();
      if(this._popupItem.classList.contains('modal_type_delete-card')) {
        this._handleSubmit(this.cardId, this.card);
      } else {
        this._handleSubmit(this._getInputsValue());
      }
    });
    super.setEventListeners();
  }
}