
function sendData(sendUrl, data, successCallBack, errorCallBack, method="POST", contentType="application/json"){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		switch(this.readyState){
			case 1:
				console.log("connection established");
				break;
			case 2:
				console.log("request received");
				break;
			case 3:
				console.log("processing req");
				break;
		}
		if(this.readyState==4){
			if(this.status == 200){
				return successCallBack(this.responseText);
			}
			errorCallBack(this.responseText);

		}
	};
	xmlhttp.open(method, sendUrl, true);
	xmlhttp.setRequestHeader("Content-Type", contentType);
	xmlhttp.send(JSON.stringify(data));	

}

function sendGoogleSpeechRequest(data, successCallBack, errorCallBack, sampleRate){
	// var speechUrl = "https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyBOjYjPU29kpuq6DVbuimRFbcZ93hFmnr4";
	var speechUrl = "http://localhost/voice";
	requestPayload = {
      "config": {
        "encoding":"LINEAR16",
        "sampleRateHertz":sampleRate,
        "languageCode":"en-US"
      },
      "audio": {
        "content": data
      }
    };
    sendData(speechUrl, requestPayload, successCallBack, errorCallBack);
}