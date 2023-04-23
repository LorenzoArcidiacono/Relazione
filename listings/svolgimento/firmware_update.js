upgradeFirmware(uri) {
    console.log('Inizio upgradeFirmware:', uri);
    var self = this;

    function successCb(cbObject) {
    // In caso il download non abbia riportato errori
      console.log(`Fine download firmware, inizio aggiornamento`);
      self.storage.upgradeFirmware(
        (cbObject) => console.log(`Firmware Aggiornato, riavvio il device`),
        (error) => console.log(`Errore durante l'aggiornamento del firmware: ${error.errorText}`)
      );
    }

    function failureCb(cbObject) {
    //In caso di errori durante il download 
      var errorCode = cbObject.errorCode;
      var errorText = cbObject.errorText;
      console.log(`errore download firmaware`);
      console.log(`error: Code [ ${errorCode} ]: ${errorText}`);
    }

    // Download del firmware
    var options = {
      uri: uri
    }
    this.storage.downloadFirmware(successCb, failureCb, options);

  }