const db = firebase.firestore();
const productosContainer = document.getElementById("productos-container");
var pantallaAnterior = String(localStorage.getItem('pantalla-anterior'));
var nombreTienda= String(localStorage.getItem("tienda-nombre"));

const getProducto = (id) => db.collection("Productos").doc(id).get();

window.addEventListener("DOMContentLoaded", async (e) => {

    $("#titulo-view").html("Productos de "+nombreTienda);

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


    db.collection("Productos").where("tienda", "==", nombreTienda).onSnapshot(function (querySnapshot) {
        productosContainer.innerHTML = "";
        querySnapshot.forEach(function (doc) {
            const producto = doc.data();

            productosContainer.innerHTML +=
                `<div class="col-xs-6 col-sm-6 col-md-3 px-1 py-1 d-flex">
          <a data-id="${doc.id}" href="#" class="producto-card rounded text-decoration-none">
            <div class="card text-dark">
              <img src="${producto.imagen}" class="card-body p-2 w-100 mb-n1 productos-imagen"/>
              <div class="card-body px-2 pt-0">
                <h5 class="card-title font-weight-bolder productos-info  mb-0" id="productName">$${producto.precio}</h5>
                <p class="card-text productos-info mg-0" id="productDescription">${producto.nombre}</p>
                <p class="card-text productos-info">
                <i class='fas fa-map-marker-alt'></i><small class="text-muted" id="productLocation"> ${producto.ubicacion}</small></p>
              </div>
            </div>
          </a>
        </div>`;
        });

        const productoSeleccionado = productosContainer.querySelectorAll(".producto-card");
        productoSeleccionado.forEach((seleccion) => {
            seleccion.addEventListener("click", async (e) => {
                try {
                    const doc = await getProducto(e.currentTarget.dataset.id);
                    const producto = doc.data();
                    localStorage.setItem("producto-id", doc.id);
                    window.location.href = "vistaDetalleDeProducto.html";
                } catch (error) {
                    console.log(error);
                }
            });
        });

        $("#botonBuscarXSSM").unbind().click(function () {
            localStorage.setItem('busqueda-solicitada', $('#formularioBuscarXSSM').val());
            window.location.href = "vistaResultadoBusqueda.html";
        });

        $("#botonBuscarMDXL").unbind().click(function () {
            localStorage.setItem('busqueda-solicitada', $('#formularioBuscarMDXL').val());
            window.location.href = "vistaResultadoBusqueda.html";
        });

    });
});