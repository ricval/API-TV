let listas_plataforma_web_api_url;
let id_autoridad;

$(document).ready(function() {
    $('#divcargando').hide();
    var id_autoridad = getParamet();
    //document.getElementById("myTxt").innerHTML = id_autoridad;
    //alert(id_autoridad);
    resultadoConsulta(87826, 0);
});


function getParamet()      {
   const urlParams = new URLSearchParams(window.location.search);
   return urlParams.get('id')
}

function consulta(api, id = 0, anio = 0) {
    
    switch(api){
       case "listas" :
            switch(location.hostname) {
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
            break;
        case "autoridades":
            switch (location.hostname) {
                case "localhost":
                    // Para desarrollo
                    autoridades_plataforma_web_api_url = "http://172.30.37.233:8001/autoridades?distrito_id=" + id;
                    break;
                case "127.0.0.1":
                    // Para desarrollo
                    autoridades_plataforma_web_api_url = "http://172.30.37.233:8001/autoridades?distrito_id=" + id;
                    break;
                case "172.30.37.233":
                    // Para desarrollo
                    autoridades_plataforma_web_api_url = "http://172.30.37.233:8001/autoridades?distrito_id=" + id;
                    break;
                default:
                    // Para producción
                    autoridades_plataforma_web_api_url = "https://plataforma-web-api-dot-pjecz-268521.uc.r.appspot.com/autoridades?distrito_id=" + id;
            }
            break;
        case "distritos":
            switch (location.hostname) {
                case "localhost":
                    // Para desarrollo
                    distritos_plataforma_web_api_url = "http://172.30.37.233:8001/distritos";
                    break;
                case "127.0.0.1":
                    // Para desarrollo
                    distritos_plataforma_web_api_url = "http://172.30.37.233:8001/distritos";
                    break;
                case "172.30.37.233":
                    // Para desarrollo
                    distritos_plataforma_web_api_url = "http://172.30.37.233:8001/distritos";
                    break;
                default:
                    // Para producción
                    distritos_plataforma_web_api_url = "https://plataforma-web-api-dot-pjecz-268521.uc.r.appspot.com/distritos";
            }
            break;
     }
}

function getAutoridades(distrito) {
    
    consulta("autoridades", distrito);
    

    fetch(autoridades_plataforma_web_api_url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
}

function resultadoConsulta(autoridad, anio){
    
    consulta("listas", autoridad, anio);
    $(".loop").html('<div class="row"><h1 class="text-center">cargando...</h1></div>');
    
    var cantidad = 3;
    var inicio = 0;
    var final = cantidad;
    var interv = 8000;
    
    fetch(listas_plataforma_web_api_url)
    .then(res => res.json())
    .then(data => {
        
        setInterval(function(){ 
            
            ciclo(inicio,final,data);
            inicio = final;
            final = final + cantidad;
            
            if(final > Object.keys(data).length){
                inicio = 0;
                final = cantidad;
                }
            },interv);
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
    var yearObj = new Date(datos.fecha);
    var year = yearObj.getFullYear();
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
    

  


