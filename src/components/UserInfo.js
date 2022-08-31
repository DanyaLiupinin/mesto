class UserInfo {
    constructor ({ userNameSelector, userInfoSelector }) {
        this._userName = document.querySelector(userNameSelector)
        this._userInfo = document.querySelector(userInfoSelector)
        
    }

    // собирем инфу со страницы для добавления в инпуты

    getUserInfo () {
        const user = {}
        user.name = this._userName.textContent // в user.name записываем стандартное имя пользователя
        user.info = this._userInfo.textContent // в user.info записываем стандартное описание пользователя 

        return user
    }

    // собираем инфу с инпутов для добавления на страницу

    setUserInfo (userData) {
        this._userName.textContent = userData.name
        this._userInfo.textContent = userData.about
    }
}

export { UserInfo }