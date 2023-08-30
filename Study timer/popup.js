document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const timerDisplay = document.getElementById('timer');
    const intervalText = document.getElementById('intervalText');
    const notificationSound = document.getElementById('notificationSound');

    let timer;
    let timeLeft = 25 * 60; // 25 minutes (work interval)
    let isTimerRunning = false;
    let isWorkInterval = true;

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (!isTimerRunning) {
            isTimerRunning = true;
            startButton.disabled = true; // Disable the start button

            // Send a message to the background script to start the timer
            chrome.runtime.sendMessage({ action: 'startTimer' });

            timer = setInterval(function () {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timer);
                    isTimerRunning = false;
                    notificationSound.play();
                    startButton.disabled = false; // Re-enable the start button when the timer finishes

                    if (isWorkInterval) {
                        timeLeft = 5 * 60; // 5 minutes break interval
                        timerDisplay.textContent = '5:00';
                        intervalText.textContent = 'Break Time';
                        intervalText.style.color = '#e74c3c';
                        isWorkInterval = false;
                    } else {
                        timeLeft = 25 * 60; // 25 minutes work interval
                        timerDisplay.textContent = '25:00';
                        intervalText.textContent = 'Work Time';
                        intervalText.style.color = '#2ecc71';
                        isWorkInterval = true;
                    }
                }
            }, 1000);
        }
    }

    function stopTimer() {
        if (isTimerRunning) {
            clearInterval(timer);
            isTimerRunning = false;
            startButton.disabled = false; // Re-enable the start button when stopping the timer
            intervalText.textContent = ''; // Reset the interval text

            
            // Send a message to the background script to stop the timer
            chrome.runtime.sendMessage({ action: 'stopTimer' });
        }
    }

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
});
