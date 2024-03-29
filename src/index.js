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
  var submitDataButton = document.getElementById("submit-data");
  var menuTable = document.getElementById("menu-table");
  var emptyTableButton = document.getElementById("empty-table");
  var titleOffset = 1;

  //Search row based on matching value and column index
  function matchRow(value, col_idx) {
    for (var i = titleOffset; i < menuTable.rows.length; i++) {
      if (value === menuTable.rows[i].cells[col_idx].innerHTML) {
        return i; //Note: take into account the title rows offset
      }
    }
    return -1;
  }

  //replace row in the table
  function replaceRow(old_row, new_row) {
    //Input: row from a table (need to run .cells to access the raw data)
    var n = old_row.cells.length;
    for (var i = 0; i < n; i++) {
      old_row.cells[i].innerHTML = new_row.cells[i].innerHTML;
    }
  }

  // empty table
  emptyTableButton.addEventListener("click", function () {
    var menuTable = document.getElementById("menu-table");
    while (menuTable.rows.length > 1) {
      menuTable.deleteRow(1);
    }
  });

  //Read from HTML form to an array
  function form2array() {
    var array = [];
    array.push(document.getElementById("input-username").value);
    array.push(document.getElementById("input-email").value);
    array.push(document.getElementById("input-address").value);
    var adminBoolean = document.getElementById("input-admin").checked;
    var adminValue = "-";
    if (adminBoolean === true) {
      adminValue = "X";
    }
    array.push(adminValue);
    array.push(document.getElementById("input-image").innerHTML);
    return array;
  }

  //submit button action
  function submit() {
    var formData = form2array();
    var rowNo = matchRow(formData[0], 0);
    var newRow = createRow(formData);

    //see if the inputted column exists
    //AND
    //it is found in the table
    if (formData[0] && rowNo !== -1) {
      console.log("EDIT");
      replaceRow(menuTable.rows[rowNo], newRow);

      var img = document.getElementById("input-image");
      var imgFile = img.files[0];
      if (imgFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        var imgTag = document.createElement("img");
        //reader is asynchronous!
        reader.onload = function (e) {
          //https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file
          imgTag.src = e.target.result;
        };
        imgTag.width = 64;
        imgTag.height = 64;
        console.log(imgTag);
        menuTable.rows[rowNo].cells[4].appendChild(imgTag);
      }

      //if not, then a new row is added at the end of the table
    } else {
      console.log("ADD");
      menuTable.appendChild(newRow);
      //console.log(menuTable.lastChild.cells[4]);

      var img = document.getElementById("input-image");
      var imgFile = img.files[0];
      if (imgFile) {
        const reader = new FileReader();
        reader.readAsDataURL(imgFile);
        var imgTag = document.createElement("img");
        //reader is asynchronous!
        reader.onload = function (e) {
          //https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file
          imgTag.src = e.target.result;
        };
        imgTag.width = 64;
        imgTag.height = 64;
        console.log(imgTag);
        menuTable.lastChild.cells[4].appendChild(imgTag);
      }
    }
  }

  //Creat HTML table row from an array
  function createRow(array) {
    var tr = document.createElement("tr");
    for (var i = 0; i < array.length; i++) {
      var td = document.createElement("td");
      td.appendChild(document.createTextNode(array[i]));
      tr.appendChild(td);
    }
    return tr;
  }

  // add data from form to table
  submitDataButton.addEventListener("click", () => {
    submit();
  });
}
