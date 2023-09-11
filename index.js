import express from "express";
import pgPromise from "pg-promise";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
import flash from "flash-express";
import 'dotenv/config';
import bookings from "./services/restaurant.js";
import bookingRoutes from "./routes/restaurant-routes.js";

/*  PSEUDO CODE/PLANNING
?   DATABASE 
*DONE create database on render (I have not yet worked on elephantSQL)
*DONE create table in DB and add records for tables available for bookings
*DONE create DB connection
?   Application
*DONE create a web app in Render
*DONE create an environment variable for the connection string on the web app in Render
*DONE create routes folder
TODO create factory function in routes folder
*DONE import routes and services
TODO create additional routes
*DONE ensure the unit tests pass
?   HANDLEBARS
TODO Create handlebar templates for the additional routes
?   DEPLOYMENT
*DONE setup github actions
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

// *Create DB connection
// Instantiate pg-promise
let pgp = pgPromise();

// which db connection to use
const connectionString= process.env.CONNECTION_STRING;

// Instaniate Database
const db = pgp(connectionString);

// Instantiate the app
let bookingService = bookings(db);
//let bookingsApp = bookingRoutes(bookingService);


// Landing page route
app.get("/", async (req, res) => {
    //const getTables = await bookingService.getTables(); 
    //console.log(getTables);
    //res.render('index', { tables : [{}, {}, {booked : true}, {}, {}, {}]})
    //res.render('index', { tables : [getTables]})
    res.render('index',{ tables: await bookingService.getTables()})
});

// book route - post
app.post("/book",(req, res)=>{
    // TODO add functionality for the route
});

// bookings route
app.get("/bookings", (req, res) => {
    res.render('bookings', { tables : [{}, {}, {}, {}, {}, {}]})
});

// bookings/:username route
app.get("/bookings/:username",(req, res)=>{
    // TODO add functionality for the route
});

// cancel route
app.post("/cancel",(req, res)=>{
    // TODO add functionality for the route
});

// Set PORT variable
var portNumber = process.env.PORT || 3000;

//start everything up
app.listen(portNumber, function () {
    console.log('🚀  server listening on:', portNumber);
});