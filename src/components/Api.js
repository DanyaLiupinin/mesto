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

editUserInfo(data) {
  return fetch (`${this._url}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
  .then((res) => {
    return res.json()
  })
}

addCard (card) {
  return fetch(`${this._url}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then ((res) => {
    return res.json()
  })
}

}







export { Api }