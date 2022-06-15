const validateConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__submit-button',
   activeButtonClass: 'popup__submit-button_active', 
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__input-error_activated'
 }
 
 
 /* слушатели сабмитов для всех форм */
 
 function enableValidation (validateConfig) {
 
   const formList = Array.from(document.querySelectorAll(validateConfig.formSelector))
 
   formList.forEach((formElement) => {
     formElement.addEventListener('submit', (evt) => {
       evt.preventDefault()
 
       if (formElement == profileForm) {
         saveProfileInfo(evt)
       } 
 
       if (formElement == addCardForm) {
         addCard (evt)
       }
     })
 
     setEventListeners(formElement, validateConfig)
 
   })
 }
 
 enableValidation(validateConfig)
 
 /* слушаетил инпутов всех форм */
 
 function setEventListeners (formElement, validateConfig) {
 
   const inputList = Array.from(formElement.querySelectorAll(validateConfig.inputSelector))
 
   const buttonElement = formElement.querySelector(validateConfig.submitButtonSelector)
   
   inputList.forEach((inputElement) => {
     inputElement.addEventListener('input', () => {
       isValid(formElement, inputElement, validateConfig)
       toggleButtonState(inputList, buttonElement, validateConfig); 
     })
   })
 }
 
 /* проверка на валидность */
 
 function isValid (formElement, inputElement, validateConfig) {
 
   if (!inputElement.validity.valid) {
     showError (formElement, inputElement, inputElement.validationMessage, validateConfig)
   } else {
     hideError (formElement, inputElement, validateConfig)
   }
 }
 
 /* проверка на наличие невалидного инпута */
 
 function hasInvalidInput (inputList) {
 
   return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
   })
 }; 
 
 /* состояние кнопки сабмита */
 
 function toggleButtonState (inputList, buttonElement, validateConfig) {
   if (!hasInvalidInput(inputList)) {
     buttonElement.classList.add(validateConfig.activeButtonClass)
     buttonElement.removeAttribute('disabled')
   } else {
     if (!buttonElement.hasAttribute('disabled')) {
     buttonElement.getAttribute('disabled') }
     buttonElement.classList.remove(validateConfig.activeButtonClass)
   }
 }
 
 // Показать ошибку //
 
 function showError (formElement, inputElement, errorMessage, validateConfig) {
 
   const errorElement = formElement.querySelector(`#error-${inputElement.id}`)
   errorElement.textContent = errorMessage
   inputElement.classList.add(validateConfig.inputErrorClass)
   inputElement.nextElementSibling.classList.add(validateConfig.errorClass)
 }
 
 // Скрыть ошибку //
 
 function hideError (formElement, inputElement, validateConfig) {
 
   const errorElement = formElement.querySelector(`#error-${inputElement.id}`)
   errorElement.textContent = ''
   inputElement.classList.remove(validateConfig.inputErrorClass)
   inputElement.nextElementSibling.classList.remove(validateConfig.errorClass)
 }