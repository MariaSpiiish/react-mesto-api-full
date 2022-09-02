const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../custom errors/NotFound');

const { ok, created } = require('../custom errors/error_status');
const BadRequest = require('../custom errors/BadRequest');
const DuplicateError = require('../custom errors/DuplicateError');
const UnauthorizedError = require('../custom errors/UnauthorizedError');

const getUser = (req, res, next) => User.findById(req.params.userId)
  .orFail(() => {
    throw new NotFound('Пользователь не найден');
  })
  .then((user) => res.status(ok).send(user))
  .catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequest('Переданы некорректные данные при запросе пользователя'));
    }
    return next(err);
  });

const getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(ok).send({ users }))
  .catch(next);

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then(() => res.status(created).send({
      user: {
        name, about, avatar, email,
      },
    }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new DuplicateError());
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при создании пользователя'));
      }
      return next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      throw new NotFound('Пользователь не найден');
    })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при обновлении данных пользователя'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      throw new NotFound('Пользователь не найден');
    })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при обновлении данных пользователя'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(ok).send({ token });
    })
    .catch(() => next(new UnauthorizedError('Необходима авторизация')));
};

const getCurrentUser = (req, res, next) => User.findById(req.user)
  .orFail(() => {
    throw new NotFound('Пользователь не найден');
  })
  .then((user) => res.status(ok).send(user))
  .catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      return next(new BadRequest('Переданы некорректные данные при обновлении данных пользователя'));
    }
    return next(err);
  });

module.exports = {
  createUser, getUser, getUsers, updateProfile, updateAvatar, login, getCurrentUser,
};
