$(document).ready(function() {

  // Adds article to saved articles
  $(document).on("click", ".save-btn", function() {
    var articleId = $(this).attr("data-id");
    $.ajax({
      url: "/api/articles/" + articleId,
      method: "POST"
    }).then(function() {
      // Refreshes page so newly saved article is not visible
      document.location.reload();
    })
  })

  // Deletes article
  $(document).on("click", ".delete-article-btn", function() {
    var noteId = $(this).attr("data-id");
    $.ajax({
      url: "/api/articles/" + noteId,
      method: "DELETE"
    }).then(function() {
      document.location.reload();
    })
  })

  // Displays notes for the article
  $(document).on("click", ".article-notes-btn", function() {
    const articleId = $(this).attr("data-id");
    $(".add-note-btn").attr("data-id", articleId);
    $(".article-notes").empty();

    $.ajax({
      url: "/articles/" + articleId,
      method: "GET"
    }).then(function(dbArticle) {
      console.log(dbArticle);
      if (dbArticle.notes.length > 0) {
        // Creates a card for each note that an article may have
        for (var i = 0; i < dbArticle.notes.length; i++) {
          var card = $("<div>").addClass("card");
          var cardBody = $("<div>").addClass("card-body");
          var button = "<button type='button' class='btn btn-danger delete-note-btn mr-3'"
          button += " role='button' data-id=\'" + dbArticle.notes[i]._id + "\'>";
          button += "X</button>";
          cardBody.text(dbArticle.notes[i].body);
          cardBody.prepend(button);
          card.append(cardBody);
          $(".article-notes").prepend(card);
        }
      }
    })

    $(".notes-modal").modal("show");
  })

  // Adds a new note to the article
  $(document).on("click", ".add-note-btn", function() {
    var noteText = $(".note-body").val().trim();
    // Only submits if textarea is not empty
    if (noteText !== "") {
      $.ajax({
        url: "/notes/" + $(this).attr("data-id"),
        method: "POST",
        data: {
          body: noteText
        }
      })
      .then(function() {
        document.location.reload();
      })
    }
  })

  // Deletes a note frmo the article
  $(document).on("click", ".delete-note-btn", function() {
    var noteId = $(this).attr("data-id");
    console.log(noteId);
    $.ajax({
      url: "/api/notes/" + noteId,
      method: "DELETE"
    })
    .then(function() {
      document.location.reload();
    })
  })

  // Scrapes new articles if there are no articles in the db
  $(document).on("click", ".scrape-articles-btn", function() {
    $.ajax({
      url: "/articles",
      method: "GET"
    })
    .then(function(dbArticles) {
      // Only scrapes if there are no articles
      if (dbArticles.length === 0) {
        $.ajax({
          url: "/scrape",
          method: "GET"
        })
        .then(function() {
          document.location.reload();
        })
      }
    })
  })

  // Clears all articles in the db
  $(document).on("click", ".clear-articles-btn", function() {
    $.ajax({
      url: "/api/articles",
      method: "DELETE"
    }).then(function() {
      document.location.reload();
    })
  })
});
