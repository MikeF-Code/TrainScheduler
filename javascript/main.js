

var config = {
    apiKey: "AIzaSyCaSkpdVgmvOCHz9I9MVvf7V_wMIY85TBc",
    authDomain: "trainscheduler-homework7.firebaseapp.com",
    databaseURL: "https://trainscheduler-homework7.firebaseio.com",
    projectId: "trainscheduler-homework7",
    storageBucket: "trainscheduler-homework7.appspot.com",
    messagingSenderId: "456661986356"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("button").on("click", "#add-train-btn", function(event) {
console.log("I am here"); 
 event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var firstTrain = moment($("#first-train-input").val().trim(), "MM/DD/YYYY").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    first: firstTrain,
    freq: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);

  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(firstTrain);
  console.log(frequency);

  // Prettify the employee start
  var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
//   var empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

  // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainStartPretty),
    $("<td>").text(""),
    $("<td>").text(""),
    $("<td>").text("")
  );

  // Append the new row to the table
  $("#schedule-table > tbody").append(newRow);
});