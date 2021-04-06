/***
 * @TODO
 *
 * generator function for random value froim array of songs
 *
 */

let startednow = document.getElementById('start');
let tid = document.querySelector('#time');


let intrv, minutes, seconds
const defaultSeconds = "00"
let paused = false;


const times = {
    Promodoro: '1:00',
    Break: '5:00'
}

const startingMinutesForPormodoro = 1;
let time = startingMinutesForPormodoro * 60;

function resetTime() {
    time = startingMinutesForPormodoro * 60;
}

function pauseTimah() {

    paused = false;
    tid = document.querySelector('#time');


    console.log("i else", tid)

}

function timerSet(bet){

    console.log("i timerset", bet)

    if (intrv) {
        clearInterval(intrv)
    }

    intrv = setInterval(() => {
        console.log("i inetrvall", bet)

        if(!paused) {

        minutes = Math.floor(time / 60);
        seconds = time % 60;


        seconds = seconds < 10 ? '0' + seconds : seconds;
        bet.innerHTML = `${minutes}:${seconds}`
        time--;
        time = time < 0 ? 0 : time
        if (minutes === 0 && seconds === '00') {
            bet.innerHTML = `${startingMinutesForPormodoro}:${defaultSeconds}`
            time = startingMinutesForPormodoro * 60;
            clearInterval(intrv)
            startednow.innerText = "start";

        }
        } else {
            pauseTimah()
        }

    }, 1000)

}

    document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#reset').addEventListener('click', resetTimer, false)
    document.querySelector('#start').addEventListener('click', startTimer, false)

    function startTimer() {


        tid = document.querySelector('#time');

        console.log("efter", tid)
        if(startednow.innerText === "paused"){

            clearInterval(intrv)

            startednow.innerText = "start";

            paused = true;

        }
        else {
            timerSet(tid)

            startednow.innerText = "paused"
            console.log("insidan ", tid)
        }

    }

    function resetTimer() {
        clearInterval(intrv)
        startednow.innerText = "start";
        document.querySelector('#time').innerHTML = times.Promodoro;
        resetTime()

    }




})