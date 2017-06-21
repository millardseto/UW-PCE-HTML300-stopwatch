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

// play audio
function playSound(sound) {
  // we need to get the right <audio> element
  let element = document.getElementById(sound);
  // based on the note passed in
  element.currentTime = 0
  element.play()
}


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



// START/STOP the stopwatch
function stopwatchStart(){
  event.preventDefault();


  // START
  if (this.innerText == "Start") {
    playSound('beep-high');

    // start the time
    intervalId = setInterval(stopwatchUpdate, intervalRate);

    // toggle button text
    this.innerText = "Stop";

    // when the time is running, enable the lap button
    lap.disabled = false;
  } else {
    // STOP
    playSound('beep-low');

    // toggle button text
    this.innerText = "Start";

    // stop the time
    clearInterval(intervalId);

    // since the time is not running, disable the lap button
    lap.disabled = true;
  }
}

// STOP - stops the running time
function stopwatchStop(){
  event.preventDefault();

  // Stop the clock
  clearInterval(intervalId);

  // lap not needed when clock is stopped
  lap.disabled = true;
}


// display updated elapsed time
function stopwatchUpdate(){
  rawTime += intervalRate;
  stopwatchTime.innerHTML = formatTime(rawTime);
}

// LAP - save the current time to the lap log, keep clock running
function stopwatchLap(){
  event.preventDefault();
  playSound('beep-low');

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

// RESET - stop and reset the stopwatch
function stopwatchReset(){
  event.preventDefault();
  playSound('beep-double');

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
  start.innerText = "Start";

  // since the time is not running, disable the lap button
  lap.disabled = true;
}

// When the dom is ready, wire up event handlers
document.addEventListener("DOMContentLoaded", function () {
  // event handlers
  start.addEventListener('click', stopwatchStart);
  lap.addEventListener('click', stopwatchLap);
  reset.addEventListener('click', stopwatchReset);

  // since the time is not running, disable the lap button
  lap.disabled = true;
})
