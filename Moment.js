// Your web app's Firebase configuration

var coinfig = {
  apiKey: "AIzaSyBbh4DZfM0diWgYtuoYAC2uPf2JHnvIajM",
  authDomain: "alley-11ff4.firebaseapp.com",
  databaseURL: "https://alley-11ff4.firebaseio.com",
  projectId: "alley-11ff4",
  storageBucket: "alley-11ff4.appspot.com",
  messagingSenderId: "913620743872"
};

// Initialize Firebase

firebase.initializeApp(config);

// reference to Firebase
var trainData = firebase.database();

//Used the employee timesheet activity to help with the code

// Whenever a user clicks the click button
$("#addTrainBtn").on("click", function() {
  // Get the input values
  var trainName = $("#trainNameInput")
    .val()
    .trim();
  var destination = $("#destinationInput")
    .val()
    .trim();
  var firstTrain = moment(
    $("#firstTrainInput")
      .val()
      .trim(),
    "HH:mm"
  )
    .subtract(10, "years")
    .format("X");
  var frequency = $("#frequencyInput")
    .val()
    .trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  trainData.ref().push(newTrain);

  alert("Train Added!");

  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#firstTrainInput").val("");
  $("#frequencyInput").val("");

  return false;
});

trainData.ref().on("child_added", function(snapshot) {
  var name = snapshot.val().name;
  var remainder = moment().diff(moment.unic(firstTrain), "minutes") % frequency;
  var minutes = frequency - remainder;
  var arrival = moment()
    .add(minutes, "m")
    .format("hh:mm A");

  console.log(remainder);
  console.log(minutes);
  console.log(arrival);

  $("trainTable > tBody").append(
    "<tr><td>" +
      name +
      "</td><td>" +
      destination +
      "</td><td>" +
      arrival +
      "</td><td>" +
      minutes +
      "</td><td>"
  );
});
