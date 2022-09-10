class FormValidator {

  constructor(validateConfig, formElement) {

    this._validateConfig = validateConfig
    this._formElement = formElement
    this._inputList = Array.from(formElement.querySelectorAll(validateConfig.inputSelector))
    this._buttonElement = formElement.querySelector(validateConfig.submitButtonSelector)
  }

  _hasInvalidInput() {

    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })

  }

  _showError(inputElement, errorMessage) {

    const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`)

    errorElement.textContent = errorMessage
    inputElement.classList.add(this._validateConfig.inputErrorClass)
    inputElement.nextElementSibling.classList.add(this._validateConfig.errorClass)
  }

  _hideError(inputElement) {

    const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`)

    errorElement.textContent = ''
    inputElement.classList.remove(this._validateConfig.inputErrorClass)
    inputElement.nextElementSibling.classList.remove(this._validateConfig.errorClass)

  }

  _isValid(inputElement) {

    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage)
    } else {
      this._hideError(inputElement)
    }

  }

  _toggleButtonState() {

    if (!this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._validateConfig.activeButtonClass)
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.remove(this._validateConfig.activeButtonClass)
    }

  }

  _setEventListeners() {

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)
        this._toggleButtonState()
      })
    })
  }

  enableValidation() {
    this._setEventListeners()
  }

  prevalidateForm() {

    this._inputList.forEach((inputElement) =>
      this._hideError(inputElement)
    )
    this._toggleButtonState()

  }
}

export { FormValidator }

