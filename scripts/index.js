import { Card } from './Card.js' 
import { FormValidator } from './FormValidator.js'
import { Section } from './Section.js'
//import { Popup } from './Popup.js'
import { PopupWithForm } from './PopupWithForm.js'
import { PopupWithImage } from './PopupWithImage.js'
import { UserInfo } from './UserInfo.js'

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


// создание экземпляра userInfo 

const userInfo = new UserInfo ({
  userNameSelector: '.profile__title', // h1 имя пользователя
  userInfoSelector: '.profile__description' //  p описание пользователя 
})

// экземпляр попапа для редактрирования данных 

const popupUserEdit = new PopupWithForm ({
  popupSelector: '.popup_type_edit',  
  handleFormSubmit: (userData) => {
    userInfo.setUserInfo (userData)
  }
})

popupUserEdit.setEventListeners()

 // открытие попапа type_edit 

 buttonEditProfile.addEventListener('click', () => {
  
  validatorFormProfile.prevalidateForm()       // при открытии очищаем форму и настраиваем состояние кнопки
  const userValues = userInfo.getUserInfo()   // собираем данные с шапки страницы чтобы вставить в инпуты попапа
  inputName.value = userValues.name          // вставляем в инпуты попапа
  inputDescription.value = userValues.info  // исправить инфо на дэскрипшн

  popupUserEdit.open() // popupUserEdit - это экземпляр класса PopupWithForm // 
  
 })


// экземпляр попапа для добавления карточек 

const popupCardAdd = new PopupWithForm ({
  popupSelector: '.popup_type_add', 
  handleFormSubmit: (item) => {
    const newCard = new Card (  // картинки не открываются, в card 3 ий аргумент не такой какой здесь
    item,   
    '#card-template',
    () => {
      const popupWithImage = new PopupWithImage ('.popup_type_photo')
      popupWithImage.open({name: item.name, link: item.link})
    }
  )
  const cardElement = newCard.generateCard()
  cardList.addItem(cardElement)    
  }
}) 

popupCardAdd.setEventListeners()


// открытие попапа для добавления карточек 

buttonAddCard.addEventListener('click', () => {

  popupCardAdd.open()
  formAddCard.reset()
  validatorFormAddCard.prevalidateForm()

})



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

// добавление исходных карточек на страницу с помощью класса section

const cardList = new Section ({

  data: cards,
  renderer: (item) => {
  const newCard = new Card (  // картинки не открываются, в card 3 ий аргумент не такой какой здесь
    item,   
    '#card-template',
    () => {
      const popupWithImage = new PopupWithImage ('.popup_type_photo')
      popupWithImage.setEventListeners()
      popupWithImage.open({name: item.name, link: item.link})
    }
  )
    const cardElement = newCard.generateCard()
    cardList.addItem(cardElement)                               
  }
},
cardsContainer
)

cardList.renderItems ()

// включение валидации //

validatorFormAddCard.enableValidation()
validatorFormProfile.enableValidation()


export { cards, cardsContainer }

