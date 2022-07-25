import { Card } from './Card.js' 
import { FormValidator } from './FormValidator.js'
import { Section } from './Section.js'
import { Popup } from './Popup.js'

const validateConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  activeButtonClass: 'popup__submit-button_active', 
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_activated'
}

const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');

const popups = document.querySelectorAll('.popup')
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupPhoto = document.querySelector('.popup_type_photo');

const photo = popupPhoto.querySelector('.popup__photo')
const photoTitle = popupPhoto.querySelector('.popup__description')

const buttonsClose = document.querySelectorAll('.popup__close-button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_content_name');
const inputDescription = document.querySelector('.popup__input_content_description');

const formAddCard = popupAdd.querySelector('.popup__form_type_add');
const inputCardName = formAddCard.querySelector('.popup__input_content_place');
const inputLink = formAddCard.querySelector('.popup__input_content_link');

const formProfile = popupEdit.querySelector('.popup__form_type_edit');

const cardsContainer = document.querySelector('.elements');

 const validatorFormAddCard = new FormValidator (validateConfig, formAddCard)
 const validatorFormProfile = new FormValidator (validateConfig, formProfile)


// функция открытия попапов //

function openPopup (popupElement) {

  popupElement.classList.add('popup_opened');

  document.addEventListener('keydown', pressEscapeHandler)
}

// функция закрытия попапов //

function closePopup (popupElement) {

  popupElement.classList.remove('popup_opened')

  document.removeEventListener('keydown', pressEscapeHandler)
}


buttonsClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

 // открытие попапа type_edit 

buttonEditProfile.addEventListener('click', function () {
  openPopup (popupEdit); 

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  validatorFormProfile.prevalidateForm ()
});

// открытие попапа type_add 

buttonAddCard.addEventListener('click', function () {
  
  openPopup (popupAdd);

  inputCardName.value = ''
  inputLink.value = ''

  validatorFormAddCard.prevalidateForm ()
  
});


// экземпляр попапа для добавления карточек 

/*
const popupCardAdd = new PopupWithForm ({
  popupSelector: popupAdd, //или это уже конкретный элемент, а не просто селектор?
  handleFormSubmit: (formValues) => {
    const newCard = new Card ({}) // 33 минута продлёнки
  }
})
*/

// сохранение данных из попапа type_edit 

formProfile.addEventListener('submit', saveProfileInfo)

function saveProfileInfo (event) {

  event.preventDefault();

  profileName.textContent = inputName.value; 
  profileDescription.textContent = inputDescription.value; 

  closePopup(popupEdit);  
}


/* массив карточек в профиле */ 

const cards = [
   {
     name: 'я в шоколаде',
     link: './images/p6.jpg'
   },
   {
     name: 'грызу ногти',
     link: './images/p3.jpg'
   },
   {
     name: 'с пацанами',
     link: './images/p4.jpg'
   },
   {
     name: 'выношу мусор',
     link: './images/p5.jpg'
   },
   {
     name: 'с пёсей',
     link: './images/p2.jpg'
   },
   {
     name: 'я пчёл',
     link: './images/p1.jpg'
   }
 ]; 

/* открытие попапа type_photo */

function openPhoto (link, name) {
  openPopup (popupPhoto);

  photo.src = link
  photo.alt = name
  photoTitle.textContent = name
}

/* добавление новых карточек */


formAddCard.addEventListener('submit', addCard)

function addCard (event) {
  
  event.preventDefault()
  
    renderCard(createCard())

    closePopup(popupAdd);
}

function createCard () {
  const card = new Card ({ name: inputCardName.value, link: inputLink.value }, '#card-template');
  const cardElement = card.generateCard()
  return cardElement
}

function renderCard (cardElement) {
  cardsContainer.prepend(cardElement)
}

////////////////

// закрытие через оверлей //

popups.forEach((popup) => {
  popup.addEventListener('mousedown', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup)
   } else {
      return
   }
  })
})


// закрытие на escape // 

function pressEscapeHandler (evt) {
  
  if (evt.key === 'Escape') {

  const popup = document.querySelector('.popup_opened')

   closePopup (popup) 
  }
}

// добавление исходных карточек на страницу 

const cardList = new Section ({

  data: cards,
  renderer: (item) => {

    const card = new Card (item, '#card-template', openPhoto)
    const cardElement = card.generateCard()
    cardList.addItem(cardElement)

  }
},
cardsContainer
)

cardList.renderItems ()

// включение валидации //

validatorFormAddCard.enableValidation()
validatorFormProfile.enableValidation()


export { cards, cardsContainer, openPhoto }

