let timeout;
let interval;

let setDate;
let pauseDate;
let alarmDate;

let greenColor = [76, 187, 23, 255];
let yellowColor = [250, 150, 0, 255];


function setAlarm(tMillis)
{
    interval = tMillis;

    ringIn(tMillis);
}



function ringIn(tMillis) {
    clearTimeout(timeout);
    pauseDate = null;

    let tSecs = parseInt(tMillis / 1000);
    let tMins = parseInt(tSecs / 60);
    let secs = tSecs % 60;
    let tHrs = parseInt(tMins / 60);
    let mins = tMins % 60;
    let millis = tMillis % 1000;

    alarmDate = new Date();
    alarmDate.setTime(alarmDate.getTime() + millis);
    alarmDate.setHours(alarmDate.getHours() + tHrs);
    alarmDate.setMinutes(alarmDate.getMinutes() + mins);
    alarmDate.setSeconds(alarmDate.getSeconds() + secs);
    alarmDate.setMilliseconds(alarmDate.getMilliseconds() + millis);

    setDate = new Date();
    timeout = setTimeout(ring, alarmDate.getTime() - setDate.getTime());

    chrome.browserAction.setBadgeBackgroundColor({color:greenColor});
    setInterval(function() {
        chrome.browserAction.setBadgeText({text: getTimeLeftString()});
    }, 1000);
}

function pause() {
    pauseDate = new Date();
   // console.log("p date" , pauseDate)
    clearTimeout(timeout);
    chrome.browserAction.setBadgeBackgroundColor({color:yellowColor});
}

function resume()
{
    let remainingAfterPause = (alarmDate.getTime() - pauseDate.getTime());
    ringIn(remainingAfterPause);
}

function restart()
{
    ringIn(interval);
}

function getTimeLeft()
{
    if (pauseDate)
        return (alarmDate.getTime() - pauseDate.getTime());

    let now = new Date();
   // console.log(now, "now")
   // console.log(alarmDate)
    return (alarmDate.getTime() - now.getTime());
}
// dont need i tink


function getTimeLeftString()
{

   // console.log("time left")
    let until = getTimeLeft();
    console.log(until)
    let tSecs = parseInt(until / 1000);
    let tMins = parseInt(tSecs / 60);
    let secs = tSecs % 60;
    let tHrs = parseInt(tMins / 60);
    let mins = tMins % 60;
    if(secs < 10) secs = "0" + secs;
    if(mins < 10) mins = "0" + mins;
    if(tHrs < 10) tHrs = "0" + tHrs;
    return ((tHrs > 0 ? tHrs + ":" : "") + mins + ":" + secs);
}

//function didCreateNotification(notificationId) {}

function ring()
{
    var options = {
        type: "basic",
        title: "Time ran out!",
        message: "Your time to work bozo!",
        iconUrl: "tomato.png"
    }
    chrome.notifications.create("", options);

    alarmSound.play();
    turnOff();
}

function turnOff()
{
    clearTimeout(timeout);
    chrome.browserAction.setBadgeText({text: ""});
}

function error()
{
    alert("Please enter a number between 1 and 240.");
}