
var lightbuttons=[]
var darkbuttons=[]


var patterns = {
    "pattern1": [2, 3, 2, 6, 3, 2, 3, 0, 2, 3, 2, 6, 5, 3, 2, 6],
    "pattern2": [6, 1, 3, 1, 6, 1, 3, 6, 2, 3, 2, 6, 3, 1, 6, 6],
    "pattern3": [2, 3, 2, 0, 2, 3, 6, 3, 2, 3, 2, 0, 1, 0, 6, 2],
    "pattern4": [2, 0, 3, 0, 2, 0, 6, 0, 2, 3, 6, 3, 2, 0, 6, 0],
    "pattern5": [5, 2, 3, 2, 5, 2, 3, 6, 5, 2, 3, 2, 1, 0, 6, 5]
};

const patternselect=document.getElementById("patterns")
for (let i in patterns){
    const option=document.createElement("option")
    option.value=i;
    option.textContent=i
    patternselect.appendChild(option)
}


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


document.addEventListener("keydown", (event)=>{
    if (event.repeat) return;
    if (waiting==-1) return
    if (event.key===lightkeys[pattern[waiting]]){
        intplayed[waiting]=1
        waiting=-1
    }})

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




function playnote(freq){


    var tonetype= document.getElementById("tonetype").value
var detunetype=document.getElementById("detunetype").value
var detuneval=parseFloat(document.getElementById("detuneval").value)
var lfotype=document.getElementById("lfotype").value
var lfofreq=parseFloat(document.getElementById("lfofreq").value)
var lfogainselec=parseFloat(document.getElementById("lfogainselec").value)
var volgain=parseFloat(document.getElementById("volgain").value)

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
    lfogain.gain.value=lfogainselec;

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


var delay=400

var animid=null
var pattern=[]

var autoplayed=[]
var intplayed=[]

var autoplaycheckedornot=false
var intplaycheckedornot=false
var waiting=-1

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (waiting==-1){
    y += speed;
    }
    for (let i=0;i<pattern.length; i++){
        ctx.fillRect(xposlight[pattern[i]], y-i*80, 40, 80)
        if (autoplaycheckedornot && (y-i*80)>=210 && autoplayed[i]==0){
            playnote(lightnotes[pattern[i]])
            autoplayed[i]=1
        }
        if (intplaycheckedornot && (y-i*80)>=210 && waiting==-1 && intplayed[i]==0){
            waiting=i
        }

    }

    var lastnotey=y-(pattern.length-1)*80
    if (lastnotey<400){
        animid=requestAnimationFrame(animate);
    }
    


    
}


document.getElementById("autoplay").addEventListener("change", function(){
    if (this.checked){
        document.getElementById("intplay").checked=false
    }
})

document.getElementById("intplay").addEventListener("change", function(){
    if (this.checked){
        document.getElementById("autoplay").checked=false
    }
})

function animationstart(){
    pattern=patterns[patternselect.value]
    autoplaycheckedornot=document.getElementById("autoplay").checked
    intplaycheckedornot=document.getElementById("intplay").checked
    waiting=-1
    autoplayed=[]
    
    for (let i=0; i<pattern.length; i++){
    autoplayed.push(0)
    intplayed.push(0)
}
    if (animid){
        cancelAnimationFrame(animid)
    }

    y=0;
    animate();
}

