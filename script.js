let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");


function populateVoiceOptions() {
    voiceSelect.innerHTML = ""; 
    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });
    speech.voice = voices[0]; 
}

voices = window.speechSynthesis.getVoices();
if (voices.length > 0) {
    populateVoiceOptions();
} else {
    // If no voices are initially loaded, set an event listener
    window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        populateVoiceOptions();
    };
}

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
