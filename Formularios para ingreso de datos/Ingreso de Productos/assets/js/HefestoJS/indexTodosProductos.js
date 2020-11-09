const db = firebase.firestore();

const productosForm = document.getElementById("productos-form");
const productosContainer = document.getElementById("productos-container");

let editStatus = false;
let id = '';

const saveProducto = (categoria, coordenadaLatitud, coordenadaLongitud, descripcion, favorito, imagen, nombre, precio, tienda, ubicacion) =>
  db.collection("Productos").doc().set({
    categoria,
    coordenadaLatitud,
    coordenadaLongitud,
    descripcion,
    favorito,
    imagen,
    nombre,
    precio,
    tienda,
    ubicacion
  });

const getProductos = () => db.collection("Productos").get();

const onGetProductos = (callback) => db.collection("Productos").onSnapshot(callback);

const deleteProduct = (id) => db.collection("Productos").doc(id).delete();

const getProducto = (id) => db.collection("Productos").doc(id).get();

const updateProducto = (id, updatedTask) => db.collection('Productos').doc(id).update(updatedTask);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetProductos((querySnapshot) => {
    productosContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const producto = doc.data();

      productosContainer.innerHTML +=
        `<div class="card mt-4">
        <img src="${producto.imagen}" class="img-fluid w-100"/>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${producto.nombre}</li>
            <li class="list-group-item">${producto.precio}</li>
            <li class="list-group-item">${producto.descripcion}</li>
            <li class="list-group-item">${producto.ubicacion}</li>
            <li class="list-group-item">${producto.favorito}</li>
            <li class="list-group-item">${producto.categoria}</li>
            <li class="list-group-item">${producto.tienda}</li>
            <li class="list-group-item">${producto.coordenadaLatitud}</li>
            <li class="list-group-item">${producto.coordenadaLongitud}</li>
            <li class="list-group-item align-content-between align-items-center col d-flex justify-content-center">
            <button class="btn btn-primary btn-delete mr-3" data-id="${doc.id}">
              🗑 Delete
            </button>
            <button class="btn btn-secondary btn-edit ml-3" data-id="${doc.id}">
              🖉 Edit
            </button>
            </li>
        </ul>
      </div>`;
    });

    const btnsDelete = productosContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteProduct(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = productosContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getProducto(e.target.dataset.id);
          const producto = doc.data();
          productosForm["productos-nombre"].value = producto.nombre;
          productosForm["productos-precio"].value = producto.precio;
          productosForm["productos-descripcion"].value = producto.descripcion;
          productosForm["productos-ubicacion"].value = producto.ubicacion;
          productosForm["productos-favorito"].value = producto.favorito;
          productosForm["productos-imagen"].value = producto.imagen;
          productosForm["productos-categoria"].value = producto.categoria;
          productosForm["productos-tienda"].value = producto.tienda;
          productosForm["productos-coordenadaLatitud"].value = producto.coordenadaLatitud;
          productosForm["productos-coordenadaLongitud"].value = producto.coordenadaLongitud;

          editStatus = true;
          id = doc.id;
          productosForm["productos-botonGuardar"].innerText = "Actualizar";

        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

productosForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = productosForm["productos-nombre"];
  const precio = productosForm["productos-precio"];
  const descripcion = productosForm["productos-descripcion"];
  const ubicacion = productosForm["productos-ubicacion"];
  const favorito = productosForm["productos-favorito"];
  const imagen = productosForm["productos-imagen"];
  const categoria = productosForm["productos-categoria"];
  const tienda = productosForm["productos-tienda"];
  const coordenadaLatitud = productosForm["productos-coordenadaLatitud"];
  const coordenadaLongitud = productosForm["productos-coordenadaLongitud"];

  try {
    if (!editStatus) {
      await saveProducto(categoria.value, coordenadaLatitud.value, coordenadaLongitud.value, descripcion.value, favorito.value, imagen.value, nombre.value, precio.value, tienda.value, ubicacion.value);
    } else {
      await updateProducto(id, {
        categoria: categoria.value,
        coordenadaLatitud: coordenadaLatitud.value,
        coordenadaLongitud: coordenadaLongitud.value,
        descripcion: descripcion.value,
        favorito: favorito.value,
        imagen: imagen.value,
        nombre: nombre.value,
        precio: precio.value,
        tienda: tienda.value,
        ubicacion: ubicacion.value,
      })

      editStatus = false;
      id = '';
      productosForm['productos-botonGuardar'].innerText = 'Guardar';
    }

    productosForm.reset();
    nombre.focus();
    $("html, body").animate({ scrollTop: 0 }, "slow");

  } catch (error) {
    console.log(error);
  }
});