const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const body = require('body-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');


if(process.env.NODE_ENV === 'development'){
    dotenv.config({path:'./.env'});
}
console.log('NODE_ENV: ', process.env.NODE_ENV);

const mongoose = require('./configs/db.config')();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/authentication');
const app = express();
app.use(session({ secret: "S3C437" }));
app.use( passport.initialize());
app.use( passport.session());
app.use(logger('dev'));
app.use(body.json());  // parse application/json
app.use(body.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter);

module.exports = app;
