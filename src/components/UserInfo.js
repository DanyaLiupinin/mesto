class UserInfo {
    constructor({ userNameSelector, userInfoSelector, avatarSelector }) {
        this._userName = document.querySelector(userNameSelector)
        this._userInfo = document.querySelector(userInfoSelector)
        this._avatar = document.querySelector(avatarSelector)
    }

    // собирем инфу со страницы для добавления в инпуты

    getUserInfo() {
        const user = {}
        user.name = this._userName.textContent // в user.name записываем стандартное имя пользователя
        user.info = this._userInfo.textContent // в user.info записываем стандартное описание пользователя 

        return user
    }

    // собираем инфу с инпутов для добавления на страницу

    setUserInfo(userData) {
        if (userData) {
            this._userName.textContent = userData.name
            this._userInfo.textContent = userData.about
            this._avatar.src = userData.avatar
        }
    }
}

export { UserInfo }
