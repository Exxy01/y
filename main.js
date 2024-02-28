status1 = "";
objects = [];

function setup(){
canvas = createCanvas(400,400);
canvas.center();
video = createCapture(VIDEO);
video.hide();
}
function start(){
    objectDetection = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Ststus:DETECTING OBJECTS";
     object_name = document.getElementById("input").value;

}
function modelLoaded(){
    console.log("model loaded.")
    status1 = true;
}
function draw(){
    image(video, 0, 0, 380, 380);
    document.getElementById("status").innerHTML = "STATUS:OBJECTS HAVE BEEN DETECTED";
    if(status1 != 0){
        for(i = 0; i < objects[0].length; i++){
            confidence = floor(objects[i] * 100);
            text(objects.label[i] + " " + confidence + "%", objects[i].x, objects[i].y);
            rect(objects[i].x + objects[i].y + objects[i].width + objects[i].height)
        }
        if(objects[i].label == object_name){
            video_webcamLiveView.stop();
            objectDetector.detect(gotResults);
            document.getElementById("check-status").innerHTML = "object mentioned found.";
            please = window.speechSynthesis;
            sus = "Object not found";
            utterThis = new SpeechSynthesisUtterance(sus);
            please.speak(utterThis);
        }
        else{
            document.getElementById("check-status").innerHTML = "object mentioned not found.";
        }
    }
}
function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}