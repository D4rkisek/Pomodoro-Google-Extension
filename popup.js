const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const clock = document.getElementById('clock');

function updateClockDisplay(minutes, seconds) {
    clock.textContent = `${minutes}:${seconds}`;
}

function toggleTimerCallback(res) {
    const newIsRunning = !res.isRunning;
    chrome.storage.local.set({ isRunning: newIsRunning }, () => {
        startButton.textContent = newIsRunning ? "Pause Timer" : "Start Timer";
    });
}

function restartTimerCallback() {
    chrome.storage.local.set({ timer: 0, isRunning: false }, () => {
        startButton.textContent = "Start Timer";
    });
}

function updateClock() {
    chrome.storage.local.get(["timer"], (res) => {
        const minutes = 25 - Math.ceil(res.timer / 60);
        let seconds = "00";
        if (res.timer % 60 !== 0) {
            seconds = 60 - (res.timer % 60);
        }
        updateClockDisplay(minutes, seconds);
    });
}

function toggleTimer() {
    chrome.storage.local.get(["isRunning"], toggleTimerCallback);
}

function restartTimer() {
    chrome.storage.local.get(["isRunning"], restartTimerCallback);
}

startButton.addEventListener("click", toggleTimer);
restartButton.addEventListener("click", restartTimer);
updateClock();
setInterval(updateClock, 1000);
