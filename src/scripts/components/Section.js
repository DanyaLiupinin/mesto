class Section {

    constructor ({data, renderer}, containerSelector) {

        this._initialArray = data // исходный массив с карточками
        this._renderer = renderer // функция отрисовки элементов 

        this._container = containerSelector
    }
 
    renderItems () { // отрисовываем карточки 
    this._initialArray.forEach(item => {
    this._renderer (item) 
    })
    }

    
    addItem (element) { // добавляем на страницу
        this._container.prepend(element)
    }
    
}

export { Section }

