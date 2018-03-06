console.log("working");


var config = {
apiKey: "AIzaSyCYAv83AcPEFhpPkbAUL1zp_9IrrvhFXXo",
authDomain: "fir-homework-42ecc.firebaseapp.com",
databaseURL: "https://fir-homework-42ecc.firebaseio.com",
projectId: "fir-homework-42ecc",
storageBucket: "fir-homework-42ecc.appspot.com",
messagingSenderId: "130746772541"
};

firebase.initializeApp(config);

var database = firebase.database();

var trainName;
var destination;
var firstTrainTime;
var frequency;
var currentTime; 

$("#submit").on("click", function() {
  event.preventDefault();
  
  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  firstTrainTime = $("#trainTime").val().trim();
  frequency = $("#frequency").val().trim();

  database.ref().push({
    train: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency,
    currentTime: firebase.database.ServerValue.TIMESTAMP
  });

  $("#trainName").val("");
  $("#destination").val("");
  $("#trainTime").val("");
  $("#frequency").val("");


})

database.ref().on("child_added", function(childSnapshot){
  addTrain = childSnapshot.val().train;
  addDestination = childSnapshot.val().destination;
  addTrainTime = childSnapshot.val().firstTrainTime;
  addFrequency = childSnapshot.val().frequency;
  currentTime = childSnapshot.val().currentTime;

  console.log(childSnapshot.val().firstTrainTime);
  console.log(addTrainTime);




  var firstTimeConverted = moment(addTrainTime, "HH:mm");
  console.log(firstTimeConverted);

  var currentTime = moment();
  console.log("Current Time:  " + moment(currentTime).format("HH:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Difference in Time:" + diffTime);

  var tRemainder = diffTime % addFrequency
  console.log(tRemainder);

  //what needs to be appended to the table//
  var tMinutesTillTrain = addFrequency - tRemainder;
  console.log("Minutes Till Train:  " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("Arrival Time:  " + moment(nextTrain).format("HH:mm"));

  $("#train-table").append("<tr><td id='table-1'>" + addTrain + "</td><td id='table-2'>" + addDestination + "</td><td id='table-3'>" + addFrequency + "</td><td id='table-4'>" + moment(nextTrain).format("HH:mm") + "</td><td id='table-5'>" + tMinutesTillTrain + "</td></tr>");

}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
});