class UnauthorizedError extends Error {
  constructor(message = 'Неправильные почта или пароль') {
    super();
    this.statusCode = 401;
    this.message = message;
    this.name = this.constructor.name;
  }
}

module.exports = UnauthorizedError;
