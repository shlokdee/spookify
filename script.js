


function playnote(freq){
    var audioCtx = new AudioContext();
    var tone = audioCtx.createOscillator();
    var volume = audioCtx.createGain();
    tone.type = 'sine';
    tone.frequency.value = freq;
    volume.gain.value = 0.5;
    tone.connect(volume);
    volume.connect(audioCtx.destination);
    tone.start();
    tone.stop(audioCtx.currentTime+1);
}