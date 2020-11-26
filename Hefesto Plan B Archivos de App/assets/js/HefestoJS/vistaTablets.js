const db = firebase.firestore();
const tabletsContainer = document.getElementById("tablets-container");

const getProducto = (id) => db.collection("Productos").doc(id).get();

window.addEventListener("DOMContentLoaded", async (e) => {

    db.collection("Productos").where("categoria", "==", "Tablet").onSnapshot(function (querySnapshot) {
        tabletsContainer.innerHTML = "";
        querySnapshot.forEach(function (doc) {
            const producto = doc.data();

            tabletsContainer.innerHTML +=
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

        const productoSeleccionado = tabletsContainer.querySelectorAll(".producto-card");
        productoSeleccionado.forEach((seleccion) => {
            seleccion.addEventListener("click", async (e) => {
                try {
                    const doc = await getProducto(e.currentTarget.dataset.id);
                    const producto = doc.data();
                    localStorage.setItem("pantalla-anterior","tablets");                    
                    localStorage.setItem("producto-id", doc.id);
                    window.location.href = "vistaDetalleDeProducto.html";
                } catch (error) {
                    console.log(error);
                }
            });
        });

        $("#botonBuscarXSSM").unbind().click(function () {
            localStorage.setItem("pantalla-anterior","tablets");                                
            localStorage.setItem('busqueda-solicitada', $('#formularioBuscarXSSM').val());
            window.location.href = "vistaResultadoBusqueda.html";
        });

        $("#botonBuscarMDXL").unbind().click(function () {
            localStorage.setItem("pantalla-anterior","tablets");                                
            localStorage.setItem('busqueda-solicitada', $('#formularioBuscarMDXL').val());
            window.location.href = "vistaResultadoBusqueda.html";
        });

    });
});