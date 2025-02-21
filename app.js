var frontCamera = false;
var currentStream;
cameraView = document.querySelector("#camera-view"),
cameraDevice = document.querySelector("#camera-device"),
photoDevice = document.querySelector("#photo-display"),
takePhotoButton = document.querySelector("#take-photo-button");
frontCameraButton = document.querySelector("#front-camera-button");

function cameraStart(){
    if(typeof currentStream!== 'undefined'){
        currentStream.getTracks().forEach(track =>{
            track.stop();
        });
    }

var constraints ={video:{facingMode: (frontCamera? "user" : "environment") },audio:false};

navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream){
        currentStream =stream;
        cameraDevice.srcObject =stream;
    })

    .catch(function(error){
        console.error("Error happened.",error);
    }

);}

takePhotoButton.onclick = function() {
    cameraView.width = cameraDevice.videoWidth;
    cameraView.height = cameraDevice.videoHeight;
    cameraView.getContext("2d").drawImage(cameraDevice, 0, 0);
    photoDisplay.src = cameraView.toDataURL("image/webp");
    photoDisplay.classList.add("photo-taken");
};

// If Front/Back camera is click => Change to front/back camera accordingly
frontCameraButton.onclick = function() {
    // Toggle the frontCamera variable
    frontCamera = !frontCamera;
    // Setup the button text
    if (frontCamera) {
        frontCameraButton.textContent = "Back Camera";
    }
    else {
        frontCameraButton.textContent = "Front Camera";
    }
    // Start the video streaming
    cameraStart();
};

// Start the camera and video streaming when the window loads
// 1st parameter: Event type
// 2nd parameter: Function to be called when the event occurs
window.addEventListener("load", cameraStart);
