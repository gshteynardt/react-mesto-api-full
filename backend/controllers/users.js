const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequestErr = require('../errors/bad-request-err');
const UnauthorizedErr = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const { generateToken } = require('../utils/genereteToken');

const saltRounds = 10;

const getUsers = async (req, res, next) => {
  try {
    const data = await User.find({});
    return res.send(data);
  } catch (err) {
    next(err);
  }
  return null;
};

const getUser = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const queryUser = await User.findById(_id)
      .orFail(new UnauthorizedErr('Пользователь не найден'));
    res.status(200).send(queryUser);
  } catch (err) {
    next(err);
  }
  return null;
};

const createUser = async (req, res, next) => {
  try {
    const {
      email, password, name, avatar, about,
    } = req.body;
    const id = await User.countDocuments();
    const hash = await bcrypt.hash(password, saltRounds);
    const savedUser = await User.create({
      id,
      email,
      password: hash,
      name,
      avatar,
      about,
    });

    const data = savedUser.toJSON();
    delete data.password;

    return res.status(200).send({ data });
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      next(new ConflictError('Невалидные данные'));
    } else if (err.name === 'ValidationError') {
      return new BadRequestErr('Невалидные данные');
    }
    next(err);
  }
  return null;
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUsersByCredentials(email, password);
    const payload = { _id: user._id };
    const token = await generateToken(payload);
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const _id = req.user;
    const opts = { runValidators: true, new: true };
    const data = await User.findByIdAndUpdate(_id, { name, about }, opts);
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
  return null;
};

const updateAvatarProfile = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const _id = req.user;
    const opts = { runValidators: true, new: true };
    const data = await User.findByIdAndUpdate(_id, { avatar }, opts)
      .orFail(new NotFoundError('Пользователь не найден'));
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
  return null;
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  loginUser,
  updateProfile,
  updateAvatarProfile,
};
