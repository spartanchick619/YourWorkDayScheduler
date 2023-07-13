$(document).ready(function () {
  var now = dayjs().format("dddd, MMMM D YYYY");
  var currentHour24h = dayjs().hour();
  $("#currentDay").text(now);

  var storedEvents = JSON.parse(localStorage.getItem("storedEvents"));
  if (storedEvents !== null) {
    eventArray = storedEvents;
  } else {
    eventArray = new Array(8);
    eventArray[3] = "Taco Time!"
  }

  var plannerDiv = $("#planner");
  plannerDiv.empty();

  for (var hour = 9; hour <= 17; hour++) {

    // draw the main rows
    var newRowDiv = $("<div>");
    newRowDiv.addClass("row time-block");
    newRowDiv.attr("hour", hour);

    // draw the time section (column 1)
    var timeCol = $("<div>");
    timeCol.addClass("col-2 col-md-1 hour text-center py-3");

    var amPM = "";
    if (hour < 12) {
      displayHour = hour;
      amPM = "AM";
    }
    if (hour === 12) {
      displayHour = hour;
      amPM = "PM";
    }
    if (hour > 12) {
      displayHour = hour - 12;
      amPM = "PM";
    }

    timeCol.text(`${displayHour}${amPM}`);
    newRowDiv.append(timeCol);

    // draw the text area (column 2)
    var rowIndex = hour - 9;
    var inputArea = $("<textarea>");
    inputArea.attr("id", `input-${rowIndex}`);
    inputArea.attr("hour-index", rowIndex);
    inputArea.addClass("col-8 col-md-10 description");
    inputArea.val(eventArray[rowIndex]);

    newRowDiv.append(inputArea);

    // draw the save button (column 3)
    var saveButtonDiv = $("<div>");
    saveButtonDiv.attr("id", `saveID-${rowIndex}`);
    saveButtonDiv.attr("saveID", rowIndex);
    saveButtonDiv.addClass("btn col-2 col-md-1 saveBtn");

    // add the icon
    var saveButton = $("<i>");
    saveButton.attr("class", "fas fa-save");

    newRowDiv.append(saveButtonDiv);
    saveButtonDiv.append(saveButton);

    // set row color based on time
    updateRowColor(newRowDiv, hour);

    // Push the row out to the browser window
    plannerDiv.append(newRowDiv);
  }

  function updateRowColor(rowHour, hour) {
    if (hour < currentHour24h) {
      rowHour.addClass("past");
    } else if (hour > currentHour24h) {
      rowHour.addClass("future");
    } else {
      rowHour.addClass("present");
    }
  };

  // handle the save button
  $(".saveBtn").on('click', function (event) {
    event.preventDefault();

    var index = $(this).attr("saveID");
    var eventInfoID = "#input-" + index;
    var eventInfo = $(eventInfoID).val();

    // save to the data array
    eventArray[index] = eventInfo;
    localStorage.setItem("storedEvents", JSON.stringify(eventArray));
  });


});
