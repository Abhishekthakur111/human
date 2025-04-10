require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileupload = require('express-fileupload');
const flash = require("connect-flash");
const session = require('express-session');
const layouts = require('express-ejs-layouts');

const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 8000;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(layouts);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = {
        success: req.flash("success")[0],
        error: req.flash("error")[0]
    };
    next();
});

app.use((req, res, next) => {
    res.locals.title = '';
    if (req.session && req.session.admin) {
        res.locals.adminData = req.session.admin;
    }
    next();
});

app.use('/', adminRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});


app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = app;
