var audioInput = null;
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();
window.onload = function(){
  // alert("hi");
  audioInput = document.querySelector('#audioInput');
};
function startAudio(){
  // Put variables in global scope to make them available to the browser console. 
var gUserMedia = navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
var constraints = window.constraints = {
  audio: true
};
var errorElement = document.querySelector('#errorMsg');

navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  // if(recorder==null){
	var source = audioContext.createMediaStreamSource(stream);
	recorder = new Recorder(audioContext, source);
  // }
  recorder.record();
  var audioTracks = stream.getAudioTracks();
  console.log('Got stream with constraints:', constraints);
  console.log('Using video device: ' + audioTracks[0].label);
  stream.onremovetrack = function() {
    console.log('Stream ended');
  };
  window.stream = stream; // make variable available to browser console
  audioInput.srcObject = stream;
  audioInput.play();
})
.catch(function(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
        constraints.video.width.exact + ' px is not supported by your device.');
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg('getUserMedia error: ' + error.name, error);
});

function errorMsg(msg, error) {
  errorElement.innerHTML += '<p>' + msg + '</p>';
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}
}

function stopAudio(){
	if(audioInput!=null){
		audioInput.pause();
	}
	if(window.stream){		
		window.stream.getAudioTracks()[0].stop();
	}
	recorder && recorder.stop(audioInput);
}