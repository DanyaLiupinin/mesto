const editProfileButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const photoPopup = document.querySelector('.popup_type_photo');
const editPopupCloseButton = editPopup.querySelector('.popup__close-button_type_edit');
const addPopupCloseButton = addPopup.querySelector('.popup__close-button_type_add');
const photoPopupCloseButton = photoPopup.querySelector('.popup__close-button_type_photo')
const photo = photoPopup.querySelector('.popup__photo')
const photoTitle = photoPopup.querySelector('.popup__description')

const closeButtons = document.querySelectorAll('.popup__close-button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_content_name');
const inputDescription = document.querySelector('.popup__input_content_description');

const addCardForm = addPopup.querySelector('.popup__form_type_add');
const inputCardName = addCardForm.querySelector('.popup__input_content_place');
const inputLink = addCardForm.querySelector('.popup__input_content_link');




/* функция открытия закрытия попапов */

function openPopup (popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup (popupElement) {
  popupElement.classList.remove('popup_opened');
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

 /* открытие попапа type_edit */

editProfileButton.addEventListener('click', function () {
  openPopup (editPopup);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

/* открытие попапа type_add */

addButton.addEventListener('click', function () {
  openPopup (addPopup);
});


/* сохранение данных из попапа type_edit */

const profileForm = editPopup.querySelector('.popup__form_type_edit');

profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(editPopup);
});

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
  openPopup (photoPopup);
  photo.src = event.currentTarget.src 
  const card = event.target.closest('.element')
  photoTitle.textContent = card.textContent

}

 /* генерация карточек */

 function generateCard (card) {
  const newCard = cardTemplate.cloneNode(true);

  const newCardTitle = newCard.querySelector('.element__title');
  const newCardPhoto = newCard.querySelector('.element__photo');

  newCardTitle.textContent = card.name
  newCardPhoto.src = card.link

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

function addCard (event) {

  event.preventDefault();

  if ( inputCardName.value === '' || inputLink.value === '' ) { 
    return
  } else {

    renderCard ({ name: inputCardName.value, link: inputLink.value });

    closePopup(addPopup);

    event.target.reset()
  }
}

addCardForm.addEventListener ('submit', addCard);




