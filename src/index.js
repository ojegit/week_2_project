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
  var list = document.getElementById("comment-list");
  var submitButton = document.getElementById("submit-button");

  // Add comment from the textarea to the list
  addCommentButton.addEventListener("click", function () {
    var textAreaValue = document.getElementById("comment-area").value;
    list.innerHTML += "<li>" + textAreaValue + "</li>";
  });

  // Remove all comments from the list
  removeCommentsButton.addEventListener("click", function () {
    //change visibility of remove buttons in the review list

    var buttonList = document.getElementsByClassName("delete-review");

    Array.prototype.forEach.call(buttonList, function (element) {
      element.style = "block";
    });
  });

  // Submit review
  submitButton.addEventListener("click", function () {
    var textAreaValue = document.getElementById("comment-area").value;
    var ratingValue = document.getElementById("select-feedback");
    var strRating = ratingValue.options[ratingValue.selectedIndex].text;

    list.innerHTML +=
      '<div class="comment"><div class="comment-rating">' +
      strRating +
      '</div><div class="comment-text">' +
      textAreaValue +
      '</div><button class="delete-review" style="display:none;" onclick="return this.parentNode.remove();">Remove</button></div>';
  });
}