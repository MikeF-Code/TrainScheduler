

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

console.log("js started");

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  console.log("Pushing data to DB"); 
  
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  var newTrain = {
    name: trainName,
    dest: trainDest,
    first: firstTrain,
    freq: frequency
  };

  database.ref().push(newTrain);

  console.log('Pushing the following to the db');
  console.log("Train name: "+newTrain.name);
  console.log("Destination: "+newTrain.dest);
  console.log("First Departure Time: "+newTrain.first);
  console.log("Interval: "+newTrain.freq);
  console.log("-----------");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;

  console.log("Writing the following DB information to the schedule:");
  console.log(trainName);
  console.log(trainDest);
  console.log(firstTrain);
  console.log(frequency);
  console.log("-----------");

  var trainStart = moment(firstTrain, "HH:mm");
  console.log("Moment.js converted train start time for "+trainName+": "+trainStart);

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(frequency),
    $("<td>").text(firstTrain),
  );

  $("#schedule-table > tbody").append(newRow);
});