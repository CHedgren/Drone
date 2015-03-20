var context = new AudioContext();


var freq = 80;
var semitone = 1;
var oscillators = [];
var oscno = 2;
var amps = [];

for (i = 0; i < oscno; i++) {
    oscillators[i] = context.createOscillator();
    oscillators[i].type = "sawtooth";
    amps[i] = context.createGain();
    oscillators[i].connect(amps[i]);
    amps[i].connect(context.destination);
    oscillators[i].start();


    console.log(i);
    console.log(oscillators[i]);


}


oscillators[0].frequency.value = freq;
oscillators[1].frequency.value = freq;
oscillators[0].detune.value = semitone * 100;





//add a slider to control things instead.

var butt = document.getElementById("stop");
console.log(butt);
butt.addEventListener('click',mute);


var canvas = document.getElementById("drone-control");
console.log(canvas);
canvas.addEventListener('mouseover', mouser);

function mouser(){

}

function mute(){
    osc1.stop(1);
    osc2.stop(2);
}

var toneslider = document.getElementById("toner");
console.log(toneslider);
toneslider.addEventListener("change", tonechange);

function tonechange() {
    for (i = 0; i < oscillators.length; i++) {
        oscillators[i].frequency.value = toneslider.value;
        console.log(toneslider.value);
    }
}