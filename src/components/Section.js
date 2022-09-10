class Section {

    constructor({ renderer }, containerSelector) {

        this._renderer = renderer // функция отрисовки элементов 

        this._container = document.querySelector(containerSelector)
    }

    renderItems(items) { // отрисовываем карточки 
        items.forEach(item => {
            this._renderer(item)
        })
    }


    addItem(element) { // добавляем на страницу
        this._container.prepend(element)
    }

}

export { Section }

