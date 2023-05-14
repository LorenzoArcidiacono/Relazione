function setWakeOnLan(enabled) {
    var options = {}
    if (this.networkType == 'wifi') {
      if (enabled == "true")
        options.enableWoWLAN = true;
      else
        options.enableWoWLAN = false;
      this.custom.Configuration.setWoWLAN(
        function successCallback() {
          console.log(`WakeOnLan settata a : ${enabled}`);
        },
        function failureCallback(failureObject) {
          console.error('[' + failureObject.errorCode + '] ' + failureObject.errorText);
        },
        options)

    } else if (this.networkType == 'wired') {
      function successCb() {
        console.log(`WakeOnLan settata a : ${enabled}`);
      }

      function failureCb(cbObject) {
        var errorCode = cbObject.errorCode;
        var errorText = cbObject.errorText;

        console.log("Error Code [" + errorCode + "]: " + errorText);
      }
      if (enabled == "true")
        options.wakeOnLan = true;
      else
        options.wakeOnLan = false;
      this.power.enableWakeOnLan(successCb, failureCb, options);
    }
  }


  function getWakeOnLan() {
    var self = this
    if (this.networkType == 'wifi') {
      return new Promise((resolve, reject) => {
        self.custom.Configuration.getWoWLAN(
          function successCallback(successObject) {
            resolve(successObject.enableWoWLAN);
          },
          function failureCallback(failureObject) {
            console.error('[' + failureObject.errorCode + '] ' + failureObject.errorText);
            reject(failureObject.errorText)
          })
      })
    } else if (this.networkType == 'wired') {
      return new Promise((resolve, reject) => {
        function successCb(cbObject) {
          resolve(cbObject.wakeOnLan)
        }

        function failureCb(cbObject) {
          var errorCode = cbObject.errorCode;
          var errorText = cbObject.errorText;

          console.log("Error Code [" + errorCode + "]: " + errorText);
          reject(errorText);
        }

        self.power.getPowerStatus(successCb, failureCb);
      })
    }
  }