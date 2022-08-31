import {
  cards,
  validateConfig,
  buttonEditProfile,
  buttonAddCard,
  inputName, 
  inputDescription,
  formAddCard,
  formProfile
} from '../utils/constants.js'
import './index.css'
import { Card } from '../components/Card.js' 
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js'

//import { get } from 'core-js/core/dict'


// экземпляр валидатора 

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
  handleFormSubmit: editUserInfoHandler
})

popupUserEdit.setEventListeners()

 // открытие попапа type_edit 

 buttonEditProfile.addEventListener('click', openPopupEdit)

 function openPopupEdit () {
  const {name, info} = userInfo.getUserInfo()   // собираем данные с шапки страницы чтобы вставить в инпуты попапа
  inputName.value = name          // вставляем в инпуты попапа
  inputDescription.value = info  // исправить инфо на дэскрипшн
  validatorFormProfile.prevalidateForm()       // при открытии очищаем форму и настраиваем состояние кнопки
  popupUserEdit.open() // popupUserEdit - это экземпляр класса PopupWithForm // 
 }

// экземпляр попапа откытой карточки

const popupWithImage = new PopupWithImage ('.popup_type_photo')
popupWithImage.setEventListeners()

// экземпляр попапа для добавления карточек 

const popupCardAdd = new PopupWithForm ({
  popupSelector: '.popup_type_add', 
  handleFormSubmit: (item) => {
    cardList.addItem(createCard(item))  
  }
}) 

popupCardAdd.setEventListeners()


// открытие попапа для добавления карточек 

buttonAddCard.addEventListener('click', openPopupAddCard)

function openPopupAddCard () {
  popupCardAdd.open()
  validatorFormAddCard.prevalidateForm()
}


// добавление исходных карточек на страницу с помощью класса section

const cardList = new Section ({
  renderer: (item) => {
    cardList.addItem(createCard(item))                               
  }
},
'.elements'
)

/*cardList.renderItems (cards)*/ // массив начальных картчоек 

// функция создания карточки 

function createCard (item) {
  const newCard = new Card ( 
    item,   
    '#card-template',
    () => {
      popupWithImage.open(item)
    }
  )
  const cardElement = newCard.generateCard()
  return cardElement
}


// включение валидации //

validatorFormAddCard.enableValidation()
validatorFormProfile.enableValidation()

//



const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: '4e56a87c-a650-4149-b8f7-d810c12124b9',
    'Content-Type': 'application/json'
  }
}); 

api.getInitialCards()
.then((cards) => {
  cardList.renderItems(cards)
})
.catch((err) => {
  console.log(err)
})


api.getUserInfo()
.then((data) => {
  userInfo.setUserInfo(data)
})
.catch((err) => {
  console.log(err)
})



function editUserInfoHandler() {
  api.editUserInfo(popupUserEdit.inputValue())
  .then((data) => {
    userInfo.setUserInfo(data)
  })
}