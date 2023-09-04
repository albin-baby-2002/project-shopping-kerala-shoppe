var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var hbs = require('express-hbs');
const { handlebars } = require('hbs');
var fileupload = require('express-fileupload')
const db = require('./config/connection');
const session = require('express-session')

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({ extname: '.hbs', layoutsDir: __dirname + "/views/layout/", defaultLayout: 'views/layout/layout', partialsDir: __dirname + '/views/partials/' }))

app.use(logger('dev'));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());
app.use(session({
  secret: 'key', resave: true,
  saveUninitialized: true, cookie: { maxAge: 500000 }
}))
db.connect((err) => {
  if (err) console.log("connection error  " + err);
});

app.use('/', usersRouter);
app.use('/admin', adminRouter);

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
  res.render('error');
});

module.exports = app;
