parseMessage(msg) {
    try {
        msg.message = JSON.parse(msg.message);
    } catch (error) {
        console.log("Error:" + error + ", while parsing message");
        log.add('error', error.message, 'parseMessage', error.stack);
    }
    try {
        console.log('Comando: ' + msg.message.command);
        var response = {
            reference: msg.message.command
        };

        switch (msg.message.command) {
            case 'lsAlive':
                response = msg.message;
                response.reference = msg.message.command;
                this.sendMessage(msg.sender, response);
                break;
            case 'rebootbrowser':
                log.info("Chiamato comando [rebootBrowser]", false);
                setTimeout(window.location.reload(), 1000);
                break;
            case 'rebootsession':
                log.info("Chiamato comando [rebootSession]", false);
                this._internalLog(display.rebootSession())
                break;
            case 'rebootclient':
                log.info("Chiamato comando [rebootClient]", false);
                this._internalLog(display.rebootSession())
                break;
            case 'powerOff':
                log.info("Chiamato comando [powerOff]", false);
                this._internalLog(display.powerOff())
                break;
            case 'setMute':
                log.info("Chiamato comando [setMute]", false);
                display.setMute();
                break;
            case 'setVolume':

                var info = {};
                info.setVolume = "Chiamato comando [setVolume]";
                log.info("Chiamato comando [setVolume]", false);
                display.setVolume(msg.message.volume);
                break;

                ...
        }
    }
}