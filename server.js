// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Express app
var app = express();
var PORT = process.env.PORT || 3000;

// public directory to access CSS files
app.use(express.static(path.join(__dirname, "./public")));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());

// Routes
require(path.join(__dirname, "./routing/apiRoutes"))(app);
require(path.join(__dirname, "./routing/htmlRoutes"))(app);

// Start listening on PORT
app.listen(PORT, function(){
    console.log("Listening on PORT: " + PORT);
});