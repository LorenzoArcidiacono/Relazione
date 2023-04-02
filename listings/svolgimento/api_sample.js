function getPlatformInfo() {
    function successCallback(cbObject) {
        console.log("[Platform Info]:"+JSON.stringify(cbObject));
 
        // Do something
        ...
    }
 
    function failureCallback(cbObject) {
        var errorCode = cbObject.errorCode;
        var errorText = cbObject.errorText;
 
        console.log("Error Code ["+errorCode+"]:"+errorText);
    }
 
    var deviceInfo = new DeviceInfo();
    deviceInfo.getPlatformInfo(successCallback, failureCallback);
}

// Risposta in caso di successo
{
    "modelName": "WEBOS1",
    "serialNumber": "SKJY1107",
    "firmwareVersion": "03.00.12",
    "hardwareVersion": "1",
    "sdkVersion": "1.0.20945",
    "manufacturer": "LGE"
}

// Risposta in caso di errore
{
    "errorCode" : "201",
    "errorText" : "Connection Refused"
}


function setPortraitMode() {
    var options = {
        portraitMode: Signage.OsdPortraitMode.ON
    };
 
    var successCallback = function () {
        console.log("Portrait Mode successfully Set");
    };
 
    var failureCallback = function (cbObject) {
        var errorCode = cbObject.errorCode;
        var errorText = cbObject.errorText;
        console.log(" Error Code [" + errorCode + "]: " + errorText);
    };
 
    var signage = new Signage();
    signage.setPortraitMode(successCallback, failureCallback, options);
}