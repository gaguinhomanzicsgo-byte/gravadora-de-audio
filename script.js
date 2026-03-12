// script.js

let mediaRecorder;
let recordedChunks = [];

// Function to start recording
function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
    }).catch(err => {
        console.error('Error accessing audio devices:', err);
    });
}

// Function to stop recording
function stopRecording() {
    return new Promise(resolve => {
        mediaRecorder.stop();
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
            recordedChunks = [];
            resolve(audioBlob);
        };
    });
}

// Function to play the recorded audio
function playAudio(audioBlob) {
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
}

// Function to download the recorded audio
function downloadAudio(audioBlob, filename) {
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Sample usage:
// startRecording();
// stopRecording().then(audioBlob => {
//     playAudio(audioBlob);
//     downloadAudio(audioBlob, 'recording.wav');
// });