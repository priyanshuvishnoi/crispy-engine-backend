if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: './config.env' });
}
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const chalk = require('chalk');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(_ => console.log(chalk.green('connected to db')))
  .catch(err => console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
