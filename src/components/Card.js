class Card {
   constructor (data, selector, handleCardClick) {
     this._name = data.name
     this._link = data.link
     this._template = selector
     this._handleCardClick = handleCardClick // логика открытия 
   }
 
   _getTemplate() {
     
     const cardElement = document
     .querySelector(this._template)
     .content
     .querySelector('.element')
     .cloneNode(true)
 
     return cardElement
   }
 
   generateCard() {
 
     this._element = this._getTemplate()
     this._photo = this._element.querySelector('.element__photo')
     this._elementLike = this._element.querySelector('.element__like')
 
     this._photo.src = this._link
     this._photo.alt = this._name
     this._element.querySelector('.element__title').textContent = this._name
     
 
     this._setEventListeners()
 
     return this._element
   }
 
   _like () {
 
     this._elementLike
     .classList
     .toggle('element__like_active')
   }
 
   _delete () {
     this._element
     .closest('.element')
     .remove()
   }
 
   _setEventListeners() {
 
     this._element.querySelector('.element__like').addEventListener('click', () => {
       this._like()
     })
 
     this._element.querySelector('.element__delete').addEventListener('click', () => {
       this._delete()
     })
 
     
     this._photo.addEventListener('click', () => {
       this._handleCardClick() 
     }) 
   }
 
 }

 export { Card }