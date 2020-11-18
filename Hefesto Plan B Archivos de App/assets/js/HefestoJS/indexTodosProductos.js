const db = firebase.firestore();
const productosContainer = document.getElementById("productos-container");

const onGetProductos = (callback) => db.collection("Productos").onSnapshot(callback);
const getProducto = (id) => db.collection("Productos").doc(id).get();

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetProductos((querySnapshot) => {
    productosContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const producto = doc.data();

      productosContainer.innerHTML +=
        `<div class="col-xs-6 col-sm-6 col-md-3 px-1 py-4 d-flex">
          <a data-id="${doc.id}" href="#" class="producto-card border  text-decoration-none">
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
          console.log(producto.nombre);
          localStorage.setItem("prueba", producto.nombre);
          window.location.href = "vistaDetalleDeProducto.html";
        } catch (error) {
          console.log(error);
        }
      });
    });

  });
});