const db = firebase.firestore();
const productContainer = document.getElementById("products-container");

const onGetTasks = (callback) => db.collection("Productos").onSnapshot(callback);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    productContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const product = doc.data();

      productContainer.innerHTML += 
      `<a href="vistaDonaciones.html" class="d-flex menuPrincipal ml-2 mr-2"><div class="card mb-3 text-dark">
        <img src="${product.imagen}" class="w-100"/>
        <div class="card-body">
            <h5 class="card-title font-weight-bolder" id="productName">${product.nombre}</h5>
            <p class="card-text" id="productDescription">${product.descripcion}</p>
            <p class="card-text"><small class="text-muted" id="productLocation">${product.tienda}</small></p>
        </div>
    </div>  </a>`;
    });
  });
});
