class Popup {
    constructor (popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._closeButton = this._popup.querySelector('.popup__close-button')
    }

    open () {
        this._popup.classList.add('popup_opened');                                  // открываем попап
        document.addEventListener('keydown', this._handleEscClose)                 // слушатель нажатия на esc; закрытие попапа
    }

    close () {
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscClose)           // снимаем слушатель esc после закрытия попапа
    }

    _handleEscClose = (evt) => {                 // закрытие на esc
        if (evt.key === 'Escape') {
          this.close() 
            }
    }

    _handleOverlayClose = (evt) => {            // закрытие на оверлей
        if (evt.target === evt.currentTarget) {
            this.close()
    }
    }

    setEventListeners() {                      // слушатель клика по крестику и закрытие попапа
        this._closeButton.addEventListener('click', () => {
            this.close()
        })
        this._popup.addEventListener('mousedown', this._handleOverlayClose)       // слушатель нажатия на оверлей; закрытие попапа
    }
}

export { Popup }