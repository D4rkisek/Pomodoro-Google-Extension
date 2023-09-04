const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');

function toggleTimer() {
    chrome.storage.local.get(["isRunning"], (res) => {
        chrome.storage.local.set({
            isRunning: !res.isRunning,
        }, () => {
            startButton.textContent = !res.isRunning ? "Pause Timer" : "Start Timer"
        });
    });
}

function restartTimer() {
    chrome.storage.local.set({
        timer: 0,
        isRunning: false,
    }, () => {
        startButton.textContent = "Start Timer"
    });
}

startButton.addEventListener("click", toggleTimer);
restartButton.addEventListener("click", restartTimer);