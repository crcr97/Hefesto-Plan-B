const db = firebase.firestore();
const iconoFavoritos = document.getElementById("detalleFavoritoProducto");
var productoId = String(localStorage.getItem('producto-id'));

window.addEventListener("DOMContentLoaded", async (e) => {

    db.collection("Productos").doc(productoId).onSnapshot(function (doc) {
        const producto = doc.data();

        const detalleImagenProducto = document.getElementById("detalleImagenProducto").src = producto.imagen;

        const detallePrecioProducto = document.getElementById("detallePrecioProducto");
        detallePrecioProducto.innerHTML = "$" + producto.precio;

        const detalleNombreProducto = document.getElementById("detalleNombreProducto");
        detalleNombreProducto.innerHTML = producto.nombre;

        if(producto.favorito == "true"){
            $('#detalleProductoFavorito').addClass("text-danger");
            $('#iconoFavoritos').removeClass("far");
            $('#iconoFavoritos').addClass("fas");
        }
        else{
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

        const detalleTelefonoProducto = document.getElementById("detalleTelefonoProducto");
        detalleTelefonoProducto.innerHTML = "Telefono: " + producto.telefono;

        const detalleCorreoProducto = document.getElementById("detalleCorreoProducto");
        detalleCorreoProducto.innerHTML = "Email: " + producto.correo;

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

        $("#detalleMapaProducto").click(function () {
            localStorage.setItem("producto-coordenadaLatitud", producto.coordenadaLatitud);
            localStorage.setItem("producto-coordenadaLongitud", producto.coordenadaLongitud);
            window.location.href = "vistaMapaTiendaUnica.html";
        });
    });

});

