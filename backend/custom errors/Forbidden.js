class Forbidden extends Error {
  constructor(message = 'Вы не можете удалить карточку другого пользователя') {
    super();
    this.statusCode = 403;
    this.message = message;
    this.name = this.constructor.name;
  }
}

module.exports = Forbidden;
