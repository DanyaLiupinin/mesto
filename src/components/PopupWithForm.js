import { Popup } from './Popup.js'

class PopupWithForm extends Popup {
    constructor ({ popupSelector, handleFormSubmit }, dataGetter = null) { //handleFormSubmit - это то, что происходит при сабмите конкретной формы
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._form = this._popup.querySelector('.popup__form')
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'))
    this._getData = dataGetter
    }

    _getInputValues () {
        this._formValues = {}
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value 
        }
    )
    return this._formValues
    }

    inputValue () {
        return this._getInputValues()
    }

    setEventListeners = () => {

        super.setEventListeners() // обращаемся к методу класса popup, добавляем слушатель на крестик

        this._form.addEventListener('submit', (evt) => {

            evt.preventDefault() //отмена стандартного поведения при сабмите

             this._handleFormSubmit(this._getInputValues()) // отправляем в функцию сабмита собранные в инпутах данные

            this.close() //закрытие после сабмита  
        }) 
    }

    close () {
        this._inputList.forEach(item => {
            item.value = ""
        })
        super.close()
    }


}

export { PopupWithForm }
