require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const firebaseInit = require('./config/database');


const transferRouter = require('./routes/transfer');
const checkBalanceRouter = require('./routes/checkBalance');
const burnEthRouter = require('./routes/burnEth');
const createWalletRouter = require('./routes/createWallet');
const erc20Transfer = require('./routes/erc20transfer');

const app = express();

firebaseInit();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/transfer', transferRouter);
app.use('/check-balance', checkBalanceRouter);
app.use('/burn-eth', burnEthRouter);
app.use('/create-wallet', createWalletRouter);
app.use('/erc20-transfer', erc20Transfer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({err});
});

module.exports = app;
