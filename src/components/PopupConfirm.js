import { Popup } from './Popup.js'

class PopupConfirm extends Popup {
    constructor (popupSelector, cardDeleteHandler) {
        super(popupSelector)
        this._cardDeleteHandler = cardDeleteHandler
        this._submitButton = this._popup.querySelector('.popup__close-button_type_delete')
        this._form = this._popup.querySelector('.popup__form')
    }

    setEventListeners () {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._cardDeleteHandler(this._card)
        })
        super.setEventListeners()
    }

    open(card) {
        this._card = card
        super.open()
    }

}

export { PopupConfirm }

