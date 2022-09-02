class DuplicateError extends Error {
  constructor(message = 'Пользователь уже существует') {
    super();
    this.statusCode = 409;
    this.message = message;
    this.name = this.constructor.name;
  }
}

module.exports = DuplicateError;
