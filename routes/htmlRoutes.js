var db = require("../models");

module.exports = function(app) {
  
  app.get("/", function(req, res) {
    db.Article.find({})
      .then(function(dbArticles) {
        res.render("index", 
        {articles: dbArticles});
      })
      .catch(function(err) {
        console.log(err);
        res.status(400).send(err.message);
      })
  })
}