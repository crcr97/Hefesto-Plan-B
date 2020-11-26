const db = firebase.firestore();
var tiendaId = String(localStorage.getItem('tienda-id'));
var pantallaAnterior = String(localStorage.getItem('pantalla-anterior'));

window.addEventListener("DOMContentLoaded", async (e) => {

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

    db.collection("Tiendas").doc(tiendaId).onSnapshot(function (doc) {
        const tienda = doc.data();

        const detalleImagenProducto = document.getElementById("detalleImagenTienda").src = tienda.imagen;

        const detallePrecioProducto = document.getElementById("detalleNombreTienda");
        detallePrecioProducto.innerHTML = tienda.nombre;

        const detalleUbicacionProducto = document.getElementById("detalleUbicacionTienda");
        detalleUbicacionProducto.innerHTML = tienda.ubicacion;

        const detalleDescripcionProducto = document.getElementById("detalleDescripcionTienda");
        detalleDescripcionProducto.innerHTML = tienda.descripcion;

        const detalleTelefonoProducto = document.getElementById("detalleTelefonoTienda");
        detalleTelefonoProducto.innerHTML = "Telefono: " + tienda.telefono;

        const detalleCorreoProducto = document.getElementById("detalleCorreoTienda");
        detalleCorreoProducto.innerHTML = "Email: " + tienda.correo;


        $("#botonDetalleMapaTienda").click(function () {
            localStorage.setItem("tienda-coordenadaLatitud", tienda.coordenadaLatidud);
            localStorage.setItem("tienda-coordenadaLongitud", tienda.coordenadaLongitud);
            localStorage.setItem("tienda-mapa-imagen", tienda.imagen);
            localStorage.setItem("tienda-mapa-nombre", tienda.nombre);
            window.location.href = "vistaMapaTiendaUnica.html";
        });

        $("#botonDetalleProductosTienda").click(function () {
            localStorage.setItem("tienda-nombre", tienda.nombre);
            window.location.href = "vistaProductosTiendaSeleccionada.html";
        });

    });

});

