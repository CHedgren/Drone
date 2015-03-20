var context = new AudioContext();





    function createOscillators(freq, oscno) {

    var oscillators = [];

    var amps = [];
    var filters = [];


    for (i = 0; i < oscno; i++) {


        filters[i] = context.createConvolver();

        oscillators[i] = context.createOscillator();
        oscillators[i].type = "sawtooth";
        oscillators[i].frequency.value = freq;
        amps[i] = context.createGain();

        oscillators[i].connect(filters[i]);
        filters[i].connect(amps[i]);
        amps[i].connect(context.destination);


        if (i % 2 == 0) {
            oscillators[0].detune.value = Math.random() * 100;
        }
        oscillators[i].start();


        console.log(i);
        console.log(oscillators[i]);


    }

}

createOscillators(40, 10);






var butt = document.getElementById("stop");
console.log(butt);
butt.addEventListener('click',mute);


var canvas = document.getElementById("drone-control");
console.log(canvas);
canvas.addEventListener('mouseover', mouser);

function mouser(){

}
var volume;


function mute(){
    console.log("Volume " + volume + " " );


    if (document.getElementById("stop").value == 0) {
        volume = document.getElementById("volumeslider").value;

        for (i = 0; i < amps.length; i++) {
            createOscillators.amps[i].gain.value = 0;

        }
        document.getElementById("volumeslider").value = 0;
        document.getElementById("stop").value = 1;

    }
    else if ( document.getElementById("stop").value == 1) {
        for (i = 0; i < amps.length; i++) {
            amps[i].gain.value = volume/100;
            document.getElementById("volumeslider").value = volume;
            document.getElementById("stop").value = 0;
            }

        }

    }




var toneslider = document.getElementById("toner");
console.log(toneslider);
toneslider.addEventListener("input", tonechange);

function tonechange() {
    for (i = 0; i < oscillators.length; i++) {
        oscillators[i].frequency.value = toneslider.value;
        console.log(toneslider.value);
    }
}



var volumeslider = document.getElementById("volumeslider");
console.log(volumeslider);
volumeslider.addEventListener("input", volumechange);

function volumechange() {
    for (i = 0; i < amps.length; i++) {
        amps[i].gain.value = volumeslider.value/100;
        console.log(volumeslider.value);
    }
}