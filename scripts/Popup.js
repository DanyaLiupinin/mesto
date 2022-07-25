class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._close = this._popup.querySelector('.popup__close-button')
    }

    open () {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose)
        this._popup.addEventListener('mousedown', this._handleOverlayClose)
        this.setEventListeners() // так??

        /* this._popup.addEventListener('click', this.setEventListeners) */
    }

    close () {
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose)
        this._popup.removeEventListener('mousedown', this._handleOverlayClose)

        /* this._popup.removeEventListener('click', this.setEventListeners) */
    }

    _handleEscClose (evt) {
        if (evt.key === 'Escape') {
          this.close() //.bind(this) ??
            }
    }

    _handleOverlayClose (evt) {
        if (evt.target === evt.currentTarget) {
            this.close()
    }
    }

    setEventListeners () {
        this._close.addEventListener('click', this.close.bind(this))
    }
}

export { Popup }