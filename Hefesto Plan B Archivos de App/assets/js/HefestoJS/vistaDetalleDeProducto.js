const db = firebase.firestore();
const iconoFavoritos = document.getElementById("detalleFavoritoProducto");
var productoId = String(localStorage.getItem('producto-id'));
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

    db.collection("Productos").doc(productoId).onSnapshot(function (doc) {
        const producto = doc.data();

        const detalleImagenProducto = document.getElementById("detalleImagenProducto").src = producto.imagen;

        const detallePrecioProducto = document.getElementById("detallePrecioProducto");
        detallePrecioProducto.innerHTML = "$" + producto.precio;

        const detalleNombreProducto = document.getElementById("detalleNombreProducto");
        detalleNombreProducto.innerHTML = producto.nombre;

        if (producto.favorito == "true") {
            $('#detalleProductoFavorito').addClass("text-danger");
            $('#iconoFavoritos').removeClass("far");
            $('#iconoFavoritos').addClass("fas");
        }
        else {
            $('#detalleProductoFavorito').removeClass("text-danger");
            $('#iconoFavoritos').addClass("far");
            $('#iconoFavoritos').removeClass("fas");
        }

        const detalleUbicacionProducto = document.getElementById("detalleUbicacionProducto");
        detalleUbicacionProducto.innerHTML = producto.ubicacion;

        const detalleDescripcionProducto = document.getElementById("detalleDescripcionProducto");
        detalleDescripcionProducto.innerHTML = producto.descripcion;

        const detalleCategoriaProducto = document.getElementById("detalleCategoriaProducto");
        detalleCategoriaProducto.innerHTML = "Categoria: " + producto.categoria;

        const detalleTiendaProducto = document.getElementById("detalleTiendaProducto");
        detalleTiendaProducto.innerHTML = "Nombre: " + producto.tienda;

        var tiendaId;

        db.collection("Tiendas").where('nombre', '==', producto.tienda).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                const tienda = doc.data();
                tiendaId = doc.id;

                const detalleTelefonoProducto = document.getElementById("detalleTelefonoProducto");
                detalleTelefonoProducto.innerHTML = "Telefono: " + tienda.telefono;

                const detalleCorreoProducto = document.getElementById("detalleCorreoProducto");
                detalleCorreoProducto.innerHTML = "Email: " + tienda.correo;

            });
        });

        $("#detalleProductoFavorito").unbind().click(function () {
            if (producto.favorito == "true") {
                var productoActualizarFavorito = db.collection("Productos").doc(productoId);
                return productoActualizarFavorito.update({
                    favorito: "false"
                });
            }
            else {
                var productoActualizarFavorito = db.collection("Productos").doc(productoId);
                return productoActualizarFavorito.update({
                    favorito: "true"
                });
            }
        });

        $("#botonDetalleTiendaProducto").click(function () {
            localStorage.setItem('tienda-id', tiendaId);
            window.location.href = "vistaDetalleDeTienda.html";
        });
    });

});

