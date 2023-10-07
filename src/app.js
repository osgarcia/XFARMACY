const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const session = require('express-session');
const stripe = require('stripe')('sk_test_51NoKp9JNkXDc99lCXz8FZCz8wxAqOPqGBBfiIL1kOHXsRGlRmwdeHomPfVCtvrfN2GwMJgItis4MwTrNisoyeNAI00lg1ybONB');
const app = express();
const dotenv = require('dotenv').config();

module.exports = {
    DB_HOST : process.env.DB_HOST || 'localhost',
    DB_USER : process.env.DB_USER || 'root',
    DB_PASS : process.env.DB_PASS || '',
    DB_PORT : process.env.DB_PORT || '3306',
    DB_NAME : process.env.DB_NAME || 'xfarmacy'

}


//Variable de Sesion
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Import routes
const customerRoutes = require('./routes/customer');


//setings
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: 'xfarmacy',
}, 'single'));

app.use(express.urlencoded({extended: false}));

app.use(express.static('public'));



//routes
app.use('/', customerRoutes);


//Star Server
app.listen(app.get('port'), () => {
    console.log('Server on port 8000');
    
});

