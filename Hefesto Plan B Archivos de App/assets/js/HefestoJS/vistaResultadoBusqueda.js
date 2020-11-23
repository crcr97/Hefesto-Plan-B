const db = firebase.firestore();
const productosBusquedaContainer = document.getElementById("busqueda-container");
var busquedaSolicitada = String(localStorage.getItem('busqueda-solicitada'));
console.log(busquedaSolicitada);

const getProducto = (id) => db.collection("Productos").doc(id).get();

window.addEventListener("DOMContentLoaded", async (e) => {

    const markers = [];

    db.collection("Productos").get().then(function(querySnapshot) {
        productosBusquedaContainer.innerHTML = "";
        querySnapshot.forEach(function(doc) {
            var id = String(doc.id);
            markers.push({id,...doc.data()});
            console.log(doc.data());
        });
        
        const options = {
            isCaseSensitive: false,
           // includeScore: false,
           // shouldSort: true,
           // includeMatches: false,
           // findAllMatches: false,
           // minMatchCharLength: 1,
           // location: 0,
           // threshold: 0.6,
           // distance: 100,
           // useExtendedSearch: false,
           // ignoreLocation: false,
           // ignoreFieldNorm: false,
           keys: [
             "nombre"
           ]
         };
         
         const fuse = new Fuse(markers, options);
         // Change the pattern
         const pattern = busquedaSolicitada;
         console.log('DESPUES DE FILTRAR')
         const results = fuse.search(pattern);
         const productResults = results.map((result) => result.item);

         productResults.forEach(function(producto) {
             console.log(producto);
            productosBusquedaContainer.innerHTML +=
              `<div class="col-xs-6 col-sm-6 col-md-3 px-1 py-1 d-flex">
                <a data-id="${producto.id}" href="#" class="producto-card border  text-decoration-none">
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

        const productoSeleccionado = productosBusquedaContainer.querySelectorAll(".producto-card");
        productoSeleccionado.forEach((seleccion) => {
          seleccion.addEventListener("click", async (e) => {
            try {
              const doc = await getProducto(e.currentTarget.dataset.id);
              const producto = doc.data();
              localStorage.setItem("producto-id",doc.id);
              window.location.href = "vistaDetalleDeProducto.html";
            } catch (error) {
              console.log(error);
            }
          });
        });
    })
});