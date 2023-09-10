const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const session = require('express-session');
const stripe = require('stripe')('sk_test_51NoKp9JNkXDc99lCXz8FZCz8wxAqOPqGBBfiIL1kOHXsRGlRmwdeHomPfVCtvrfN2GwMJgItis4MwTrNisoyeNAI00lg1ybONB');
const app = express();



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
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'xfarmacy'
}, 'single'));
app.use(express.urlencoded({extended: false}));

app.use(express.static('public'));



//routes
app.use('/', customerRoutes);


//Star Server
app.listen(app.get('port'), () => {
    console.log('Server on port 8000');
    
});

