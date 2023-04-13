setInterval(() => {
    var networkConnection = localStorage.getItem('connection')
    if (networkConnection == 'online' || networkConnection == null) {
        
        connection.check(function(){
            // Online
            console.log(`Set online`);
            localStorage.setItem('connection', 'online');

        }, function(){
            // Offline all'avvio del dispositivo
            if (networkConnection == null) {
                console.log('start offline');
                localStorage.setItem('connection', 'offline');
                startOffline();
            }
            // Il dispositivo ha perso la connessione
            if (networkConnection == 'online') {
                console.log('set offline');
                localStorage.setItem('connection', 'offline');
                setOffline();
            }
        })
    }
}, 10000)