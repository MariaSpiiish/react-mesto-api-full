const Card = require('../models/card');
const NotFound = require('../custom errors/NotFound');
const {
  ok, created,
} = require('../custom errors/error_status');
const BadRequest = require('../custom errors/BadRequest');
const Forbidden = require('../custom errors/Forbidden');

const deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .orFail(() => {
    throw new NotFound('Карточка не найдена');
  })
  .then((card) => {
    if (card.owner.toString() !== req.user._id) {
      return next(new Forbidden('Нельзя удалить чужую карточку'));
    }
    return card.remove()
      .then(() => res.status(ok).send({ message: 'Карточка удалена' }));
  })
  .catch(next);

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(ok).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(created).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .orFail(() => {
    throw new NotFound();
  })
  .then((card) => res.status(ok).send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequest('Переданы некорректные данные при постановке лайка'));
    }
    return next(err);
  });

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true, runValidators: true },
)
  .orFail(() => {
    throw new NotFound();
  })
  .then((card) => res.status(ok).send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequest('Переданы некорректные данные при снятии лайка'));
    }
    return next(err);
  });

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
