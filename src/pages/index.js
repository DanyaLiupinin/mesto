import {
  cards,
  validateConfig,
  buttonEditProfile,
  buttonAddCard,
  inputName, 
  inputDescription,
  formAddCard,
  formProfile,
  cardsContainer,
} from '../scripts/utils/constants.js'
import './index.css'
import { Card } from '../scripts/components/Card.js' 
import { FormValidator } from '../scripts/components/FormValidator.js'
import { Section } from '../scripts/components/Section.js'
import { PopupWithForm } from '../scripts/components/PopupWithForm.js'
import { PopupWithImage } from '../scripts/components/PopupWithImage.js'
import { UserInfo } from '../scripts/components/UserInfo.js'


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
