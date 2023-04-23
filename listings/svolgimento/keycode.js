function setRemoteKeyRedirection(keyCode) {
    var options = {
      keyCode: 0x00000000,
      virtualKeyCode: keyCode,
      attribute: 2
    };

    var successCb = function () {
      console.log("Successfully add key item");
    };

    var failureCb = function (cbObject) {
      var errorCode = cbObject.errorCode;
      var errorText = cbObject.errorText;
      console.log(" Error Code [" + errorCode + "]: " + errorText);
    };

    this.signage.addKeyItem(successCb, failureCb, options);
}

document.addEventListener('keydown', function (e) {
switch (e.keyCode) {
    case 39: //RIGHT arrow
        var actualContentType = localStorage.getItem('actualContentType');
        var actualContent = localStorage.getItem('actualContent');
        switch (actualContentType) {
            case 'playlist':
                if (actualContent != null) {
                    db.getPlaylist(actualContent).then(function (playlist) {
                        switch (playlist.type) {
                            case 'container':
                                document.getElementById("frame_" + frameSelection).contentWindow.next();
                                break;
                            case 'slides':
                            case 'chained':
                                document.getElementById("frame").contentWindow.next();
                                break;
                            case 'source':
                                break;
                        }
                    });
                }
                break;
            case 'plugin':
                break;
        }
        break;
}})

async function sendKeyToDevice(keyCode) {
var options = {
    virtualKeyCode: keyCode
};
var successCb = function () {
    console.log(`key sent successfully`);
    return true;
};

var failureCb = function (cbObject) {
    var errorCode = cbObject.errorCode;
    var errorText = cbObject.errorText;
    console.log(" Error Code [" + errorCode + "]: " + errorText);
    return false;
};

this.signage.sendKey(successCb, failureCb, options);
}
