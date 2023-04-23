// Controlla se ci sono aggiornamenti 
setTimeout(() => {
livesignage.getLSVersion().then(async version => {
    console.log(`Versione Livesignage installata : ${LS_VERSION}`);
    console.log('Ultima versione Livesignage disponibile: ' + version);

    // se version == null allora sono offline
    if (version != null && version != LS_VERSION) {

        function successCb() {
            //Se ho scaricato correttamente l'aggiornamento riavvio il sistema
            console.log(`LiveSignage update downloaded`);
            display.rebootSession();
        }

        async function failureCb(cbObject) {
            // in caso di errore non faccio nulla, riprovo al prossimo riavvio

            let errorCode = cbObject.errorCode;
            let errorText = cbObject.errorText;
            header.textContent = "Errore";
            console.error("getLSVersion error: Code [" + errorCode + "]: " + errorText);

            //Se non ho scaricato correttamente l'aggiornamento continuo
            try {
                var serial = localStorage.getItem('DISPLAY_SERIAL_NUMBER');
                if (serial == null) {
                    serial = await display.getSerialNumber()
                    localStorage.setItem('DISPLAY_SERIAL_NUMBER', serial);
                }

                // inizializza il database interno e quello di log
                db.initialize()
                dblog.initialize();

                // Controlla se il dispositivo sia stato registrato
                setTimeout(() => {
                    association.check(serial);
                }, SPLASH_SCREEN_TIMING);
            } catch (error) {
                console.log(error);
            }
        }

        let options = {
            to: Storage.AppMode.LOCAL, //Salva la nuova versione nel file system
            recovery: true, //Mantiene la versione attuale in memoria fino alla corretta installazione di quella nuova
        };
        // Scarico aggiornamento  
        display.storage.upgradeApplication(successCb, failureCb, options);
    } else {
        console.log(`Livesignage aggiornato`);
        // se non devo aggiornare, o sono offline 
        try {
            var serial = localStorage.getItem('DISPLAY_SERIAL_NUMBER');
            if (serial == null) {
                serial = await display.getSerialNumber();
                localStorage.setItem('DISPLAY_SERIAL_NUMBER', serial);
            }
            // inizializza il database interno e quello di log
            db.initialize()
            dblog.initialize();

            // Controlla se il dispositivo sia stato registrato
            setTimeout(() => {
                association.check(serial);
            }, SPLASH_SCREEN_TIMING);
        } catch (error) {
            console.log(error);
        }
    }
});
},
// Timeout prima di controllare se esiste un aggiornamento (ms)
WAIT_CONNECTION_START
);