import express from "express";
import pgp from "pg-promise";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import flash from "flash-express";
/*  PSEUDO CODE/PLANNING
?   DATABASE 
TODO create database on render (I have not yet worked on elephantSQL)
TODO create table in DB and add records for tables available for bookings
TODO create DB connection
?   Application
TODO create a web app in Render
TODO create an environment variable for the connection string on the web app in Render
TODO create routes folder
TODO create factory function in routes folder
TODO import routes and services
TODO create additional routes
TODO ensure the unit tests pass
?   HANDLEBARS
TODO Create handlebar templates for the additional routes
?   DEPLOYMENT
TODO setup github actions
*/ 

// *Setup a simple ExpressJS server
const app = express()

// *Make public folder available to the app
app.use(express.static('public'));

// *Setup flash-express
app.use(flash());

// * Setup body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// *Setup handlebars
// handlebar engine settings
const handlebarSetup = exphbs.engine({
    partialsDir: "./views/partials",
    viewPath: './views',
    layoutsDir: './views/layouts'
});

// setup handlebars
app.engine('handlebars', handlebarSetup);
// set handlebars as the view engine
app.set('view engine', 'handlebars');

// Instantiate the app
// let bookingService = bookingService(db);
// let bookingsApp = bookingsRoutes(bookingService);


// Landing page route
app.get("/", (req, res) => {

    res.render('index', { tables : [{}, {}, {booked : true}, {}, {}, {}]})
});

// TODO CREATE /book route - post

// bookings route
app.get("/bookings", (req, res) => {
    res.render('bookings', { tables : [{}, {}, {}, {}, {}, {}]})
});

// TODO Create /bookings/:username route - get
// TODO Create /cancel route - post 

// Set PORT variable
var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('🚀  server listening on:', portNumber);
});