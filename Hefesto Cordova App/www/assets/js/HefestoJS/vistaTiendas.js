const db = firebase.firestore();
const tiendasContainer = document.getElementById("tiendas-container");

const getTienda = (id) => db.collection("Tiendas").doc(id).get();

window.addEventListener("DOMContentLoaded", async (e) => {

    db.collection("Tiendas").onSnapshot(function (querySnapshot) {
        tiendasContainer.innerHTML = "";
        querySnapshot.forEach(function (doc) {
            const tienda = doc.data();

            tiendasContainer.innerHTML +=
                `<div class="col-xs-4 col-sm-4 col-md-3 px-1 py-1 d-flex">
          <a data-id="${doc.id}" href="#" class="tienda-card rounded text-decoration-none">
            <div class="card text-dark">
              <img src="${tienda.imagen}" class="card-body p-2 w-100 mb-n1 productos-imagen"/>
              <div class="card-body px-2 pt-0">
                <h5 class="card-title font-weight-bolder productos-info  mb-0" id="productName">${tienda.nombre}</h5>
                <p class="card-text productos-info mb-0">
                <i class='fas fa-map-marker-alt mb-0'></i><small class="text-muted" id="productLocation"> ${tienda.ubicacion}</small></p>
              </div>
            </div>
          </a>
        </div>`;
        });

        const productoSeleccionado = tiendasContainer.querySelectorAll(".tienda-card");
        productoSeleccionado.forEach((seleccion) => {
            seleccion.addEventListener("click", async (e) => {
                try {
                    const doc = await getTienda(e.currentTarget.dataset.id);
                    const tienda = doc.data();
                    localStorage.setItem("pantalla-anterior","tiendas");
                    localStorage.setItem("tienda-id", doc.id);
                    window.location.href = "vistaDetalleDeTienda.html";
                } catch (error) {
                    console.log(error);
                }
            });
        });

        $("#botonBuscarXSSM").unbind().click(function () {
            localStorage.setItem("pantalla-anterior","tiendas");            
            localStorage.setItem('busqueda-solicitada', $('#formularioBuscarXSSM').val());
            window.location.href = "vistaResultadoBusqueda.html";
        });

        $("#botonBuscarMDXL").unbind().click(function () {
            localStorage.setItem("pantalla-anterior","tiendas");            
            localStorage.setItem('busqueda-solicitada', $('#formularioBuscarMDXL').val());
            window.location.href = "vistaResultadoBusqueda.html";
        });

    });
});