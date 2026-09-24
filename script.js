

    var audioCtx = new AudioContext();
var notes=[261.63, 293.66, 329.63, 349.23, 392, 440, 493.88]
var keyboard=document.getElementById("keyboard")

for (let i=0; i<notes.length; i++){
    const button=document.createElement("button");
    button.addEventListener("click", playnote(notes[i]))
    button.classList.add("whitebutton")
    keyboard.appendChild(button);

}

function playnote(freq){
    audioCtx.resume()
    var tone = audioCtx.createOscillator();
    var volume = audioCtx.createGain();
    tone.type = 'sine';
    tone.frequency.value = freq;
    volume.gain.value = 0.5;
    tone.connect(volume);
    volume.connect(audioCtx.destination);
    tone.start();
    volume.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime+1)
    tone.stop(audioCtx.currentTime+1);
}