import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }, dataGetter = null) { //handleFormSubmit - это то, что происходит при сабмите конкретной формы
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
        this._form = this._popup.querySelector('.popup__form')
        this._inputList = Array.from(this._form.querySelectorAll('.popup__input'))
        this._getData = dataGetter
    }

    getInputValues() {
        this._formValues = {}
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value
        }
        )
        return this._formValues
    }

    setEventListeners = () => {

        super.setEventListeners() // обращаемся к методу класса popup, добавляем слушатель на крестик

        this._form.addEventListener('submit', (evt) => {

            evt.preventDefault() //отмена стандартного поведения при сабмите

            this._handleFormSubmit(this.getInputValues()) // отправляем в функцию сабмита собранные в инпутах данные

        })
    }

    close() {
        this._inputList.forEach(item => {
            item.value = ""
        })
        super.close()
    }

    setTextSubmitButton(text) {
        this._submitButton = this._form.querySelector('.popup__submit-button')
        this._submitButton.textContent = text
    }

}

export { PopupWithForm }
