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

function loop_table(userName) {
  var table = document.getElementById("menu-table");
  for (let i in table.rows) {
    let row = table.rows[i];
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    for (let j in row.cells) {
      let col = row.cells[j];
      //console.log(col.innerHTML);
      if (col.innerHTML == userName) {
        return row;
      }
      //iterate through columns
      //columns would be accessed using the "col" variable assigned in the for loop
    }
  }
}

function initializeCode() {
  var submitDataButton = document.getElementById("submit-data");
  var menuTable = document.getElementById("menu-table");
  var emptyTableButton = document.getElementById("empty-table");
  var inputImageButton = document.getElementById("input-image");

  // empty table
  emptyTableButton.addEventListener("click", function () {
    var menuTable = document.getElementById("menu-table");
    while (menuTable.rows.length > 1) {
      menuTable.deleteRow(1);
    }
  });

  //placeholder for the image event here
  var imgFile;

  // add lister to input image button
  inputImageButton.addEventListener("change", (event) => {
    imgFile = event.target.files;
    //console.log(imgFile);
  });

  // add data from form to table
  submitDataButton.addEventListener("click", () => {
    console.log(loop_table("Webmaster"));

    var userNameValue = document.getElementById("input-username").value;
    var emailValue = document.getElementById("input-email").value;
    var addressValue = document.getElementById("input-address").value;
    var adminBoolean = document.getElementById("input-admin").checked;

    //const fileList = event.target.files;
    console.log(imgFile);

    var adminValue = "-";
    if (adminBoolean === true) {
      adminValue = "X";
    }

    var row = document.createElement("tr");
    var uname = document.createElement("td");
    var email = document.createElement("td");
    var address = document.createElement("td");
    var admin = document.createElement("td");
    var img = document.createElement("td");

    //
    const reader = new FileReader();
    if (imgFile) {
      reader.readAsDataURL(imgFile[0]);
    }
    var img_ = document.createElement("img");
    img_.src = reader.result;
    img_.height = 64;
    img_.width = 64;

    //

    uname.appendChild(document.createTextNode(userNameValue));
    email.appendChild(document.createTextNode(emailValue));
    address.appendChild(document.createTextNode(addressValue));
    admin.appendChild(document.createTextNode(adminValue));
    img.appendChild(img_);

    row.appendChild(uname);
    row.appendChild(email);
    row.appendChild(address);
    row.appendChild(admin);
    row.appendChild(img);

    menuTable.appendChild(row);
  });
}
