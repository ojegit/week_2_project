import "./styles.css";

if (document.readyState !== "loading") {
  // Document ready, executing
  console.log("Document ready, executing");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    // Document was not ready, executing when loaded
    console.log("Document ready, executing after a wait");
    initializeCode();
  });
}

function initializeCode() {
  var addCommentButton = document.getElementById("add-comment");
  var removeCommentsButton = document.getElementById("remove-comments");
  var list = document.getElementById("list");

  // Add comment from the textarea to the list
  addCommentButton.addEventListener("click", function () {
    var textAreaValue = document.getElementById("comment-area").value;
    list.innerHTML += "<li>" + textAreaValue + "</li>";
  });

  // Remove all comments from the list
  removeCommentsButton.addEventListener("click", function () {
    var res = window.confirm("Are you sure you want to remove all comments?");
    if (res == true) {
      list.innerHTML = "";
    }
  });
}
