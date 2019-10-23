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

    $.ajax({
      url: "/articles/" + articleId,
      method: "GET"
    }).then(function(dbArticle) {
      console.log(dbArticle);
      if (dbArticle.notes.length > 0) {
        for (var i = 0; i < dbArticle.notes.length; i++) {
          var card = $("<div>").addClass("card");
          console.log(dbArticle.notes[i].body)
          card.append($("<div>").addClass("card-body").text(dbArticle.notes[i].body));
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
});
