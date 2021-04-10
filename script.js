let refreshDisplayTimeout;
let bgpage = chrome.extension.getBackgroundPage();
let editing = false;

document.addEventListener('DOMContentLoaded', function () {

document.querySelector('#start').addEventListener('click', setTimer, false)

document.querySelector('#reset').addEventListener('click', restartTimer, false)

document.querySelector('#stop').addEventListener('click', pauseTimer, false)
//document.querySelector('#myRange').addEventListener('input', volumeControl, false)

});


console.log(bgpage.init())

function show(section)
{
    document.getElementById(section).style.display = "block";
}

function showInline(section)
{
    document.getElementById(section).style.display = "inline";
}

function hide(section)
{
    document.getElementById(section).style.display = "none";
}



function load()
{
    hide("settings");
    hide("modify");
    hide("resume");
    editing = false;

    // if timer is paused, show resume button and hide pause button
    if(bgpage.pauseDate)
    {
        showInline("resume");
        hide("pause");
    }

    // loads custom times if they exist
    for(var i = 0; i < document.choices.radio.length; i++)
        if(localStorage[i] != null)
            document.getElementById("s"+i).textContent = localStorage[i];

    // if timer is off, show settings
    if(!bgpage.alarmDate)
    {
        show("settings");
        hide("display");
    }

    // else, show countdown
    else
    {
        show("display");
        refreshDisplay();
        show("modify");
    }
}

function getChoice()
{
    // find selected RADIO, RETURN selected value
    var num;
    for(var i = 0; i < document.choices.radio.length; i++)
    {
        if(document.choices.radio[i].checked == true)
            num = parseInt(document.getElementById("s"+i).textContent);
    }
    return num;
}

function swap()
{
    editing = true;

    // swap text with fields
    for(var i = 0; i < document.choices.radio.length; i++)
    {
        var span = document.getElementById("s"+i);
        var num = parseInt(span.textContent);

        previousValues[i] = num;

        var html = "<input class='input-mini' type='text' name='custom' id='c"+i;
        html += "' value='"+num;
        html += "'>";
        // used to select on click and auto save on change

        span.innerHTML = html;
    }

    // swap edit button with done button
    var butt = document.getElementById("swapper");
    butt.innerHTML = "<a href='#' id='done' class='btn'><i class='icon-ok'></i></a>";
    document.querySelector('#done').addEventListener('click', swapBack);
}

function swapBack()
{
    // swap fields with text
    for(var i = 0; i < document.choices.radio.length; i++)
    {
        var span = document.getElementById("s"+i);
        var num = parseInt(document.getElementById("c"+i).value);

        if(isValid(num))
        {
            localStorage[i] = num;
            span.textContent = num;
        }
        else
            span.textContent = previousValues[i];
    }

    // swap done button with edit button
    var butt = document.getElementById("swapper");
    butt.innerHTML = "<a href='#' id='wrench' class='btn'><i class='icon-wrench'></i></a>";
    document.querySelector('#wrench').addEventListener('click', swap);

    editing = false;
}

function setTimer()
{
    // make sure we're dealing with text not fields
    if(editing)
        swapBack();

    // SET background timer for selected number
    // HIDE settings, DISPLAY countdown

    var num = getChoice();

    // set timer, hide settings, display reset button
    if(isValid(num))
    {
        bgpage.setAlarm(num * 60000);
        hide("settings");
        show("modify");
        show("display");
        refreshDisplay();
    }
    else
        bgpage.error();
}

// Returns true if 0 <= amt <= 240
function isValid(amt)
{
    if(isNaN(amt) || (amt == null))
        return false;
    else if((amt < 0) || (amt > 240))
        return false;
    else
        return true;
}

function refreshDisplay()
{
    percent = bgpage.getTimeLeftPercent();

    if(percent < 15)
        document.getElementById("bar").style.color = "grey";
    document.getElementById("bar").textContent = bgpage.getTimeLeftString();
    document.getElementById("bar").style.width = percent + "%";

    refreshDisplayTimeout = setTimeout(refreshDisplay, 100);
}

function pauseTimer()
{
    hide("pause");
    showInline("resume");
    bgpage.pause();
    clearTimeout(refreshDisplayTimeout);
}

function resumeTimer()
{
    hide("resume");
    showInline("pause");
    refreshDisplay();
    bgpage.resume();
}

function restartTimer()
{
    hide("resume");
    showInline("pause");
    refreshDisplay();
    bgpage.restart();
}

function reset()
{
    clearTimeout(refreshDisplayTimeout);
    bgpage.turnOff();
    hide("display");
    show("settings");
    hide("modify");
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