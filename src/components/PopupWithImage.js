import { Popup } from './Popup.js'

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupImage = this._popup.querySelector('.popup__photo')
        this._descriptionImage = this._popup.querySelector('.popup__description')
    }

    open({ name, link }) {
        this._popupImage.src = link
        this._popupImage.alt = name
        this._descriptionImage.textContent = name
        super.open()
    }
}

export { PopupWithImage }