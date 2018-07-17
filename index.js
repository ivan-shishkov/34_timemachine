var TIMEOUT_BEFORE_ALERTS_IN_SECS = 3 * 60;
var TIMEOUT_BETWEEN_ALERTS_IN_SECS = 30;
var TEMPLATE = '<div><span class="js-timer-minutes">00</span>:<span class="js-timer-seconds">00</span></div>';

function padZero(number) {
  return ("00" + String(number)).slice(-2);
}

class Timer {
  // IE does not support new style classes yet
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  constructor(timeoutInSecs) {
    this.initialTimeoutInSecs = timeoutInSecs;
    this.reset();
  }

  getTimestampInSecs() {
    var timestampInMilliseconds = new Date().getTime();
    return Math.round(timestampInMilliseconds / 1000);
  }

  start() {
    if (this.isRunning) {
      return;
    }
    this.timestampOnStart = this.getTimestampInSecs();
    this.isRunning = true;
  }

  stop() {
    if (!this.isRunning) {
      return;
    }
    this.timeoutInSecs = this.calculateSecsLeft();
    this.timestampOnStart = null;
    this.isRunning = false;
  }

  reset(timeoutInSecs) {
    this.isRunning = false;
    this.timestampOnStart = null;

    if (timeoutInSecs) {
      this.timeoutInSecs = timeoutInSecs;
    } else {
      this.timeoutInSecs = this.initialTimeoutInSecs;
    }
  }

  calculateSecsLeft() {
    if (!this.isRunning) {
      return this.timeoutInSecs;
    }
    var currentTimestamp = this.getTimestampInSecs();
    var secsGone = currentTimestamp - this.timestampOnStart;
    return Math.max(this.timeoutInSecs - secsGone, 0);
  }
}

class TimerWidget {
  // IE does not support new style classes yet
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
  construct() {
    this.timerContainer = this.minutesElement = this.secondsElement = null;
  }

  mount(rootTag) {
    if (this.timerContainer) {
      this.unmount();
    }
    // adds HTML tag to current page
    this.timerContainer = document.createElement('div');

    this.timerContainer.setAttribute("style", "height: 100px;");
    this.timerContainer.innerHTML = TEMPLATE;

    rootTag.insertBefore(this.timerContainer, rootTag.firstChild);

    this.minutesElement = this.timerContainer.getElementsByClassName('js-timer-minutes')[0];
    this.secondsElement = this.timerContainer.getElementsByClassName('js-timer-seconds')[0];
  }

  update(secsLeft) {
    var minutes = Math.floor(secsLeft / 60);
    var seconds = secsLeft - minutes * 60;

    this.minutesElement.innerHTML = padZero(minutes);
    this.secondsElement.innerHTML = padZero(seconds);
  }

  unmount() {
    if (!this.timerContainer) {
      return;
    }
    this.timerContainer.remove();
    this.timerContainer = this.minutesElement = this.secondsElement = null;
  }
}


function main() {

  var timer = new Timer(TIMEOUT_BEFORE_ALERTS_IN_SECS);
  var timerWidget = new TimerWidget();
  var intervalId = null;

  timerWidget.mount(document.body);

  function handleIntervalTick() {
    var secsLeft = timer.calculateSecsLeft();
    timerWidget.update(secsLeft);
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      timer.stop();
      clearInterval(intervalId);
      intervalId = null;
    } else {
      timer.start();
      intervalId = intervalId || setInterval(handleIntervalTick, 300);
    }
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
  handleVisibilityChange();
}

if (document.readyState === "complete" || document.readyState === "loaded") {
  main();
} else {
  // initialize timer when page ready for presentation
  window.addEventListener('DOMContentLoaded', main);
}
