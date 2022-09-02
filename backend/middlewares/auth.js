const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../custom errors/UnauthorizedError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Нужна авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Нужна авторизация'));
  }

  req.user = payload;

  return next();
};

module.exports = { auth };
