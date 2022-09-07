const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const authRouter = require('./routes/index');
const { auth } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const NotFound = require('./custom errors/NotFound');
// Слушаем 3000 порт
const { PORT = 3010 } = process.env;

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

const options = {
  origin: [
    'http://localhost:3000',
    'https://marialapshina.students.nomoredomains.sbs',
    'http://marialapshina.students.nomoredomains.sbs',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));

app.use(express.json());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/', authRouter);
app.use(auth);
app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use((req, res, next) => {
  next(new NotFound('404 Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
