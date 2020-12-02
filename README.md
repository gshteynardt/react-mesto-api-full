# Mesto

[Ссылка напроект](https://artmesto.students.nomoredomains.monster/)

Интерактивный сайт, можете добавлять ссылки на свои картинки, ставить like картинкам других пользователей

### Teхнологии

* React
* JS
* node.js
* Express
* Webpack
* Mongoose
* CSS Flexbox
* CSS Grid Layout
* RestApi
* JWT

### Installation

# Frontend
требуется [Node.js](https://nodejs.org/) v12+ to run.

Запуск и сборка проекта.

```sh
$ npm install
$ npm run start
$ npm run build
```

# Backend
требуется [Node.js](https://nodejs.org/) v12+ to run.

Запуск проекта и запуск проекта с hot-reload.

```sh
$ npm install
$ npm run start
$ npm run dev
```

# Routes and methods:
Api доступно по https://api.artmesto.students.nomoredomains.monster

* post: '/signup' - регистрация
  
  body: {
  email: required,
  password: required, min5,
  name: min(2), max(30),
  about: min(2).max(30),
  avatar: url,
  }


* post: '/signin' - авторизация
  
  body: {
  email: required,
  password: required, min5,
  }


* get: '/users' - получить всех пользователей
  
  headers:
  Content-Type: application/json,
  Authorization: Bearer access_token


* get: '/users/me' - получить одного пользователя
  
  headers:
  Content-Type: application/json,
  Authorization: Bearer access_token


* patch: '/users/me' - изменение информации о пользователе
  
  headers:
  Content-Type: application/json,
  Authorization: Bearer access_token
  body: {
  name: required, min(2), max(30),
  about: required, min(2).max(30),
  avatar: required, url,
  }


* patch:'/users/me/avatar'
  
  headers:
  Content-Type: application/json,
  Authorization: Bearer access_token
  body: {
  avatar: required, url,
  }


* get:'/cards' - получить все карточки
  
  headers:
  Content-Type: application/json,
  Authorization: Bearer access_token


* get:'/cards/{:id}' - получить одну карточку
  
  headers:
  Content-Type: application/json,
  Authorization: Bearer access_token


* delete:'/cards/{:id}' - удалить одну карточку
  
  headers:
  Content-Type: application/json,
  Authorization: Bearer access_token


* put:'/cards/{:id}/likes' - поставить like карточке
  
  headers:
  Content-Type: application/json,
  Authorization: Bearer access_token


* delete:'/cards/{:id}/likes' - удалить like карточке
  
  headers:
  Content-Type: application/json,
  Authorization: Bearer access_token
