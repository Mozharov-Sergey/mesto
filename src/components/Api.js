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
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        Promise.reject(
          console.log(
            `Что-то пошло не так с запросом к странице ${this._baseUrl}/users/me при попытке редактирования профиля`
          )
        );
      }
    });
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

  deleteCard(id) {
    fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  likeCard() {}

  unlikeCard() {}
}
