class Card {
  constructor(
    data,
    userId,
    selector,
    { handleCardClick, handleCardLike, handleCardDelete }
  ) {
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._likes = data.likes;
    this._template = selector;
    this._handleCardClick = handleCardClick; // логика открытия
    this._handleCardLike = handleCardLike;

    this._handleCardDelete = handleCardDelete;
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._photo = this._element.querySelector(".element__photo");
    this._elementLike = this._element.querySelector(".element__like-button");
    if (this.isLiked()) {
      this.like();
    }

    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;

    this._deleteButton = this._element.querySelector(".element__delete");
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }

    this._countLikes = this._element.querySelector(".element__like-amount");
    this.renderLikes(this._likes);

    this._setEventListeners();

    return this._element;
  }

  like() {
    this._elementLike.classList.add("element__like-button_active");
  }

  dislike() {
    this._elementLike.classList.remove("element__like-button_active");
  }

  delete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", () => {
        this._handleCardLike(this);
      });

    this._deleteButton.addEventListener("click", () => {
      this._handleCardDelete.open(this);
    });

    this._photo.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  getCardId() {
    return this._cardId;
  }

  setLikesInfo(data) {
    this._likes = data.likes;
  }

  renderLikes() {
    this._countLikes.textContent = this._likes.length;
  }
}

export { Card };
