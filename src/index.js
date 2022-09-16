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
  var removeCommentsButton = document.getElementById("remove-comments");
  var list = document.getElementById("comment-list");
  var submitButton = document.getElementById("submit-button");
  var submitDataButton = document.getElementById("submit-data");

  var menuTable = document.getElementById("menu-table");

  submitDataButton.addEventListener("click", function () {
    var userNameValue = document.getElementById("input-username").value;
    var emailValue = document.getElementById("input-email").value;
    var addressValue = document.getElementById("input-address").value;
    var adminBoolean = document.getElementById("input-admin").checked;
    var adminValue = "-";
    if (adminBoolean === true) {
      adminValue = "X";
    }

    var row = document.createElement("tr");
    var uname = document.createElement("td");
    var email = document.createElement("td");
    var address = document.createElement("td");
    var admin = document.createElement("td");

    uname.appendChild(document.createTextNode(userNameValue));
    email.appendChild(document.createTextNode(emailValue));
    address.appendChild(document.createTextNode(addressValue));

    admin.appendChild(document.createTextNode(adminValue));

    row.appendChild(uname);
    row.appendChild(email);
    row.appendChild(address);
    row.appendChild(admin);

    menuTable.appendChild(row);
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

    //https://stackoverflow.com/questions/46665554/remove-parent-element-on-click-with-plain-javascript

    list.innerHTML +=
      '<div class="comment"><div class="comment-rating">' +
      strRating +
      '</div><div class="comment-text">' +
      textAreaValue +
      '</div><button class="delete-review" style="display:none;" onclick="return this.parentNode.remove();">Remove</button></div>';
  });
}
