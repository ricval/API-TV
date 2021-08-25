
// Poner pantalla en fullscreen
document.getElementById("elem").requestFullscreen();

function SetFullScreen(elto) {
    
    // Si no se soporta la API, ya ni lo intentamos
    if( !FullScreenSupportEnable() ) return;

    // Se prueba la variante aporopiada según el navegador

    try{
        if(elto.requestFullscreen) { // Empezando por la estándar
            
            elto.requestFullscreen();

        }else if(elto.webkitRequestFullScreeen){ // Webkit (Safari, Chrome  y Opera 15+)

            elto.webkitRequestFullScreeen();
        }else if(elto.mozRequestFullScreen){ // Firefox

            elto.mozRequestFullScreen();
        }else if(elto.msRequestFullScreen){ // Internet Explorer 11+

            elto.msRequestFullScreen();

        }
    }
    catch(ex){

        return false;
    }
    return true;

    
}

SetFullScreen(document.getElementById("elem"));