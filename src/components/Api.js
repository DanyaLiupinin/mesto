class Api {
    constructor ({baseUrl, headers}) {
      this._url = baseUrl
      this._headers = headers
    }

getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
})
    .then((res) => {
  return res.json()
})
    }

getUserInfo() {
  return fetch(`${this._url}/users/me`, {
    method: 'GET',
    headers: this._headers
})
    .then((res) => {
    return res.json()
      })
}

//создать метод с res.json чтобы не повторять это в каждой функции



}







export { Api }