// @param dump: Stringa rappresentate il nuovo file del database
_recursiveStoreFile(dump) {
    var CHUNK_LENGTH = 10240; // 10KB
    var written = 0;
    const filePath = `file://internal/${DB_FOLDER}/${DB_FILE}`;

    // trasformo dump in arraybuffer
    var bytes = new TextEncoder().encode(JSON.stringify(dump));
    const bytesToWrite = bytes.length;

    // rimuovo vecchio file
    var optionsOldFile = {
        file: filePath,
    }
    display.storage.removeFile(
        // Callback in caso di successo
        () => {
            console.log('Old database file removed');
            // Scrittura
            doStoreFile(bytes);
        },
        error => {
            var errorCode = error.errorCode;
            var errorText = error.errorText;
            console.log(" Error while deleting old DB file -> Code [" + errorCode + "]: " + errorText);
        }, optionsOldFile);

    // Scrivo il nuovo file di DB ricorsivamente
    function doStoreFile(bytes) {
        var successCb = function (cbObject) {
            // calcolo bytes scritti
            written += cbObject.written;
            // se ho finito di scrivere
            if (written == bytesToWrite) {
                // console.timeEnd('store DB');
                console.log("Database file successfully written: " + written + " bytes");
            } else {
                // se non ho finito di scrivere
                doStoreFile(bytes);
            }
        }
        var failureCb = function (cbObject) {
            var errorCode = cbObject.errorCode;
            var errorText = cbObject.errorText;
            console.log(" Error while writing db file -> Code [" + errorCode + "]: " + errorText);
        };

        // Seleziono successivi bytes da scrivere
        var bytesSlice = bytes.slice(written, written + CHUNK_LENGTH);

        var options = {
            data: bytesSlice,
            path: filePath,
            mode: "append",
            length: CHUNK_LENGTH,
            encoding: "binary"
        };
        display.storage.writeFile(successCb, failureCb, options);
    }

}