$(document).ready(function() {

  $(document).on("click", ".save-btn", function() {
    console.log("clicked");
    var noteId = $(this).attr("data-id");
    $.ajax({
      url: "/api/notes/" + noteId,
      method: "POST"
    }).then(function() {
      // Refreshes page so newly saved article is not visible
      document.location.reload();
    })
  })
});
