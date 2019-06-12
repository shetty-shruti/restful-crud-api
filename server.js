// require express
var express = require('express')
var app = express();

// require body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// for local connection string
const dbConfig = require('./config/database.config.js');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin",
       req.headers.origin);
   res.header("Access-Control-Allow-Headers",
       "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods",
       "GET, POST, PUT, DELETE, OPTIONS");
   res.header("Access-Control-Allow-Credentials", "true");
   next();
});


// Require User routes
require('./app/routes/user.routes.js')(app);

// // define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});


app.listen(process.env.PORT || 3000, function(){
   console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});




























// const express = require('express');
// const bodyParser = require('body-parser');

// // create express app
// const app = express();

// const dbConfig = require('./config/database.config.js');
// const mongoose = require('mongoose');


// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json);

// // Require User routes
// require('./app/routes/user.routes.js')(app);


// app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin",
//        req.headers.origin);
//    res.header("Access-Control-Allow-Headers",
//        "Origin, X-Requested-With, Content-Type, Accept");
//    res.header("Access-Control-Allow-Methods",
//        "GET, POST, PUT, DELETE, OPTIONS");
//    res.header("Access-Control-Allow-Credentials", "true");
//    next();
// });

// mongoose.Promise = global.Promise;

// // Connecting to the database
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the database");    
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });

// // define a simple route
// app.get('/', (req, res) => {
//     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
// });

// // listen for requests
// app.listen(3000, () => {
//     console.log("Server is listening on port 3000");
// });