var productoCoordenadaLatitud = localStorage.getItem('tienda-coordenadaLatitud');
var productoCoordenadaLongitud = localStorage.getItem('tienda-coordenadaLongitud');

var imagenTienda = String(localStorage.getItem("tienda-mapa-imagen"));
var nombreTienda = String(localStorage.getItem("tienda-mapa-nombre"));
// console.log(productoCoordenadaLatitud);
// console.log(productoCoordenadaLongitud);
var pantallaAnterior = String(localStorage.getItem('pantalla-anterior'));

const coordenadas = { "lat": Number(productoCoordenadaLatitud), "lng": Number(productoCoordenadaLongitud) };

document.addEventListener("DOMContentLoaded", function (event) {
    switch (pantallaAnterior) {
        case 'inicio':
            $('#navMenuPrincipal').addClass("active");
            break;

        case 'tiendas':
            $('#navTiendas').addClass("active");
            break;

        case 'favoritos':
            $('#navFavoritos').addClass("active");
            break;

        case 'laptops':
            $('#navLaptops').addClass("active");
            break;

        case 'desktops':
            $('#navDesktops').addClass("active");
            break;

        case 'perifericos':
            $('#navPerifericos').addClass("active");
            break;

        case 'componentes':
            $('#navComponentes').addClass("active");
            break;

        case 'oficina':
            $('#navOficina').addClass("active");
            break;

        case 'tablets':
            $('#navTablets').addClass("active");
            break;

        case 'celulares':
            $('#navCelulares').addClass("active");
            break;
    }

    document.getElementsByClassName("contenedorPrincipal")[0].style.width = ($('#content').width()) + "px";
    document.getElementsByClassName("contenedorPrincipal")[0].style.height = ($('#page-top').height() - $('#mapaNavBar').height()) + "px";
    document.getElementById("mapaContainer").style.width = $('.contenedorPrincipal').width() + "px";
    document.getElementById("mapaContainer").style.height = ($('.contenedorPrincipal').height()-25) + "px";
});

document.addEventListener("deviceready", function () {



    // Define a div tag with id="map_canvas"
    var mapDiv = document.getElementById("mapaContainer");

    // Initialize the map plugin
    var map = plugin.google.maps.Map.getMap(mapDiv, {
        'camera': {
            'latLng': coordenadas,
            'zoom': 17
        }
    });

    // You have to wait the MAP_READY event.
    map.one(plugin.google.maps.event.MAP_READY, onMapInit);
});

function onMapInit(map) {
    var htmlInfoWindow = new plugin.google.maps.HtmlInfoWindow();

    var html = "<img id='imagenMapa' class='pl-2 d-flex justify-content-center img-responsive' src='"+imagenTienda+"' width='200px' height='100px' >" 
                +"<p class='pr-3 text-center'>"+nombreTienda+"</p>";
    htmlInfoWindow.setContent(html);
    // var html = [
    //     'This is <b>Html</b> InfoWindow',
    //     '<br>',
    //     '<button onclick="javascript:alert(\'clicked!\');">click here</button>',
    // ].join("");
    // htmlInfoWindow.setContent(html);

    // var iframe = document.createElement("iframe");
    // iframe.setAttribute("width", "200");
    // iframe.setAttribute("height", "100");
    // iframe.setAttribute("src", imagenTienda);
    // iframe.addClass()
    // iframe.setAttribute("frameboarder", "0");
    // htmlInfoWindow.setContent(iframe);

    // Add a marker
    map.addMarker({
        'position': coordenadas,
    }, function (marker) {

        marker.on(plugin.google.maps.event.MARKER_CLICK, function () {
            htmlInfoWindow.open(marker);
        });
        marker.trigger(plugin.google.maps.event.MARKER_CLICK);

    });
}