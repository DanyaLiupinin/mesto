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
  
  const inputList = Array.from(formProfile.querySelectorAll('.popup__input'))
  const submitButton = formProfile.querySelector('.popup__submit-button')

  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;

  toggleButtonState (inputList, submitButton, validateConfig)
});

/* открытие попапа type_add */

buttonAddCard.addEventListener('click', function () {
  
  openPopup (popupAdd);

  const inputList = Array.from(formAddCard.querySelectorAll('.popup__input'))
  const submitButton = formAddCard.querySelector('.popup__submit-button')

  inputCardName.value = ''
  inputLink.value = ''

  toggleButtonState (inputList, submitButton, validateConfig) 
  
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

 /* тэмплэйт */

 const cardTemplate = document.querySelector('#card-template').content.querySelector('.element')

 /* контейнер с карточками */

 const cardsContainer = document.querySelector('.elements');

 /* удаление карточки */

 function deleteCard (evt) {
  evt.target.closest('.element').remove();
 }

/* лайк */ 

function likeCard (event) {
  event.target.classList.toggle('element__like_active');
}

/* открытие попапа type_photo */

function openPhoto (event) {
  openPopup (popupPhoto);
  photo.src = event.currentTarget.src 
  const card = event.target.closest('.element')
  photoTitle.textContent = card.textContent
  photo.alt = card.textContent
}

 /* генерация карточек */

 function generateCard (card) {
  const newCard = cardTemplate.cloneNode(true);

  const newCardTitle = newCard.querySelector('.element__title');
  const newCardPhoto = newCard.querySelector('.element__photo');

  newCardTitle.textContent = card.name
  newCardPhoto.src = card.link
  newCardPhoto.alt = card.name

  const deleteCardButton = newCard.querySelector('.element__delete');
  deleteCardButton.addEventListener('click', deleteCard);

  const likeCardButton = newCard.querySelector('.element__like')
  likeCardButton.addEventListener('click', likeCard)
  
  newCardPhoto.addEventListener('click', openPhoto)

  return newCard
 }

/* отрисовка карточек на странице */

function renderCard (card) {
  cardsContainer.prepend(generateCard(card))  
}

  cards.forEach(renderCard)

/* добавление новых карточек */


formAddCard.addEventListener('submit', addCard)

function addCard (event) {
  
  event.preventDefault()
  
    renderCard ({ name: inputCardName.value, link: inputLink.value });

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



