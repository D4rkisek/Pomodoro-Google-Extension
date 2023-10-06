// Set up a recurring alarm for the study timer
chrome.alarms.create("studyTimer", {
  periodInMinutes: 1 / 60, // One second
});

// Listen for alarms and handle the study timer logic
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "studyTimer") {
    chrome.storage.local.get(["timer", "isRunning"], (res) => {
      if (res.isRunning) {
        // Increment the timer and set it as running
        let timer = res.timer + 1;
        let isRunning = true;

        // If the timer runs out
        if (timer === 60*25) { 
          // Create a notification banner
          this.registration.showNotification("Study Timer", {
            body: "Time for a breather!",
            icon: "icon-128.png",
          });

          // Reset the timer and stop it
          timer = 0;
          isRunning = false;
        }

        // Update the timer and running status in local storage
        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

// Initialize or retrieve timer and isRunning values in local storage
chrome.storage.local.get(["timer", "isRunning"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    isRunning: "isRunning" in res ? res.isRunning : false,
  });
});

