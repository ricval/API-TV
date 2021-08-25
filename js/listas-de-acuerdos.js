let listas_plataforma_web_api_url;

$(document).ready(function() {
    $('#divcargando').hide();

    resultadoConsulta(87826, 0);
});


function consulta(id = 0, anio = 0) {
    switch ("localhost"/*location.hostname*/) {
        case "localhost":
            // Para desarrollo
            listas_plataforma_web_api_url = "http://justicia:8001/listas_de_acuerdos_acuerdos?lista_de_acuerdo_id=" + id;
            break;
        case "127.0.0.1":
            // Para desarrollo
            listas_plataforma_web_api_url = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id=" + id + '&ano=' + anio;
            break;
        case "172.30.37.233":
            // Para desarrollo
            listas_plataforma_web_api_url = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id=" + id + '&ano=' + anio;
            break;
        default:
            // Para producción
            listas_plataforma_web_api_url = "https://plataforma-web-api-dot-pjecz-268521.uc.r.appspot.com/listas_de_acuerdos?autoridad_id=" + id + '&ano=' + anio;
    }
}

function resultadoConsulta(autoridad, anio) {
    consulta(autoridad, anio);
    var nombreDistrito = "";
    var nombreAutoridad = "";
    
    $.ajax({
        'url': listas_plataforma_web_api_url,
        'type': "GET",
        'dataType': "json",
        'success': function(result) {
            $.each(result, function(i, lista) {
                if (i < 3) {
                    nombreAutoridad = lista.autoridad;
                    nombreDistrito = lista.distrito;
                    $('#fecha').text(lista.fecha);
                    $('#folio').text(lista.folio);
                    $('.registro').clone().appendTo( $(".container") );
                    return;
                }
            });
            $('#divcargando').hide();
        }
    });
}