var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var logger = require("morgan");
var cheerio = require("cheerio");
var axios = require("axios");

var PORT = 3000;

var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var db = require("./models");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
})

module.exports = app;