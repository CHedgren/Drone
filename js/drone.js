var context = new AudioContext();
var analyser = context.createAnalyser();
var splitter = context.createChannelSplitter(2);


var amp      = context.createGain();





    var oscillators = [];

    var amps = [];
    var filters = [];
    oscno = 64;


    for (i = 0; i < oscno; i++) {


        filters[i] = context.createConvolver();
        amps[i] = context.createGain();
        oscillators[i] = context.createOscillator();
        oscillators[i].type = (i%2)==0 ?"sawtooth":"sine";
        oscillators[i].frequency.value =880 //(i%2)==0 ? 40:(i%1)==0?160:80;
        oscillators[i].channelCountMode = 'explicit';
        oscillators[i].channelCount = 1;

        oscillators[i].connect(amps[i]);
        amps[i].connect(analyser);
        // oscillators[i].connect(merger, 0, i);
        //filters[i].connect(amps[i]);
        // amps[i].connect(context.destination);
        amps[i].gain.value = 1/oscno;

        amps[i].connect(context.destination);

        if (i % 2 == 0) {
            oscillators[0].detune.value = Math.floor(Math.random() * 100);
        }
        oscillators[i].start();


        console.log(i);
        console.log(oscillators[i]);


    }





analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
analyser.smoothingTimeConstant = 1;
analyser.getByteTimeDomainData(dataArray);
analyser.maxDecibels =500;



// draw an oscilloscope of the current audio source
var canvas = document.getElementById('drone-control');
var canvasCtx = canvas.getContext('2d');

function draw() {

    drawVisual = requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

    canvasCtx.beginPath();

    var sliceWidth = canvas.width * 1.0 / (bufferLength);
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / (128.0);
        var y = v * canvas.height/2 ;

        if(i === 0) {
            canvasCtx.moveTo(x, y);
        } else {
            canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height/2);
    canvasCtx.stroke();
};

draw();










 time = 40;
 freq = 40;

setInterval(function(){
    time += 0.01
    for (i = 0; i < oscno; i++)
    oscillators[i].frequency.value = (10*Math.sin(time) +((i%2)==0 ? freq:(i%1)==0?2*freq:3*freq));
}, 16);








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
            amps[i].gain.value = 0;

        }
        document.getElementById("volumeslider").value = 0;
        document.getElementById("stop").value = 1;

    }
    else if ( document.getElementById("stop").value == 1) {
        for (i = 0; i < amps.length; i++) {
            amps[i].gain.value = volume/10000;
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
        freq= toneslider.value;
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