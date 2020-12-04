const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const BadRequestErr = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const getCards = async (req, res, next) => {
  try {
    const data = await Card.find({});
    res.send(data);
  } catch (err) {
    next(err);
  }
  return null;
};

const getCard = async (req, res, next) => {
  const { id } = req.params;
  try {
    const queryCard = await Card.findById(id)
      .orFail(new NotFoundError('Пользователя не существует'));
    res.status(200).send(queryCard);
  } catch (err) {
    next(err);
  }
  return null;
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user;
    const savedCard = await Card.create({ name, link, owner });
    res.status(200).send(savedCard);
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      next(new ConflictError('Невалидные данные'));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestErr('Невалидные данные'));
    }
    next(err);
  }
  return null;
};

const deleteCard = async (req, res, next) => {
  try {
    const user = String(req.user._id);
    const { id } = req.params;
    const queryCard = await Card.findById(id)
      .orFail(new NotFoundError('Пользователя не существует'));
    const queryCardOwner = String(queryCard.owner);

    if (user !== queryCardOwner) {
      throw new ForbiddenError('Запрещено удалять карточки других пользователей');
    }

    const deletedCard = await Card.findByIdAndDelete(id);
    return res.send(deletedCard);
  } catch (err) {
    next(err);
  }

  return null;
};

const likeCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(NotFoundError('Карточка с таким id не найдена'));

    res.status(200).send(card);
  } catch (err) {
    next(err);
  }
  return null;
};

const dislikeCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(NotFoundError('Карточка с таким id не найдена'));
    res.status(200).send(card);
  } catch (err) {
    next(err);
  }
  return null;
};

module.exports = {
  getCards,
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
