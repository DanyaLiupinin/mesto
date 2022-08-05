//картинки из html

const avatar = new URL ('../../images/avatar.jpg', import.meta.url)
const closeButton = new URL ('../../images/close-button.svg', import.meta.url)
const deleteButton = new URL ('../../images/delete-button.svg', import.meta.url)
const headerLogo = new URL ('../../images/header__logo.svg', import.meta.url)
const likeActive = new URL ('../../images/like_active.svg', import.meta.url)
const like = new URL ('../../images/like.svg', import.meta.url)
const plus = new URL ('../../images/plus.svg', import.meta.url)
const addButtonAddaptive = new URL ('../../images/profile__add-button-addaptive.svg', import.meta.url)
const addButton = new URL ('../../images/profile__add-button.svg', import.meta.url)
const editButton = new URL ('../../images/profile__editbutton.svg', import.meta.url)

const pictures = [
{name: 'avatar', link: avatar},
{name: 'closeButton', link: closeButton},
{name: 'deleteButton', link: deleteButton},
{name: 'headerLogo', link: headerLogo},
{name: 'likeActive', link: likeActive},
{name: 'like', link: like},
{name: 'plus', link: plus},
{name: 'addButtonAddaptive', link: addButtonAddaptive},
{name: 'addButton', link: addButton},
{name: 'editButton', link: editButton}
]

// конфиг для валидации 

export const validateConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    activeButtonClass: 'popup__submit-button_active', 
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_activated'
  }

  //

export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');

//const popups = document.querySelectorAll('.popup')
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
//export const popupPhoto = document.querySelector('.popup_type_photo');

//const photo = popupPhoto.querySelector('.popup__photo')
//const photoTitle = popupPhoto.querySelector('.popup__description')

//const buttonsClose = document.querySelectorAll('.popup__close-button');

//const profileName = document.querySelector('.profile__title');
//const profileDescription = document.querySelector('.profile__description');
export const inputName = document.querySelector('.popup__input_content_name');
export const inputDescription = document.querySelector('.popup__input_content_description');

export const formAddCard = popupAdd.querySelector('.popup__form_type_add');
//const inputCardName = formAddCard.querySelector('.popup__input_content_place');
//const inputLink = formAddCard.querySelector('.popup__input_content_link');

export const formProfile = popupEdit.querySelector('.popup__form_type_edit');

export const cardsContainer = document.querySelector('.elements');


// массив карточек в профиле // 

export const cards = [
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