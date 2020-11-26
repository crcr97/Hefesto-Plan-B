var productoTienda = localStorage.getItem('producto-tienda');
var productoCoordenadaLatitud = localStorage.getItem('tienda-coordenadaLatitud');
var productoCoordenadaLongitud = localStorage.getItem('tienda-coordenadaLongitud');

const coordenadas = { "lat": Number(productoCoordenadaLatitud), "lng": Number(productoCoordenadaLongitud) };

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementsByClassName("contenedorPrincipal")[0].style.width = ($('#content').width()) + "px";
    document.getElementsByClassName("contenedorPrincipal")[0].style.height = ($('#page-top').height() - $('#mapaNavBar').height()) + "px";
    document.getElementById("mapaContainer").style.width = $('.contenedorPrincipal').width() + "px";
    document.getElementById("mapaContainer").style.height = $('.contenedorPrincipal').height() + "px";
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

    // var html = [
    //     'This is <b>Html</b> InfoWindow',
    //     '<br>',
    //     '<button onclick="javascript:alert(\'clicked!\');">click here</button>',
    // ].join("");
    // htmlInfoWindow.setContent(html);

    var iframe = document.createElement("iframe");
    iframe.setAttribute("width", "200");
    iframe.setAttribute("height", "100");
    iframe.setAttribute("src", "https://www.youtube.com/embed/g8jTeS_Ey4A");
    iframe.setAttribute("frameboarder", "0");
    htmlInfoWindow.setContent(iframe);

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