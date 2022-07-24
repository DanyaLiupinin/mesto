class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._close = this._popup.querySelector('.popup__close-button')
    }

    open () {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
        this._popup.addEventListener('click', this.setEventListeners)
    }

    close () {
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose)
        this._popup.removeEventListener('click', this.setEventListeners)
    }

    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
          this.close() //.bind(this) ??
            }
    }

    setEventListeners () {
        this._close.addEventListener('click', this.close)
    }
}

export { Popup }