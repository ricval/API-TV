$(document).ready(function(){
    
    
    $(".loop").html('<div class="row"><h1 class="text-center">cargando...</h1></div>');

    //obtener el ID en el parámetro
    var id_autoridad = get_id_aut();
    
    //Agregar el nombre corto de la autoridad en el encabezado
    setname(id_autoridad);
    
    //Consultar las listas de acuerdos relacionadas con la autoridad
    var id_list_aut;
    var listas_acuerdos;
    
    var fechaNow = new Date().getDay();
    var fechaAnt = ""; 


    if(fechaNow == 1){
        fechaAnt = fechaFra().toISOString().slice(0,10);
    }else{
        fechaAnt = fechaAyer().toISOString().slice(0,10);
    }

    $.ajax({
        dataType:"json",
        type:"GET",
        url:get_api_url_list_de_acu_aut(id_autoridad, fechaAnt),
        async:true,
        success:function(data){
            id_list_aut = data[1].id;
            console.log(id_list_aut);
        },
        error:function(e){
            console.log("Error al consultar las listas de acuerdos: " + e);
        }
    });

    $.ajax({
        dataType:"json",
        type:"GET",
        url:get_api_url_list_acu(id_list_aut),
        async:true,
        success:function(data){
            listas_acuerdos = data;
            console.log(listas_acuerdos);
        },
        error:function(e){
            console.log("Error al consultar las listas de acuerdos: " + e);
        }
    });


    var total_datos = Object.keys(listas_acuerdos).length;

    if(total_datos == 0){
      
        $('.loop').html('<div class="msjDat">NO SE ENCONTRARON DATOS</div>');
        
    }else{

        //mostrar listas de 4 en 4
        var cantidad = 4;

        var vuelta = 1;

        var tiempo = 5000;

        //Colores de las filas
        var colores = [
            bk_color =  "#FEFEFE",
            color = "#0D0D0D"
        ];

        //loop

        for(i = 0; i < total_datos; i++){
            if(vuelta > cantidad){
                function espera(){
                    console.log("en pausa");
                }
                setTimeout("espera()",tiempo);
                vuelta = 1;
                $(".loop").html('');
            }
            else{
                vuelta++;
                if(i % 2 == 0){
                    colores["bk_color"] =  "#FEFEFE";
                    colores["color"] = "#0D0D0D";
                }else{
                    colores["bk_color"] = "#F0EFEF";
                    colores["color"] = "#0D0D0D";
                }
                print_res(listas_acuerdos[i], colores);
            }

        }



    }


});

/*
** Recargar la página cada 10 minutos
*/
function actualizar(){location.reload(true);}
//Función para actualizar cada 5 segundos(5000 milisegundos)
setInterval("actualizar()",600000);

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
    let lunes = new Date(hoy.getTime() - DIA_EN_MILISEGUNDOS);
    return lunes;
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
    
    $.ajax({
        dataType:'json',
        type:'GET',
        async:true,
        url:api_url,
        beforeSend: function(xhr){
            xhr.withCredentials = true;
        },

        success:function(result){
            $("#myTxt").html(result.autoridad_corta + " - " + result.autoridad);
        },
        error:function(e){
            console.log("Error al consultar autoridades: " + e);
        }
    })

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

function get_api_url_list_de_acu_aut(id, fecha){
    var lista_acuerdo_autoridad;
    //"https://plataforma-web-api-dot-pjecz-268521.uc.r.appspot.com/listas_de_acuerdos?autoridad_id="+id +"&fecha=" + fecha
    
    switch(location.hostname){
        case "localhost": lista_acuerdo_autoridad = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id="+id +"&fecha=" + fecha; break;
        case "172.30.37.233": lista_acuerdo_autoridad = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id="+id +"&fecha=" + fecha; break;
        case "127.0.0.1": lista_acuerdo_autoridad = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id="+id +"&fecha=" + fecha; break;
        default: lista_acuerdo_autoridad = "https://plataforma-web-api-dot-pjecz-268521.uc.r.appspot.com/listas_de_acuerdos?autoridad_id="+id +"&fecha=" + fecha; break;
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
    

/**
 * Función que imprime el HTML de las filas
 */
function print_res(datos, colores){
    var yearObj = new Date(datos.fecha);
    var year = yearObj.getFullYear();
    //console.log(year)
    var n = i + 1;
    $('.loop').append(`
        <div style="border-bottom: solid 4px #6f6s6f" class="row"> 
            <div style="font-size:32px;" class="col">
                <div class="row text-center pdng2" style="background-color: ` + colores['bk_color'] + `; color:` + colores['color'] + `;">
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