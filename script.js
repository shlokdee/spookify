

    var audioCtx = new AudioContext();

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