let timer = null;
let timeLeft = 25 * 60;
let isTimerRunning = false;

chrome.runtime.onInstalled.addListener((request, sender, sendResponse) => {
    if (request.action === 'startTimer' && !isTimerRunning) {
        isTimerRunning = true;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                // Update the timer status in the popup using message passing
                chrome.runtime.sendMessage({ action: 'updateTimer', timeLeft });
            } else {
                clearInterval(timer);
                isTimerRunning = false;
                // Send a notification that the timer has finished
                // You can also play the notification sound here
                // ...
            }
        }, 1000);
    } else if (request.action === 'stopTimer' && isTimerRunning) {
        clearInterval(timer);
        isTimerRunning = false;
        // Send a message to stop the timer in the popup
        chrome.runtime.sendMessage({ action: 'stopTimer' });
    }
});
