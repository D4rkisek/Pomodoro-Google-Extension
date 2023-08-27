document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const timerDisplay = document.getElementById('timer');
    const notificationSound = document.getElementById('notificationSound');

    let timer;
    let timeLeft = 30 * 60; // 30 minutes in seconds
    let isTimerRunning = false;

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        if (!isTimerRunning) {
            isTimerRunning = true;
            startButton.disabled = true; // Disable the start button
            timer = setInterval(function () {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimerDisplay();
                } else {
                    clearInterval(timer);
                    isTimerRunning = false;
                    notificationSound.play();
                    startButton.disabled = false; // Re-enable the start button when the timer finishes
                }
            }, 1000);
        }
    }

    function stopTimer() {
        if (isTimerRunning) {
            clearInterval(timer);
            isTimerRunning = false;
            startButton.disabled = false; // Re-enable the start button when stopping the timer
        }
    }

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
});
