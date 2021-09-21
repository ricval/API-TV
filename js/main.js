$(document).ready(function(){
    

    $(".loop").html('<div class="row"><h1 class="text-center">cargando...</h1></div>');

    //obtener el ID en el parámetro
    var id_autoridad = get_id_aut();
    
    //Agregar el nombre corto de la autoridad en el encabezado
    setname(id_autoridad);
    
    //Consultar las listas de acuerdos relacionadas con la autoridad
    var id_list_aut;
     
    fetch(get_api_url_list_de_acu_aut(id_autoridad))
    .then(res => res.json())
    .then(data => { 
        
        // imprimir listas_de_acuerdos_acuerdos
        
        fetch(get_api_url_list_acu(data[0].id))
        .then(res => res.json())
        .then(result => {
            setInt(result);
        });
    });
});


/*
**  setInterval
*/

function setInt(res) {
    var cantidad = 3; // cantidad de registros en la lista
    var inicio = 0;
    var final = cantidad;
    var interv = 8000;
    
    setInterval(function(){ 
                            
        ciclo(inicio,final,res);
        inicio = final;
        final = final + cantidad;
        
        if(final > Object.keys(res).length){
            inicio = 0;
            final = cantidad;
        }
        
    },interv);
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
        
        $("#myTxt").html(data.autoridad_corta + "  -  "+ data.autoridad);
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

function get_api_url_list_de_acu_aut(id){
    var lista_acuerdo_autoridad;
    switch(location.hostname){
        case "localhost": lista_acuerdo_autoridad = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id="+id; break;
        case "172.30.37.233": lista_acuerdo_autoridad = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id="+id; break;
        case "127.0.0.1": lista_acuerdo_autoridad = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id="+id; break;
        default: lista_acuerdo_autoridad = "https://plataforma-web-api-dot-pjecz-268521.uc.r.appspot.com/listas_de_acuerdos?autoridad_id="+id; break;
    }
    return lista_acuerdo_autoridad;
}

function get_api_url_list_acu(id){
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
** Función para intercalar los colores de las filas a imprimir
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

/**
 * Función que imprime el HTML de las filas
 */
function print_res(datos, color){
    var yearObj = new Date(datos.fecha);
    var year = yearObj.getFullYear();
    //console.log(year)
    var n = i + 1;
    $('.loop').append(`
        <div style="border-bottom: solid 4px #6f6s6f" class="row"> 
            <div style="font-size:32px;" class="col">
                <div class="row text-center pdng2" style="background-color: ` + bk_color + `; color:` + color + `;">
                    <div class="col-1 col-xs-1" style="color:#0C0C0C; font-weight:900;">`+ n +`</div>
                    <div class="col-2 col-xs-2">
                        <div class="row">
                            <div  class="col-6 col-xs-6 txt-lb">` + datos.id + `</div>
                            <div  class="col-6 col-xs-6 txt-lb">` + year + `</div>
                        </div>
                    </div>
                    <div class="col-2 col-xs-3 txt-lb">` + datos.tipo_juicio + `</div>
                    <div class="col-4 col-xs-3 txt-lb">` + datos.actor  + `</div>
                    <div class="col-3 col-xs-3 txt-lb">` + datos.demandado + ` </div>
                </div> 
            </div>
        </div>
    `);
}