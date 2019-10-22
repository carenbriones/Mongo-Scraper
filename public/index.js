$(document).ready(function() {

  $(document).on("click", ".save-btn", function() {
    var noteId = $(this).attr("data-id");
    $.ajax({
      url: "/api/notes/" + noteId,
      method: "POST"
    }).then(function() {
      // Refreshes page so newly saved article is not visible
      document.location.reload();
    })
  })

  $(document).on("click", ".delete-article-btn", function() {
    var noteId = $(this).attr("data-id");
    $.ajax({
      url: "/api/notes/" + noteId,
      method: "DELETE"
    }).then(function() {
      document.location.reload();
    })
  })
});
