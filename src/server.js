const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const key = require("./utils/key");
require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const organizationsController = require('./controllers/organization');
const testimonialsRouter = require('./routes/testimonials');
const authRouter = require('./routes/auth');
const membersRouter = require('./routes/members');
const rolesRouter = require('./routes/roles');
const newsRouter = require('./routes/newreports');
const activitiesRouter = require('./routes/activities');
const categoriesRouter = require('./controllers/category');



const app = express();
app.use(cors())

app.set('key', key.key);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testimonials', testimonialsRouter);
app.use('/auth', authRouter);
app.use('/members', membersRouter);
app.use('/roles', rolesRouter);
app.use('/categories', categoriesRouter);
app.use('/news', newsRouter);
app.use('/activities', activitiesRouter);
app.use('/users', usersRouter);
app.use('/organizations', organizationsController)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
