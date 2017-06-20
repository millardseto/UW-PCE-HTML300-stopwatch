// button controls
const start = document.querySelector('button.start');
const stop = document.querySelector('button.stop');

// DOM elements that need to update
const lapList = document.querySelector('#lapList');
const stopwatchTime = document.querySelector('#stopwatchTime');

// constants that shouldn't ever change
const laps = [];
const intervalRate = 10; // update the stopwatch every xxx milliseconds

// values that will change pretty often
let intervalId = null;
let rawTime = 0;

// turns the time into a human readable format
function formatTime (raw) {
  let seconds = Math.floor(raw / 1000)
  let fractionalSeconds = (raw % 1000) / 1000
  let minutes = Math.floor(seconds / 60)
  seconds = seconds - (60 * minutes) + fractionalSeconds

  return `${zeroPad(minutes)}:${zeroPad(seconds.toFixed(2))}`
}

// adds a leading zero because humans like them
function zeroPad (value) {
  let pad = value < 10 ? '0' : ''
  return `${pad}${value}`
}

start.addEventListener('click', stopwatchStart);
stop.addEventListener('click', stopwatchStop);

function stopwatchStart(){
  event.preventDefault();
  console.log('started');

  intervalId = setInterval(stopwatchUpdate, intervalRate);
}

function stopwatchStop(){
  event.preventDefault();
  console.log('stopped');

  clearInterval(intervalId);
}



function stopwatchUpdate(){
  rawTime += intervalRate;
  stopwatchTime.innerHTML = rawTime;
}

function stopwatchLap(){
  event.preventDefault();
  console.log('lapped');
}

function stopwatchReset(){
  event.preventDefault();
  console.log('reset');
}

document.addEventListener("DOMContentLoaded", function () {
  console.log('ready!')


})
