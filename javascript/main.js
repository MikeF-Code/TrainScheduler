

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
  var trainTime;
  var trainStart = moment(firstTrain, "HH:mm").unix();
  var nextTrain;
  console.log("Moment.js converted train start time for "+trainName+": "+trainStart);
  var now = moment().unix();
  console.log("'now' variable type is: ");
  console.log(typeof now);
  console.log("Value of 'now': "+now);
  console.log("'trainStart' variable type is: ");
  console.log(typeof trainStart);
  console.log("Value of 'trainStart': "+trainStart);
  var convertedFreq = frequency*60;
  console.log("Frequency converted to seconds: "+convertedFreq);
  trainTime = ((now - trainStart) % convertedFreq);
  trainTime = trainTime / 60;
  console.log("-----------");
  console.log("Result of modulo calculation ((now - trainStart) % frequency), converted into minutes: ");
  console.log(trainTime);
  console.log("-----------");
  console.log("Writing the following DB information to the schedule:");
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(frequency);
  console.log("-----------");

  if (trainTime <= 0) {
    trainTime = '';
  }

  if (now < trainStart) {
    nextTrain = childSnapshot.val().first;
  }

  var newRow = $("<tr>").append(
    // Train Name
    $("<td>").text(trainName),
    // Destination
    $("<td>").text(trainDest),
    // Frequency (Min)
    $("<td>").text(frequency),
    // Next Arrival
    $("<td>").text(nextTrain),
    // Minutes Away
    $("<td>").text(trainTime),
  );

  $("#schedule-table > tbody").append(newRow);
});