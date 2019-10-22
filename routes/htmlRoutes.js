var db = require("../models");

module.exports = function(app) {
  
  // Homepage, displays unsaved articles
  app.get("/", function(req, res) {
    db.Article.find({saved: false})
      .then(function(dbArticles) {
        res.render("index", 
        {articles: dbArticles});
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).send(err.message);
      })
  })

  app.get("/saved", function(req, res) {
    db.Article.find({saved: true})
      .then(function(dbArticles) {
        res.render("saved",
        {articles: dbArticles});
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).send(err.message);
      })
  })
}