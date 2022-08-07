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
  handleFormSubmit: (userData) => {
    userInfo.setUserInfo (userData)
  }
})

popupUserEdit.setEventListeners()

 // открытие попапа type_edit 

 buttonEditProfile.addEventListener('click', openPopupEdit)

 function openPopupEdit () {
  validatorFormProfile.prevalidateForm()       // при открытии очищаем форму и настраиваем состояние кнопки
  const userValues = userInfo.getUserInfo()   // собираем данные с шапки страницы чтобы вставить в инпуты попапа
  inputName.value = userValues.name          // вставляем в инпуты попапа
  inputDescription.value = userValues.info  // исправить инфо на дэскрипшн
  popupUserEdit.open() // popupUserEdit - это экземпляр класса PopupWithForm // 
 }

// экземпляр попапа откытой карточки

const popupWithImage = new PopupWithImage ('.popup_type_photo')

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

  data: cards,
  renderer: (item) => {
    cardList.addItem(createCard(item))                               
  }
},
'.elements'
)

cardList.renderItems ()

// функция создания карточки 

function createCard (item) {
  const newCard = new Card ( 
    item,   
    '#card-template',
    () => {
      popupWithImage.setEventListeners()
      popupWithImage.open(item)
    }
  )
  const cardElement = newCard.generateCard()
  return cardElement
}


// включение валидации //

validatorFormAddCard.enableValidation()
validatorFormProfile.enableValidation()
