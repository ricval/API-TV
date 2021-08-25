let listas_plataforma_web_api_url;

$(document).ready(function() {
    $('#divcargando').hide();

    $('#ListasTable').DataTable();

    $('#tablaResultado').hide();

    resultadoConsulta(87826, 0);
    $('#fecha').change("26 Ago 2021");
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
    $('#divcargando').show();
    $('#tablaResultado').show();
    $('#consultaJuzgado').val("");
    // Si tiene datos, limpiar la tabla
    if ($('#ListasTable').length > 0) {
        $('#ListasTable').DataTable().clear();
        $('#ListasTable').DataTable().destroy();
    };

    if (anio == 0) {
        var currentYear = new Date().getFullYear();
        anio = currentYear
    }

    consulta(autoridad, anio);
    var nombreDistrito = "";
    var nombreAutoridad = "";
    $.ajax({
        'url': listas_plataforma_web_api_url,
        'type': "GET",
        'dataType': "json",
        'success': function(result) {
            $.each(result, function(i, lista) {
                if (i == 0) {
                    nombreAutoridad = lista.autoridad;
                    nombreDistrito = lista.distrito;
                    return false;
                }
            });
            // DataTable
            $('#ListasTable').DataTable({
                'data': result,
                'columns': [
                    { 'data': "fecha", 'width': "40%" },
                    { 'data': "folio", 'width': "40%" },
                ],
                'pageLength': 10,
                "order": [
                    [0, "desc"]
                ],
                'language': {
                    'lengthMenu': "Mostrar _MENU_",
                    'search': "Filtrar:",
                    'zeroRecords': "Cargando información...",
                    'info': "Página _PAGE_ de _PAGES_",
                    'infoEmpty': "No hay registros",
                    'infoFiltered': "(filtrados desde _MAX_ registros totales)",
                    'oPaginate': {
                        'sFirst': "Primero",
                        'sLast': "Último",
                        'sNext': "Siguiente",
                        'sPrevious': "Anterior"
                    }
                }
            });
            $('#divcargando').hide();
        }
    });
}