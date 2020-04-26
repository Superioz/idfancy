// prepares the button
document.getElementById("ids").addEventListener("keyup", function (event) {
    if (event.key != "Enter") return;

    doPostRequest()
});
document.getElementById("button").addEventListener("click", function (event) {
    doPostRequest()
});

// executes the post request
// takes the ids from the input field and send
// them as data to the POST request consumer
function doPostRequest() {
    var xhttp = new XMLHttpRequest();
    var box = document.getElementById("ids");
    var result = document.getElementById("result");

    var lastResult = document.getElementById("last-result");
    lastResult.innerHTML = "Last Result - " + getCurrentTime();

    // check for the response
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // replace the text inside the text box
            // with a pretty written json string
            result.innerHTML = prettyPrint(this.response.toString());
        }
    };
    xhttp.open("POST", "", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    // get value to send from box
    var data = box.value;
    var arr = data.split(",");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = "\"" + arr[i] + "\""
    }
    data = "[" + arr.join(",") + "]"

    xhttp.send(data);

    box.value = "";
}

// formats a json string to a pretty writing json
function prettyPrint(ugly) {
    var obj = JSON.parse(ugly);
    return JSON.stringify(obj, undefined, 4);
}

// Simple function to get the current time
// as a readable format
function getCurrentTime() {
    var currentdate = new Date();
    var currentHours = currentdate.getHours();
    var currentMin = currentdate.getMinutes();
    var currentSeconds = currentdate.getSeconds();

    return (currentHours < 10 ? "0" + currentHours : currentHours) + ":"
        + (currentMin < 10 ? "0" + currentMin : currentMin) + ":"
        + (currentSeconds < 10 ? "0" + currentSeconds : currentSeconds)
}
