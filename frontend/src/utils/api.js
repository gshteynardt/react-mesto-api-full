import {token} from "./token";

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleOriginal(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getHeaders(name) {
    const current_token = token.get(name);

    return {
      ...this._headers,
      'Authorization': `Bearer ${current_token}`,
    }
  }

  _getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this.getHeaders('mesto'),
    })
      .then((res) => this._handleOriginal(res));
  }

  _getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this.getHeaders('mesto'),
    })
      .then((res) => this._handleOriginal(res));
  }

  getAppInfo() {
    return Promise.all([this._getInitialCards(), this._getUserInfo()]);
  }

  createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this.getHeaders('mesto'),
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => this._handleOriginal(res));
  }

  deleteCard(CardId) {
    return fetch(`${this._baseUrl}/cards/${CardId}`, {
      method: 'DELETE',
      headers: this.getHeaders('mesto'),
    })
      .then((res) => this._handleOriginal(res));
  }

  editUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.getHeaders('mesto'),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => this._handleOriginal(res));
  }

  changeUserPicture(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.getHeaders('mesto'),
      body: JSON.stringify(avatar),
    })
      .then((res) => this._handleOriginal(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this.getHeaders('mesto'),
    })
      .then((res) => this._handleOriginal(res));
  }
}

const api = new Api({
  baseUrl: `http://localhost:3000`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
