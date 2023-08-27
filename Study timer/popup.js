document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const timerDisplay = document.getElementById('timer');
    const notificationSound = document.getElementById('notificationSound');

    let timer;
    let timeLeft = 30 * 60; // 30 minutes in seconds

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function startTimer() {
        timer = setInterval(function () {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                notificationSound.play();
            }
        }, 1000);
    }

    startButton.addEventListener('click', startTimer);
});
