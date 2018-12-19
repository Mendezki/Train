// Initialize Firebase
var config = {
    apiKey: "AIzaSyCJYS0MVs2AgzhU1PSSobjqh4hMKfbYrCI",
    authDomain: "train-1ae6f.firebaseapp.com",
    databaseURL: "https://train-1ae6f.firebaseio.com",
    projectId: "train-1ae6f",
    storageBucket: "train-1ae6f.appspot.com",
};
firebase.initializeApp(config);

var dataRef = firebase.database();

$("#submitbtn").on("click", function() {

    var trainName = $("#tNameInput").val().trim();
    var destination = $("#destInput").val().trim();
    var trainTime = $("#tTimeInput").val().trim();
    var frequency = $("#freqInput").val().trim();
    var addedTrain = {
        name: trainName,
        destination: destination,
        time: trainTime,
        frequency: frequency,
    }
    dataRef.ref().push(addedTrain)

    // console.log(addedTrain.name)
    // console.log(addedTrain.destination)
    // console.log(addedTrain.time)
    // console.log(addedTrain.frequency)

    $('#tNameInput').val("");
    $('#destInput').val("");
    $('#tTimeInput').val("");
    $('#freqInput').val("");

    return false;
});

dataRef.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    // Train info
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $("#trainSchedule").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

    
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


