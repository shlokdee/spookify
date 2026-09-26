
var lightbuttons=[]
var darkbuttons=[]

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
    lightbuttons.push(button)

}

for (let i=0; i<darknotes.length; i++){
    const button=document.createElement("button");
    button.textContent=darkkeys[i]
    button.addEventListener("click", function(){
        playnote(darknotes[i])
    })
    button.classList.add("darkbutton")
    keyboard.appendChild(button);
    darkbuttons.push(button)

}

document.addEventListener("keydown", (event)=>{
    if (event.repeat) return;
    for (let i=0; i<lightnotes.length; i++){
        if (event.key===lightkeys[i]){
            playnote(lightnotes[i])
            lightbuttons[i].classList.add("active")
        }
    }
})

document.addEventListener("keyup", (event)=>{
    if (event.repeat) return;
    for (let i=0; i<lightnotes.length; i++){
        if (event.key===lightkeys[i]){
            lightbuttons[i].classList.remove("active")
        }
    }
})


document.addEventListener("keydown", (event)=>{
    if (event.repeat) return;
    for (let i=0; i<darknotes.length; i++){
        if (event.key===darkkeys[i]){
            playnote(darknotes[i])
            darkbuttons[i].classList.add("active")
        }
    }
})

document.addEventListener("keyup", (event)=>{
    if (event.repeat) return;
    for (let i=0; i<darknotes.length; i++){
        if (event.key===darkkeys[i]){
            darkbuttons[i].classList.remove("active")
        }
    }
})

var tonetype= document.getElementById("tonetype").value
var detunetype=document.getElementById("detunetype").value
var detuneval=document.getElementById("detuneval").value;
var lfotype=document.getElementById("lfotype").value
var lfofreq=15
var lfogain=15
var volgain=0.2


function playnote(freq){
    audioCtx.resume()
    var tone = audioCtx.createOscillator();
    var volume = audioCtx.createGain();
    var tone2=audioCtx.createOscillator();

    var lfo = audioCtx.createOscillator();
    var lfogain = audioCtx.createGain()

    tone.type = tonetype
    tone2.type=detunetype;
    tone.frequency.value = freq;


    lfo.type=lfotype
    lfo.frequency.value=lfofreq;
    lfogain.gain.value=lfogain;

    tone2.frequency.value=freq;
    tone2.detune.value=detuneval;

    lfo.connect(lfogain);
    lfogain.connect(tone.frequency)


    volume.gain.value = volgain;
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

const canvas=document.getElementById("dropper")
const ctx = canvas.getContext("2d");

var xposlight=[80, 130, 180, 230, 280, 330, 380]
var xposdark=[104, 154, 254,304 ,354 ]
var keylenlight=7
var keylendark=5




ctx.fillStyle="#39FF14";
var y=290;
var speed=3.33;

var pattern=[2,5,2,6]
var delay=400

var animid=null

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    y += speed;
    for (let i=0;i<pattern.length; i++){
        ctx.fillRect(xposlight[pattern[i]], y-i*80, 40, 80)

    }

    var lastnotey=y-(pattern.length-1)*80
    if (lastnotey<400){
        animid=requestAnimationFrame(animate);
    }
    


    
}

function animationstart(){

    if (animid){
        cancelAnimationFrame(animid)
    }

    y=0;
    animate();
}

