const db = firebase.firestore();

const tiendasForm = document.getElementById("tiendas-form");
const tiendasContainer = document.getElementById("tiendas-container");

let editStatus = false;
let id = '';

const saveTienda = (imagen, nombre, ubicacion, descripcion, telefono, correo,coordenadaLatidud, coordenadaLongitud) =>
  db.collection("Tiendas").doc().set({
    imagen, 
    nombre, 
    ubicacion, 
    descripcion, 
    telefono, 
    correo,
    coordenadaLatidud, 
    coordenadaLongitud
  });

const getTiendas = () => db.collection("Tiendas").get();

const onGetTiendas = (callback) => db.collection("Tiendas").onSnapshot(callback);

const deleteTienda = (id) => db.collection("Tiendas").doc(id).delete();

const getTienda = (id) => db.collection("Tiendas").doc(id).get();

const updateTienda = (id, updatedTask) => db.collection('Tiendas').doc(id).update(updatedTask);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTiendas((querySnapshot) => {
    tiendasContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const tienda = doc.data();

      tiendasContainer.innerHTML +=
        `<div class="card mt-4">
        <img src="${tienda.imagen}" class="img-fluid w-100"/>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${tienda.nombre}</li>
            <li class="list-group-item">${tienda.ubicacion}</li>
            <li class="list-group-item">${tienda.descripcion}</li>
            <li class="list-group-item">${tienda.telefono}</li>
            <li class="list-group-item">${tienda.correo}</li>
            <li class="list-group-item">${tienda.coordenadaLatidud}</li>
            <li class="list-group-item">${tienda.coordenadaLongitud}</li>
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

    const btnsDelete = tiendasContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteTienda(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tiendasContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTienda(e.target.dataset.id);
          const tienda = doc.data();
          tiendasForm["tiendas-imagen"].value = tienda.imagen;
          tiendasForm["tiendas-nombre"].value = tienda.nombre;
          tiendasForm["tiendas-ubicacion"].value = tienda.ubicacion;
          tiendasForm["tiendas-descripcion"].value = tienda.descripcion;
          tiendasForm["tiendas-telefono"].value = tienda.telefono;
          tiendasForm["tiendas-correo"].value = tienda.correo;
          tiendasForm["tiendas-coordenadaLatitud"].value = tienda.coordenadaLatidud;
          tiendasForm["tiendas-coordenadaLongitud"].value = tienda.coordenadaLongitud;
          editStatus = true;
          id = doc.id;
          tiendasForm["tiendas-botonGuardar"].innerText = "Actualizar";

        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

tiendasForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const imagen = tiendasForm["tiendas-imagen"];
  const nombre = tiendasForm["tiendas-nombre"];
  const ubicacion = tiendasForm["tiendas-ubicacion"];
  const descripcion = tiendasForm["tiendas-descripcion"];
  const telefono = tiendasForm["tiendas-telefono"];
  const correo = tiendasForm["tiendas-correo"];
  const coordenadaLatidud = tiendasForm["tiendas-coordenadaLatitud"];
  const  coordenadaLongitud = tiendasForm["tiendas-coordenadaLongitud"];

  try {
    if (!editStatus) {
      await saveTienda(imagen.value, nombre.value, ubicacion.value, descripcion.value, telefono.value, correo.value,coordenadaLatidud.value, coordenadaLongitud.value);
    } else {
      await updateTienda(id, {
        imagen: imagen.value,
        nombre: nombre.value,
        ubicacion: ubicacion.value,
        descripcion: descripcion.value,
        telefono: telefono.value,
        correo: correo.value,
        coordenadaLatidud: coordenadaLatidud.value,
        coordenadaLongitud: coordenadaLongitud.value,
      })

      editStatus = false;
      id = '';
      tiendasForm['tiendas-botonGuardar'].innerText = 'Guardar';
    }

    tiendasForm.reset();
    nombre.focus();
    $("html, body").animate({ scrollTop: 0 }, "slow");

  } catch (error) {
    console.log(error);
  }
});