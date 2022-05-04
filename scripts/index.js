const profileEditButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const photoPopup = document.querySelector('.popup_type_photo');
const editPopupCloseButton = editPopup.querySelector('.popup__close-button_type_edit');
const addPopupCloseButton = addPopup.querySelector('.popup__close-button_type_add');
const photoPopupCloseButton = photoPopup.querySelector('.popup__close-button_type_photo')

let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__description');
let inputName = popup.querySelector('.popup__input_content_name');
let inputDescription = popup.querySelector('.popup__input_content_description');


/* функция открытия закрытия попапов */

function popupOpen (popupElement) {
  popupElement.classList.add('popup_opened');
}

function popupClose (popupElement) {
  popupElement.classList.remove('popup_opened');
}



 /* открытие попапа type_edit */

profileEditButton.addEventListener('click', function () {
  popupOpen(editPopup);
  if (editPopup.classList.contains('popup_opened')) {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
 }
});

/* открытия попапа type_add */

addButton.addEventListener('click', function () {
  popupOpen(addPopup);
});


/* закрытие попапа type_edit */

editPopupCloseButton.addEventListener('click', () => {
  popupClose(editPopup);
});

/* закрытие попапа type_add */

addPopupCloseButton.addEventListener('click', () => {
  popupClose(addPopup);
});


/* сохранение данных из попапа type_edit */

const profileForm = editPopup.querySelector('.popup__form_type_edit');

profileForm.addEventListener('submit', (form) => {
    form.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    popupClose(editPopup);
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
  popupOpen(photoPopup);

  const photo = photoPopup.querySelector('.popup__photo')
  photo.src = event.currentTarget.src


  const photoTitle = photoPopup.querySelector('.popup__description')
  const card = event.target.closest('.element')
  photoTitle.textContent = card.textContent

}

/* закрытие попапа type_photo */

photoPopupCloseButton.addEventListener('click', () => {
  popupClose(photoPopup);
})

 /* генерация карточек */

 function generateCard (card) {
  const newCard = cardTemplate.cloneNode(true);

  const newCardTitle = newCard.querySelector('.element__title');
  const newCardPhoto = newCard.querySelector('.element__photo');

  newCardTitle.textContent = card.name
  newCardPhoto.src = card.link
  newCardPhoto.alt = `тут должно быть ${card.name}`

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

 cards.forEach((card) => {
   renderCard(card);
 })

/* добавление новых карточек */

const addCardForm = addPopup.querySelector('.popup__form_type_add');
const inputCardName = addCardForm.querySelector('.popup__input_content_place');
const inputLink = addCardForm.querySelector('.popup__input_content_link');

function addCard (event) {

  event.preventDefault();

  if ( inputCardName.value === '' || inputLink.value === '' ) { 
    return
  } else {

    renderCard ({ name: inputCardName.value, link: inputLink.value });

    popupClose(addPopup);

    inputCardName.value = ''
    inputLink.value = ''
  }
}

addCardForm.addEventListener ('submit', addCard);



/*
// при клике на всю область попапа вызывает функцию ниже //
popup.addEventListener('click', popupClickOverlay);

// если клик по попапу (а не по детям), то срабатывает функция popupOpen; в ином случае ничего не происходит //
function popupClickOverlay (evt) {
   if (evt.target === evt.currentTarget) {
      popupOpen ();
   } else {
      return;
   }
}
*/

