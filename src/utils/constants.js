//картинки из html

const closeButton = new URL ('../images/close-button.svg', import.meta.url)
const deleteButton = new URL ('../images/delete-button.svg', import.meta.url)
const headerLogo = new URL ('../images/header__logo.svg', import.meta.url)
const likeActive = new URL ('../images/like_active.svg', import.meta.url)
const like = new URL ('../images/like.svg', import.meta.url)
const plus = new URL ('../images/plus.svg', import.meta.url)
const addButtonAddaptive = new URL ('../images/profile__add-button-addaptive.svg', import.meta.url)
const addButton = new URL ('../images/profile__add-button.svg', import.meta.url)
const editButton = new URL ('../images/profile__editbutton.svg', import.meta.url)

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
export const buttonEditAvatar = document.querySelector('.profile__avatar-section')
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupAvatar = document.querySelector('.popup_type_avatar')
export const inputName = document.querySelector('.popup__input_content_name');
export const inputDescription = document.querySelector('.popup__input_content_description');
export const formAddCard = popupAdd.querySelector('.popup__form_type_add');
export const formProfile = popupEdit.querySelector('.popup__form_type_edit');
export const formAvatar = popupAvatar.querySelector('.popup__form_type_avatar')

