class BadRequest extends Error {
  constructor(message = 'Проверьте правильность введенных данных') {
    super();
    this.statusCode = 400;
    this.message = message;
    this.name = this.constructor.name;
  }
}

module.exports = BadRequest;
