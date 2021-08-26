let listas_plataforma_web_api_url;

$(document).ready(function() {
    $('#divcargando').hide();

    resultadoConsulta(87826, 0);
});



function resultadoConsulta(autoridad, anio) {
    //consulta(autoridad, anio);
    var nombreDistrito = "";
    var nombreAutoridad = "";
    
    fetch('js/lista_acuerdo.json')
    .then(res => res.json())
    .then(data => {
        $.each(data, function(index, datos){
            $('.loop').append(` 
                <div style="border-bottom: solid 4px #004360" class="row">

                <div style="font-size:32px;" class="col">
        
                <div class="row text-center pdng2" style="background-color: #dbb993; color:#7f6000;">
        
                    <div class="col-3 col-xs-3">
                    
                    <div class="row">
                        <div  class="col-6 col-xs-6">` + datos.id + `</div>
                        <div  class="col-6 col-xs-6">` + datos.fecha + `</div>
                    </div>
        
                    </div>
        
                    <div class="col-3 col-xs-3">` + datos.tipo_juicio + `</div>
                    <div class="col-3 col-xs-3">` + datos.tipo_acuerdo + `</div>
                    <div class="col-3 col-xs-3"> </div>
        
                </div>
        
                <div class="row">
        
                    <div class="col-3 col-xs-3 pdng2 lbl" style="background-color:#004360;">Actor</div>
                    <div class="col-9 col-xs-9 pdng2 uppercase">` + datos.actor + `</div>
        
                </div>
        
                <div class="row ">
        
                    <div class="col-3 col-xs-3 pdng2 lbl" style="background-color: #003045;">Demandado</div>
                    <div class="col-9 col-xs-9 pdng2 uppercase">` + datos.demandado + `</div>
        
                </div>
        
                </div>
        
            </div>  
            `)
        });
    })
}