import { Card } from './Card.js' 
import { FormValidator } from './FormValidator.js'

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
//const photoTitle = popupPhoto.querySelector('.popup__description')

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


/* функция открытия попапов */

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

 /* открытие попапа type_edit */

buttonEditProfile.addEventListener('click', function () {
  openPopup (popupEdit);

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  validatorFormProfile.prevalidation ()
});

/* открытие попапа type_add */

buttonAddCard.addEventListener('click', function () {
  
  openPopup (popupAdd);

  inputCardName.value = ''
  inputLink.value = ''

  validatorFormAddCard.prevalidation ()
  
});

/* сохранение данных из попапа type_edit */

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
     name: 'Северное море',
     link: './images/element5.jpg'
   },
   {
     name: 'Балтийское море',
     link: './images/element6.jpg'
   },
   {
     name: 'Средиземное море',
     link: './images/element4.jpg'
   },
   {
     name: 'Мраморное море',
     link: './images/element2.jpg'
   },
   {
     name: 'Море Саву',
     link: './images/element3.jpg'
   },
   {
     name: 'Красное море',
     link: './images/element1.jpg'
   }
 ]; 

/* открытие попапа type_photo */

function openPhoto (link, name) {
  openPopup (popupPhoto);
  photo.src = link
  photo.alt = name
}

/* добавление новых карточек */


formAddCard.addEventListener('submit', addCard)

function addCard (event) {
  
  event.preventDefault()
  
    const card = new Card ({ name: inputCardName.value, link: inputLink.value }, '#card-template');
    const cardElement = card.generateCard()
    cardsContainer.prepend(cardElement)

    closePopup(popupAdd);

    formAddCard.reset()
}

////////////////

// закрытие через оверлей //

popups.forEach((popup) => {
  popup.addEventListener('click', function (evt) {
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

// добавление карточек на страницу 

cards.forEach((item) => {
 
  const card = new Card (item, '#card-template')

  const cardElement = card.generateCard()

  cardsContainer.prepend(cardElement)

})

validatorFormAddCard.enableValidation()
validatorFormProfile.enableValidation()


export { cards, cardsContainer, openPhoto }

