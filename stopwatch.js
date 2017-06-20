// button controls
const start = document.querySelector('button.start');
const lap = document.querySelector('button.lap');
const reset = document.querySelector('button.reset');

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



// start the stopwatch
function stopwatchStart(){
  event.preventDefault();

  // when the time is running, enable the lap button
  lap.disabled = false;
  if (this.innerText == "Start") {
    // start the time
    intervalId = setInterval(stopwatchUpdate, intervalRate);

    // toggle button text
    this.innerText = "Stop";

    // enable the lap button
    lap.disabled = false;
  } else {
    // toggle button text
    this.innerText = "Start";

    // stop the time
    clearInterval(intervalId);

    // since the time is not running, disable the lap button
    lap.disabled = true;
  }
}

function stopwatchStop(){
  event.preventDefault();
  clearInterval(intervalId);
  lap.disabled = true;
}


// display updated elapsed time
function stopwatchUpdate(){
  rawTime += intervalRate;
  stopwatchTime.innerHTML = formatTime(rawTime);
}

// save the current time to the lap log, keep clock running
function stopwatchLap(){
  event.preventDefault();


  // save log to log array
  laps.push(formatTime(rawTime));

  // show the time to lap log
  lapList.innerHTML = "";

  for(var time of laps){
    li = document.createElement("li");
    li.innerText = time;
    lapList.appendChild(li);
  }

}

// stop and reset the stopwatch
function stopwatchReset(){
  event.preventDefault();

  // watch could be running, stop it.
  stopwatchStop();

  // clear the log
  laps.splice(0); // workaround to clear constant array
  lapList.innerHTML = "";

  // clear the time
  rawTime = 0;
  stopwatchTime.innerHTML = formatTime(rawTime);

  // reenable start button
  start.disabled = false;

  // since the time is not running, disable the lap button
  lap.disabled = true;
}

document.addEventListener("DOMContentLoaded", function () {
  // event handlers
  start.addEventListener('click', stopwatchStart);
  lap.addEventListener('click', stopwatchLap);
  reset.addEventListener('click', stopwatchReset);

  // since the time is not running, disable the lap button
  lap.disabled = true;
})
