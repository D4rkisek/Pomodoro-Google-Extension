let timerId;
let timeLeft = 25 * 60; // Initial time: 25 minutes (work interval)
let isTimerRunning = false;
let isWorkInterval = true;

function startTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    timerId = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(timerId);
        isTimerRunning = false;
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon.png', // Replace with the path to your extension's icon
          title: 'Timer Finished',
          message: isWorkInterval ? 'Time for a break!' : 'Back to work!',
        });

        if (isWorkInterval) {
          timeLeft = 5 * 60; // 5 minutes break interval
          isWorkInterval = false;
        } else {
          timeLeft = 25 * 60; // 25 minutes work interval
          isWorkInterval = true;
        }
      }
    }, 1000);
  }
}

function stopTimer() {
  if (isTimerRunning) {
    clearInterval(timerId);
    isTimerRunning = false;
    timeLeft = isWorkInterval ? 25 * 60 : 5 * 60; // Reset time based on the interval
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startTimer') {
    startTimer();
  } else if (request.action === 'stopTimer') {
    stopTimer();
  }
});

