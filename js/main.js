$(document).ready(function(){


    $(".loop").html('<div class="row"><h1 class="text-center">cargando...</h1></div>');

    //obtener el ID en el parÃ¡metro
    var id_autoridad = get_id_aut();

    //Agregar el nombre corto de la autoridad en el encabezado
    setname(id_autoridad);
    
    //Consultar las listas de acuerdos relacionadas con la autoridad
    var id_list_aut;

    var fechaNow = new Date().getDay();
    var fechaAnt = ""; 
    
    if(fechaNow === 1){
        fechaAnt = fechaFra().toISOString().slice(0,10);
        console.log(fechaAnt);
    }else{
        fechaAnt = fechaAyer().toISOString().slice(0,10);
        console.log(fechaAnt);
    }
    $("#fecha").html(fechaAnt);
     
    fetch(get_listas_acuerdos_autoridad_id_url(id_autoridad, fechaAnt))
    .then(res => res.json())
    .then(data => { 
       
        
        // imprimir listas_de_acuerdos_acuerdos
        
        fetch(get_listas_acuerdos_acuerdos_url(data[0].id))
        .then(res => res.json())
        .then(result => {
            
            //Colores de las filas
            var colores = [
                bk_color =  "#FEFEFE",
                color = "#0D0D0D"
            ];
            
            var total_datos = Object.keys(result).length;


            if(total_datos == 0){
              
                $('.loop').html('<div class="msjDat">NO SE ENCONTRARON DATOS</div>');
                
            }else{

                //cantidad de datos a cargar:
                var cantidad = 4;

                //cantidad final:
                var final = cantidad;

                //Tiempo de la pausa(ms):
                var interv = 6000;

                //Ã ndice de inicio
                var inicio = 0;
                
                setInterval(function(){ 
                    
                    ciclo(inicio,final,result);
                    inicio = final;
                    final = final + cantidad;

                    if(final > Object.keys(result).length){
                        inicio = 0;
                        final = cantidad;
                        
                    }

                },interv);
                
            }
            
        });
    });
});


/*
** Recargar la pagina cada 10 minutos
*/
function actualizar(){location.reload(true);}
//Funcion para actualizar cada 5 segundos(5000 milisegundos)
setInterval("actualizar()", 600000);

/*
** Fecha ayer
*/

const fechaAyer = () => {
    let hoy = new Date();
    let DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000;
    let ayer = new Date(hoy.getTime() - DIA_EN_MILISEGUNDOS);
    return ayer;
}

/*
** Fecha Lunes
*/
const fechaFra = () => {
    let hoy = new Date();
    let DIA_EN_MILISEGUNDOS = 72 * 60 * 60 * 1000;
    let viernes = new Date(hoy.getTime() - DIA_EN_MILISEGUNDOS);
    return viernes;
}


/*
** Funcion para intercalar los colores de las filas a imprimir
*/
function ciclo(inicio, final, datos){
    var c = 0;
    $('.loop').html('');
    for(i = inicio; i < final; i++){   
        if(c % 2 == 0){
            bk_color = "#F0EFEF";
            color = "#0D0D0D";
            c++;
        }else{
            bk_color =  "#FEFEFE";
            color = "#0D0D0D";
            c = 0;
        }
        print_res(datos[i],color);
    }
}

/*
** Obtiene el ID de la autoridad
*/
function get_id_aut(){

    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id')

}


/*
** Establece el nombre de la autoridad de acuerdo al ID recibido en la URL
*/
function setname(id){

    var api_url = get_api_url_autoridades(id);

    fetch(api_url)
    .then(res => res.json())
    .then(data => {
       fetch(get_url_distrito(data.distrito_id))
       .then(resp => resp.json())
       .then(result => {

           $("#myTxt").html(result.distrito_corto + ",  &nbsp;" + data.autoridad_corta );
       })
    });
}


/*
**  Funciones para identificar la URL de las APIs
*/
function get_api_url_autoridades(id){
    var autoridad_id_url;
    switch(location.hostname){
        case "localhost": autoridad_id_url = "http://172.30.37.233:8001/autoridad/"+id; break;
        case "172.30.37.233": autoridad_id_url = 'http://172.30.37.233:8001/autoridades/'+id; break;
        case "127.0.0.1": autoridad_id_url ='http://172.30.37.233:8001/autoridades/'+id; break;
        default: autoridad_id_url = "https://plataforma-web-api-dot-pjecz-268521.uc.r.appspot.com/autoridades/"+id; break;
    }
    return autoridad_id_url;
}

function get_listas_acuerdos_autoridad_id_url(id, fecha){
    var lista_acuerdo_autoridad;
    switch(location.hostname){
        case "localhost": lista_acuerdo_autoridad = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id=" + id +"&fecha=" + fecha; break;
        case "172.30.37.233": lista_acuerdo_autoridad = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id=" + id + "&fecha=" + fecha; break;
        case "127.0.0.1": lista_acuerdo_autoridad = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id=" + id + "&fecha=" + fecha; break;
        default: lista_acuerdo_autoridad = "https://plataforma-web-api-dot-pjecz-268521.uc.r.appspot.com/listas_de_acuerdos?autoridad_id=" + id + "&fecha=" + fecha; break;
    }
    return lista_acuerdo_autoridad;
}

function get_listas_acuerdos_acuerdos_url(id){
    var lista_acuerdo_acuerdo;
    switch(location.hostname){
        case "localhost": lista_acuerdo_acuerdo = "http://172.30.37.233:8001/listas_de_acuerdos_acuerdos?lista_de_acuerdo_id="+id; break;
        case "172.30.37.233": lista_acuerdo_acuerdo = "http://172.30.37.233:8001/listas_de_acuerdos_acuerdos?lista_de_acuerdo_id="+id; break;
        case "127.0.0.1": lista_acuerdo_acuerdo = "http://172.30.37.233:8001/listas_de_acuerdos_acuerdos?lista_de_acuerdo_id="+id; break;
        default: lista_acuerdo_acuerdo = "https://plataforma-web-api-dot-pjecz-268521.uc.r.appspot.com/listas_de_acuerdos_acuerdos?lista_de_acuerdo_id="+id; break;
    }
    return lista_acuerdo_acuerdo;
}

 /*
 ** obtener id del distrito
 */
function get_url_distrito(id){
    var distrito_id_url;
    switch(location.hostname){
        case "localhost": distrito_id_url = "http://172.30.37.233:8001/distritos/" + id; break;
        case "172.30.37.233": distrito_id_url = "http://172.30.37.233:8001/distritos/" + id; break;
        case "127.0.0.1": distrito_id_url = "http://172.30.37.233:8001/distritos/" + id; break;
        default: distrito_id_url = "https://plataforma-web-api-dot-pjecz-268521.uc.r.appspot.com/distritos/" + id; break;
    }
    return distrito_id_url;
}
    

/**
 * Funcion que imprime el HTML de las filas
 */
function print_res(datos, color){
    var n = i + 1;
    $('.loop').append(`
        <div style="border-bottom: solid 4px #6f6s6f" class="row align-middle"> 
            <div style="font-size:32px;" class="col align-middle">
                <div class="row text-center pdng2" style="background-color: ` + bk_color + `; color:` + color + `;">
                    <div class="col-1 col-xs-1 align-middle" style="color:#0C0C0C; font-weight:900;">`+ n +`</div>
                    <div class="col-1 col-xs-1 align-middle txt-lb row-height">` + datos.expediente + `</div>
                    <div class="col-1 col-xs-1 align-middle txt-lb row-height">` + datos.folio + `</div>
                    <div class="col-2 col-xs-2 align-middle txt-lb row-height">` + datos.tipo_acuerdo + `</div>
                    <div class="col-2 col-xs-2 align-middle txt-lb row-height">` + datos.tipo_juicio + `</div>
                    <div class="col-2 col-xs-2 align-middle txt-lb row-height">` + datos.actor  + `</div>
                    <div class="col-3 col-xs-3 align-middle txt-lb row-height">` + datos.demandado + ` </div>
                </div> 
            </div>
        </div>
    `);
}
