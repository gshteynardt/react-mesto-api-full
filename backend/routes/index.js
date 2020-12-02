const routers = require('express').Router();
const userRoutes = require('./users.js');
const cardsRoutes = require('./cards.js');
const errorsRoutes = require('./errors.js');
const auth = require('../middlewares/auth');
const { validationDataUser } = require('../middlewares/validation');
require('dotenv').config();

const {
  loginUser,
  createUser,
} = require('../controllers/users');

routers.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

routers.post('/signup', validationDataUser, createUser);
routers.post('/signin', validationDataUser, loginUser);
routers.use(auth);
routers.use('/', cardsRoutes);
routers.use('/', userRoutes);
routers.use('/', errorsRoutes);

module.exports = routers;
