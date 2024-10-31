let speech = new SpeechSynthesisUtterance();
let voices = [];
const voiceSelect = document.querySelector("select");
const speakButton = document.querySelector("button");

function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length) {
        populateVoiceOptions();
        speech.voice = voices[0];
    } else {
        setTimeout(loadVoices, 500);
    }
}

function populateVoiceOptions() {
    voiceSelect.innerHTML = "";
    voices.forEach((voice, index) => {
        const option = new Option(voice.name, index);
        voiceSelect.options.add(option);
    });
}

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

speakButton.addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});

if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
} else {
    loadVoices();
}
