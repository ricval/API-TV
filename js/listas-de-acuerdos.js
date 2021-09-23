let listas_plataforma_web_api_url;
let id_autoridad;

$(document).ready(function() {
    $('#divcargando').hide();

    //obtener el ID en el parámetro
    var id_autoridad = getParamet();
    

    //Agregar el nombre corto de la autoridad en el encabezado
    setname(id_autoridad);

    //Consultar las listas de acuerdos relacionadas con la autoridad
    get_autoridad_id(id_autoridad);

    resultadoConsulta(87826, 0);
});


function getParamet(){
   const urlParams = new URLSearchParams(window.location.search);
   return urlParams.get('id');
}

function consulta(consulta = "localhost", id = 0, anio = 0) {
    
            switch(consulta) {
                case "localhost":
                    // Para desarrollo
                    listas_plataforma_web_api_url = "http://justicia:8001/listas_de_acuerdos_acuerdos?lista_de_acuerdo_id=" + id;
                    break;
                case "127.0.0.1":
                    // Para desarrollo
                    listas_plataforma_web_api_url = "http://172.30.37.233:8001/listas_de_acuerdos?lista_de_acuerdo" + id + '&ano=' + anio;
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


/*
** Establece el nombre de la autoridad de acuerdo al ID recibido en la URL
*/
function setname(id){
    
    var api_url ;

    switch(location.hostname){
        case "localhost": api_url = "http://justicia:8001/autoridad/"+id; break;
        case "172.30.37.233:8001": api_url = 'http://justicia:8001/autoridades/'+id; break;
        case "127.0.0.1": api_url = 'http://justicia:8001/autoridades/'+id; break;
        default: api_url = "https://plataforma-web-api-dot-pjecz-268521.uc.r.appspot.com/autoridades/"+id; break;
    }
    
    fetch(api_url)
    .then(response => response.json())
    .then(data => {
        $("#myTxt").html(data.autoridad_corta);
    });
}


/*
** Consultar las listas de acuerdos de la respectiva autoridad
*/
function get_autoridad_id(id){
    
    var norepeat = [];
    var i = 0;
    
    var api_url;

    switch(location.hostname){
        case "localhost": api_url = "http://justicia:8001/listas_de_acuerdos?autoridad_id="+id; break;
        case "172.30.37.233:8001": api_url = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id="+id; break;
        case "127.0.0.1": api_url = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id="+id; break;
        default: api_url = "https://plataforma-web-api-dot-pjecz-268521.uc.r.appspot.com/listas_de_acuerdos?autoridad_id="+id; break;
    }
    
    fetch(api_url)
    .then(response  => response.json())
    .then(data => { 
        
        for(i = 0; i < Object.keys(data).length; i++){
            
            if(!norepeat.includes(data[i].id)){
                norepeat.push(data[i].id);
            }
            
        }
        
        
    });
}


/*
** imprimir listas_de_acuerdos_acuerdos
*/
function resultadoConsulta(id, anio){

    
    consulta("localhost", id, anio);

    $(".loop").html('<div class="row"><h1 class="text-center">cargando...</h1></div>');
    
    
    var cantidad = 4;
    var inicio = 0;
    var final = cantidad;
    var interv = 5000;
    var vuelta = 1;
    var x = 0;
    
    fetch(listas_plataforma_web_api_url)
    .then(response  => response.json())
    .then(result => {

        
            
        setInterval(function() {
            
            ciclo(inicio,final,result);
            inicio = final;
            final = final + cantidad;
            
            if(final > Object.keys(result).length){
                inicio = 0;
                final = cantidad;
            }
        });
       
    });
}



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

 
function print_res(datos, color){
    //var yearObj = new Date();
    //var year = yearObj.getFullYear();
    var n = i + 1;
    $('.loop').append(`
        <div style="border-bottom: solid 4px #6f6s6f" class="row"> 
            <div style="font-size:32px;" class="col">
                <div class="row text-center pdng2" style="background-color: ` + bk_color + `; color:` + color + `;">
                    <div class="col-1 col-xs-1" style="color:#0C0C0C; font-weight:900;">`+ n +`</div>
                    <div class="col-2 col-xs-2">
                        <div class="row">
                            <div  class="col-6 col-xs-6 txt-lb">` + datos.id + `</div>
                            <div  class="col-6 col-xs-6 txt-lb">` + datos.fecha + `</div>
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
    

  


