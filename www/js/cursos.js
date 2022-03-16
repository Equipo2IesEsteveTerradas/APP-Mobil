document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    console.log("Pagina cursos")

    $("#mostrarC").click(function() {
        console.log("Mostrant els cursos");
    })
};