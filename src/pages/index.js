import {
  validateConfig,
  buttonEditProfile,
  buttonAddCard,
  buttonEditAvatar,
  inputName,
  inputDescription,
  formAddCard,
  formProfile,
  formAvatar
} from "../utils/constants.js";
import "./index.css";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupConfirm } from "../components/PopupConfirm.js";

//import { get } from 'core-js/core/dict'

// экземпляр валидатора

const validatorFormAddCard = new FormValidator(validateConfig, formAddCard);
const validatorFormProfile = new FormValidator(validateConfig, formProfile);
const validatorFormAvatar = new FormValidator(validateConfig, formAvatar)

// создание экземпляра userInfo

const userInfo = new UserInfo({
  userNameSelector: ".profile__title", // h1 имя пользователя
  userInfoSelector: ".profile__description", //  p описание пользователя
  avatarSelector: ".profile__avatar"
});

// экземпляр попапа редактирования аватара

const popupAvatarEdit = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: editAvatarHandler
})

function editAvatarHandler () {
  api.updateAvatar(popupAvatarEdit.inputValue())
  .then((res) => {
    console.log(res) // удалить консоль лог
    userInfo.setUserInfo(res)
    popupAvatarEdit.close()
  })
}

popupAvatarEdit.setEventListeners()

buttonEditAvatar.addEventListener('click', openPopupAvatar)

function openPopupAvatar () {
  validatorFormAvatar.prevalidateForm()
  popupAvatarEdit.open()
}

// экземпляр попапа для редактрирования данных

const popupUserEdit = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  handleFormSubmit: editUserInfoHandler
});

popupUserEdit.setEventListeners();

// сохранение новых данных о пользователе

function editUserInfoHandler() {
  api.editUserInfo(popupUserEdit.inputValue()).then((data) => {
    userInfo.setUserInfo(data);
  });
}

// открытие попапа type_edit

buttonEditProfile.addEventListener("click", openPopupEdit);

function openPopupEdit() {
  const { name, info } = userInfo.getUserInfo(); // собираем данные с шапки страницы чтобы вставить в инпуты попапа
  inputName.value = name; // вставляем в инпуты попапа
  inputDescription.value = info;
  validatorFormProfile.prevalidateForm(); // при открытии очищаем форму и настраиваем состояние кнопки
  popupUserEdit.open(); // popupUserEdit - это экземпляр класса PopupWithForm //
}

// экземпляр попапа откытой карточки

const popupWithImage = new PopupWithImage(".popup_type_photo");

popupWithImage.setEventListeners();

// экземпляр попапа для добавления карточек

const popupCardAdd = new PopupWithForm({
  popupSelector: ".popup_type_add",
  handleFormSubmit: addCardHandler,
});

popupCardAdd.setEventListeners();

// открытие попапа для добавления карточек

buttonAddCard.addEventListener("click", openPopupAddCard);

function openPopupAddCard() {
  popupCardAdd.open();
  validatorFormAddCard.prevalidateForm();
}

// добавление исходных карточек на страницу с помощью класса section

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".elements"
);

// функция создания карточки

function createCard(item) {
  const newCard = new Card(item, userId, "#card-template", {
    handleCardClick: () => {
      popupWithImage.open(item);
    },

    handleCardLike: (card) => {
      if (!card.isLiked()) {
        card.like();
        api
          .putLike(item._id)
          .then((data) => {
            card.setLikesInfo(data);
          })
          .then(() => {
            card.renderLikes();
          });
      } else {
        card.dislike();
        api
          .deleteLike(item._id)
          .then((data) => {
            card.setLikesInfo(data);
          })
          .then(() => {
            card.renderLikes();
          });
      }
    },

    handleCardDelete: popupDeleteCard,
  });
  const cardElement = newCard.generateCard();
  return cardElement;
}

// подтверждение удаления карточки

const popupDeleteCard = new PopupConfirm(
  ".popup_type_delete",
  cardDeleteHandler
);
popupDeleteCard.setEventListeners();

function cardDeleteHandler(card) {
  const cardId = card.getCardId();

  api.deleteCard(cardId).then(() => {
    card.delete();
    popupDeleteCard.close();
  });
}

// включение валидации //

validatorFormAddCard.enableValidation();
validatorFormProfile.enableValidation();
validatorFormAvatar.enableValidation();

// создание api

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-49",
  headers: {
    authorization: "4e56a87c-a650-4149-b8f7-d810c12124b9",
    "Content-Type": "application/json",
  },
});

// изначальные карточки

api
  .getInitialCards()
  .then((cards) => {
    cardList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

// данные о пользователе
let userId = null;

api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
    userId = data._id;
  })
  .catch((err) => {
    console.log(err);
  });

// новая карточка

function addCardHandler(card) {
  api.addCard(card).then((item) => {
    cardList.addItem(createCard(item));
  });
}

// TODO исправить верстку