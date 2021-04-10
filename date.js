let timeout;
let interval;

let setDate;
let pauseDate;
let alarmDate;





function setAlarm(tMillis)
{
    interval = tMillis;
    ringIn(tMillis + guiLagAdjustment);
}






function ringIn(tMillis)
{
    clearTimeout(timeout);
    pauseDate = null;

    let tSecs = parseInt(tMillis / 1000);
    let tMins = parseInt(tSecs / 60);
    let secs = tSecs % 60;
    let tHrs = parseInt(tMins / 60);
    let mins = tMins % 60;
    let millis = tMillis % 1000;

    alarmDate = new Date();
    // alarmDate.setTime(alarmDate.getTime() + millis);
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

function pause()
{
    pauseDate = new Date();
    clearTimeout(timeout);
    chrome.browserAction.setBadgeBackgroundColor({color:yellowColor});
}

function resume()
{
    var remainingAfterPause = (alarmDate.getTime() - pauseDate.getTime());
    ringIn(remainingAfterPause);
}

function restart()
{
    ringIn(interval + guiLagAdjustment);
}

function getTimeLeft()
{
    if (pauseDate)
        return (alarmDate.getTime() - pauseDate.getTime());

    var now = new Date();
    return (alarmDate.getTime() - now.getTime());
}

function getTimeLeftPercent()
{
    return parseInt(getTimeLeft() / interval * 100);
}


function getTimeLeftString()
{
    var until = getTimeLeft();
    var tSecs = parseInt(until / 1000);
    var tMins = parseInt(tSecs / 60);
    var secs = tSecs % 60;
    var tHrs = parseInt(tMins / 60);
    var mins = tMins % 60;
    if(secs < 10) secs = "0" + secs;
    if(mins < 10) mins = "0" + mins;
    if(tHrs < 10) tHrs = "0" + tHrs;
    return ((tHrs > 0 ? tHrs + ":" : "") + mins + ":" + secs);
}

function didCreateNotification(notificationId) {}

function ring()
{
    var options = {
        type: "basic",
        title: "Time ran out!",
        message: "Your time to work bozo!",
        iconUrl: "tomato.png"
    }
    chrome.notifications.create("", options, didCreateNotification);

    alarmSound.play();
    turnOff();
}


function turnOff()
{
    clearTimeout(timeout);
    interval = 0;
    alarmDate = null;
    pauseDate = null;
    setDate = null;
    chrome.browserAction.setBadgeText({text: ""});
}

function error()
{
    alert("Please enter a number between 1 and 240.");
}


/*

function startTimer(duration, display) {
    let start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {

    let intrv = setInterval(() => {


            // get the number of seconds that have elapsed since
            // startTimer() was called



        diff = duration - (((Date.now() - start) / 1000) | 0);

            console.log(diff)

         //   if(paused){
                //send to background
           //     diff = duration;
            //}

            // does the same job as parseInt truncates the float
            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display = minutes + ":" + seconds;

            if (diff <= 0) {

                clearInterval(intrv)
                start = Date.now() + 1000;
            }

        } , 5000)

    }

    timer()
    // we don't want to wait a full second before the timer starts

}

function a() {
    let fiveMinutes = 60 * 25, display = '25:00'
    startTimer(fiveMinutes, display);
}

 */