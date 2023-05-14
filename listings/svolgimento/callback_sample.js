function getMacAddress() {
    var self = this;
    return new Promise((resolve, rejects) => {

      function successCb(cbObject) {
        if (self.networkType === 'wired') {
            resolve(cbObject.wiredInfo.macAddress);
        } else {
          resolve(cbObject.wifiInfo.macAddress);
        }
      }

      function failureCb(cbObject) {
        var errorCode = cbObject.errorCode;
        var errorText = cbObject.errorText;

        console.log("Error Code [" + errorCode + "]: " + errorText);
        rejects(errorCode);
      }

      this.deviceInfo.getNetworkMacInfo(successCb, failureCb);
    })
  }