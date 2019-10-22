var express = require("express");
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

var db = require("./models");

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsScraper", { useNewUrlParser: true });

app.get("/scrape", function(req, res) {
  axios.get("https://www.cnet.com/news/").then(function(response) {
    var $ = cheerio.load(response.data);

    $(".col-5 assetText").each(function(i, element) {
      var result = {};
      result.title = $(this).children("h3").text();
      result.link = $(this).children("a").attr("href");
      result.summary = $(this).children("p").text();

      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });
    res.send("Scrape complete.");
  })
})

// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({})
    .then(function(dbArticles) {
      res.json(dbArticles);
    }).catch (function(err) {
      res.json(err);
    })
});

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
})