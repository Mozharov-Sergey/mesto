export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET', // GET - дефолтный метод отправки. Можно было и не указывать.
      headers: this._headers,
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      Promise.reject(console.log(`Что-то пошло не так с запросом к странице ${this._baseUrl}/cards`));
    });
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      Promise.reject(console.log(`Что-то пошло не так с запросом к странице ${this._baseUrl}/users/me`));
    });
  }

  changeUserData(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
  }

  changeUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        Promise.reject(
          console.log(
            `Что-то пошло не так с запросом к странице ${this._baseUrl}/users/me/avatar при попытке редактирования аватара профиля`
          )
        );
      }
    });
  }

  addCard(link, name) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        Promise.reject(
          console.log(
            `Что-то пошло не так с запросом к странице ${this._baseUrl}/cards при попытке добавить новую карточку`
          )
        );
      }
    });
  }

  deleteCard(cardId) {
    fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        Promise.reject(
          console.log(`Что-то пошло не так при попытке удалить карточку ${this.baseUrl}/cards/${cardId}`)
        );
      }
    });
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        Promise.reject(
          console.log(
            `Что-то пошло не так при попытке лайкнуть карточку ${this.baseUrl}/cards/${cardId}/likes`
          )
        );
      }
    });
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        Promise.reject(
          console.log(
            `Что-то пошло не так при попытке разлайкать карточку ${this.baseUrl}/cards/${cardId}/likes`
          )
        );
      }
    });
  }
}
