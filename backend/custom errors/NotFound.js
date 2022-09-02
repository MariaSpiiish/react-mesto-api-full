class NotFound extends Error {
  constructor(message = 'Не найдено') {
    super();
    this.statusCode = 404;
    this.message = message;
    this.name = this.constructor.name;
  }
}

module.exports = NotFound;
