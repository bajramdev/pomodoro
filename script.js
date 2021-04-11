let refreshDisplayTimeout;
let bgpage = chrome.extension.getBackgroundPage();

let editing = false;

const pomodoroMinutes = 25;

document.addEventListener('DOMContentLoaded', function () {
    load();
document.querySelector('#start').addEventListener('click', setTimer, false)

document.querySelector('#reset').addEventListener('click', restartTimer, false)


document.querySelector('#stop').addEventListener('click', stopTimer, false)
//document.querySelector('#myRange').addEventListener('input', volumeControl, false)

});

function show(section){
    document.getElementById(section).style.display = "block";
}

function showInline(section){
    document.getElementById(section).style.display = "inline";
}

function hide(section){
    document.getElementById(section).style.display = "none";
}

function getMilliFromMinutes() {
    return pomodoroMinutes * 60000;
}

function load()
{
    hide('stop')
    // if timer is paused, show resume button and hide pause button
    if(bgpage.pauseDate)
    {
       showInline("start")
        hide("stop")
    }
        console.log("in else")
        refreshDisplay();




    // else, show countdown
    //refreshDisplay();
}

function setTimer()
{

    hide("start");
    showInline("stop");


    console.log("pressed")

    // make sure we're dealing with text not fields
    //if(editing)
      //  swapBack();

    // SET background timer for selected number
    // HIDE settings, DISPLAY countdown

  //  var num = getChoice();

    // set timer, hide settings, display reset button
   // if(isValid(num))

    try {


        bgpage.setAlarm(pomodoroMinutes * 60000);
        refreshDisplay();

    }

 catch(e)
 {
     bgpage.error();
 }

}

function refreshDisplay()


{
    document.getElementById("time").innerHTML = bgpage.getTimeLeftString(); // Timeleft
  //  document.getElementById("bar").style.width = percent + "%";

    refreshDisplayTimeout = setTimeout(refreshDisplay, 100);

}

function stopTimer()
{
    hide("stop");
    showInline("start");
    bgpage.pause();
    clearTimeout(refreshDisplayTimeout);
}

function resumeTimer()
{
    hide("start");
    showInline("stop");
    refreshDisplay();
    bgpage.resume();
}

function restartTimer()
{
    hide("start");
    showInline("stop");
    refreshDisplay();
    bgpage.restart();
}

/*
 * function startTimera(duration, display) {
    let start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {

        let intrv = setInterval(() => {

            // get the number of seconds that have elapsed since
            // startTimer() was called
            diff = duration - (((Date.now() - start) / 1000) | 0);

            // does the same job as parseInt truncates the float
            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display = minutes + ":" + seconds;
            console.log(display)

            if (diff <= 0) {

                clearInterval(intrv)
                start = Date.now() + 1000;
            }

        } , 1000)

    }

    timer()
    // we don't want to wait a full second before the timer starts

}

 function executeTimer() {

    let fiveMinutes = 60 * 5
    , display = '1:00'

    startTimera(fiveMinutes, display);
}



chrome.runtime.sendMessage({ cmd: 'GET_TIME' }, response => {
    if (response.time) {
        const time = new Date(response.time);
        startTimer(time)
    }
});



function startTime(time) {
    chrome.runtime.sendMessage({ cmd: 'START_TIMER', when: time });
    startTimer(time);
}


function update(){

    chrome.storage.sync.get(['tiden','minuten', 'sekunder', 'times'], function(data) {

        console.log(data.tiden);

        document.getElementById('time').innerHTML = data.tiden;

    });
}





let startednow = document.getElementById('start');
let tid = document.querySelector('#time');


const audioOne = document.querySelector('#audio-1');
const audioTwo = document.querySelector('#audio-2');
const allAudios = document.querySelectorAll('audio');


let intrv, minutes, seconds

const defaultSeconds = "00"
let paused = false;


const times = {
    Promodoro: '25:00',
    Break: '5:00'
}

const startingMinutesForPormodoro = 25;
let time = startingMinutesForPormodoro * 60;

function resetTime() {
    time = startingMinutesForPormodoro * 60;
    console.log("reset ellor", time)
  //  chrome.storage.local.set({when: time});

}

function pauseTimah() {

    paused = false;
    tid = document.querySelector('#time');

}

function timeRanOut(minutes, seconds) {
    return minutes === 0 && seconds === '00'
}

function displayTimeLeft(minutes, seconds) {

    tid.innerHTML = `${minutes}:${seconds}`

    if (timeRanOut(minutes, seconds)) {
        tid.innerHTML = `${startingMinutesForPormodoro}:${defaultSeconds}`
        time = startingMinutesForPormodoro * 60;
        clearInterval(intrv)
        startednow.innerText = "start";
    }

}

/**
 *  Timer logic
 * @param time
 */

/*

function timer(time) {

    if (intrv) {
        clearInterval(intrv)
    }
    intrv = setInterval(() => {

        chrome.storage.local.set({when: time});

        if (!paused) {

            minutes = Math.floor(time / 60);
            seconds = time % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            time--;

            time = time < 0 ? 0 : time

            //       var port = chrome.runtime.connect({name: "knockknock"});
            //     port.postMessage({time: tid.innerHTML});

            displayTimeLeft(minutes, seconds);

        } else {
            pauseTimah()
        }


    }, 1000)

}


document.querySelector('#reset').addEventListener('click', resetTimer, false)
document.querySelector('#start').addEventListener('click', executeTimer, false)

document.querySelector('#myRange').addEventListener('input', volumeControl, false)

document.querySelector('#nature').addEventListener('click', () => {
    stopAllAudio();
    audioOne.play()

})

document.querySelector('#hesset').addEventListener('click', () => {
    stopAllAudio();
    audioTwo.play()

})



function startTimer() {

    if (startednow.innerText === "paused") {

        clearInterval(intrv)

        startednow.innerText = "start";

        paused = true;

    } else {

        timer(time)

        startednow.innerText = "paused"

    }

}



function resetTimer() {

    clearInterval(intrv)
    startednow.innerText = "start";
    document.querySelector('#time').innerHTML = times.Promodoro;
    resetTime()
}




function volumeControl(event) {

    allAudios.forEach(function (audio) {
        audio.volume = event.currentTarget.value / 100;
    });
}



function stopAllAudio() {
    allAudios.forEach(function (audio) {
        audio.pause();
    });
}
*/