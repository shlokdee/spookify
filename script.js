

    var audioCtx = new AudioContext();
var lightnotes=[261.63, 293.66, 329.63, 349.23, 392, 440, 493.88]
var darknotes=[277.18, 311.13, 369.99, 415.30, 466.16]
var lightkeys=["a","s","d","f","g","h","j" ]
var darkkeys=["w", "e", "t", "y", "u"]
var keyboard=document.getElementById("keyboard")

for (let i=0; i<lightnotes.length; i++){
    const button=document.createElement("button");
    button.textContent=lightkeys[i]
    button.addEventListener("click", function(){
        playnote(lightnotes[i])
    })
    button.classList.add("lightbutton")
    keyboard.appendChild(button);

}

for (let i=0; i<darknotes.length; i++){
    const button=document.createElement("button");
    button.textContent=darkkeys[i]
    button.addEventListener("click", function(){
        playnote(darknotes[i])
    })
    button.classList.add("darkbutton")
    keyboard.appendChild(button);

}

document.addEventListener("keydown", (event)=>{
    if (event.repeat) return;
    for (let i=0; i<lightnotes.length; i++){
        if (event.key===lightkeys[i]){
            playnote(lightnotes[i])
        }
    }
})

document.addEventListener("keydown", (event)=>{
    if (event.repeat) return;
    for (let i=0; i<darknotes.length; i++){
        if (event.key===darkkeys[i]){
            playnote(darknotes[i])
        }
    }
})

function playnote(freq){
    audioCtx.resume()
    var tone = audioCtx.createOscillator();
    var volume = audioCtx.createGain();
    var tone2=audioCtx.createOscillator();

    var lfo = audioCtx.createOscillator();
    var lfogain = audioCtx.createGain()

    tone.type = 'sawtooth';
    tone2.type="sawtooth";
    tone.frequency.value = freq;


    lfo.type="sine"
    lfo.frequency.value=15;
    lfogain.gain.value=15;

    tone2.frequency.value=freq;
    tone2.detune.value=50;

    lfo.connect(lfogain);
    lfogain.connect(tone.frequency)


    volume.gain.value = 0.2;
    tone.connect(volume);
    tone2.connect(volume);
    volume.connect(audioCtx.destination);

    
    lfo.start();
    tone.start();
    tone2.start();
    volume.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime+1)
    tone.stop(audioCtx.currentTime+1);
    tone2.stop(audioCtx.currentTime+1);
    lfo.stop(audioCtx.currentTime+1);
}