const video = document.getElementById("video");

// Camera Start
navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
.then(stream => video.srcObject = stream)
.catch(() => alert("Camera permission needed!"));

// Compliment list
const compliments = [
    "you look absolutely stunning 😍",
    "your smile is beautiful 💖",
    "you are glowing today ✨",
    "you look perfect 🥺",
    "you just made my day 😊",
    "you are the definition of beauty 💕",
    "I can't take my eyes off you 😳"
];

// Voice function
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

// Load face-api model (CDN)
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(
        "https://cdn.jsdelivr.net/npm/face-api.js/weights"
    )
]).then(startDetection);

// Face detection loop
function startDetection() {
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(
            video,
            new faceapi.TinyFaceDetectorOptions()
        );

        if (detections.length > 0) {
            giveCompliment();
        }
    }, 4000);
}

// Generate compliment
function giveCompliment() {
    const name = document.getElementById("name").value || "Hey";

    const random = Math.floor(Math.random() * compliments.length);
    const message = `${name}, ${compliments[random]}`;

    document.getElementById("compliment").innerText = message;

    speak(message);
}