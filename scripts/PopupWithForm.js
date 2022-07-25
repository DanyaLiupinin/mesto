class PopupWithForm extends Popup {
    constructor ({ popupSelector, handleFormSubmit }) { //handleFormSubmit - это то, что происходит при сабмите конкретной формы
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._form = this._popup.querySelector('.popup__form')
    }

    _getInputValues () {

        this._inputList = this._form.querySelectorAll('.popup__input') // 
        this._formValues = {}
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value // ??
        }
    )}

    setEventListeners () {
        super.setEventListeners() // обращаемся к методу класса popup, добавляем слушатель на крестик

        this._form.addEventListener('submit', (evt) => {
            evt.preventDeafault()

            this._handleFormSubmit(this._getInputValues()) 

            this._popup.close()
        })
    }


}