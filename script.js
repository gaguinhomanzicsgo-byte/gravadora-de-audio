// script.js - Audio Recording Studio Functionality

// Request access to the microphone
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.ondataavailable = function(event) {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = function() {
      const audioBlob = new Blob(audioChunks);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    };

    // Start recording
    mediaRecorder.start();

    // Stop recording after 5 seconds
    setTimeout(function() {
      mediaRecorder.stop();
    }, 5000);
  })
  .catch(function(err) {
    console.log('The following error occurred: ' + err);
  });