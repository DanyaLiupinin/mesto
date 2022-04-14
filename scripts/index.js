/*открытие закрытие попапа */

const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close-button');

/* функция добавляет и убирает класс popup_opened */
function popupOpen () {
   popup.classList.toggle('popup_opened');
}

 /* клик вызывает функцию popupOpen */
profileEditButton.addEventListener('click', popupOpen);

/* клик по крестику снова вызывает функцию popupOpen */
popupCloseButton.addEventListener('click', popupOpen);

/* при клике на всю область попапа вызывает функцию ниже */
popup.addEventListener('click', popupClickOverlay);

/* если клик по попапу (а не по детям), то срабатывает функция popupOpen; в ином случае ничего не происходит */
function popupClickOverlay (evt) {
   if (evt.target === evt.currentTarget) {
      popupOpen ();
   } else {
      return;
   }
}

/* сохранение данных в профиле */

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputName = popup.querySelector('.popup__input_name');
let inputDescription = popup.querySelector('.popup__input_description');
const saveProfileInfoButton = popup.querySelector('.popup__submit-button');

saveProfileInfoButton.addEventListener('click', saveProfileInfo);

function saveProfileInfo () {
   profileName.textContent = inputName.value;
   profileDescription.textContent = inputDescription.value;
   popupOpen ();
}