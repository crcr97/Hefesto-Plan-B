const db = firebase.firestore();
const productosBusquedaContainer = document.getElementById("busqueda-container");
var busquedaSolicitada = String(localStorage.getItem('busqueda-solicitada'));
var pantallaAnterior = String(localStorage.getItem('pantalla-anterior'));

console.log(busquedaSolicitada);

const getProducto = (id) => db.collection("Productos").doc(id).get();

window.addEventListener("DOMContentLoaded", async (e) => {

  var consulta;

  switch (pantallaAnterior) {
      case 'inicio':
          $('#navMenuPrincipal').addClass("active");
          $("#titulo-view").html("Busqueda en todos los productos");
          consulta = db.collection("Productos");
          break;

      case 'tiendas':
          $('#navTiendas').addClass("active");
          break;

      case 'favoritos':
          $('#navFavoritos').addClass("active");
          $("#titulo-view").html("Busqueda en favoritos");
          consulta = db.collection("Productos").where('favorito','==','true');
          break;

      case 'laptops':
          $('#navLaptops').addClass("active");
          $("#titulo-view").html("Busqueda en laptops");
          consulta = db.collection("Productos").where('categoria','==','Laptop');
          break;

      case 'desktops':
          $('#navDesktops').addClass("active");
          $("#titulo-view").html("Busqueda en desktops");
          consulta = db.collection("Productos").where('categoria','==','PC Escritorio');
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
          $("#titulo-view").html("Busqueda en tablets");
          consulta = db.collection("Productos").where('categoria','==','Tablet');
          break;

      case 'celulares':
          $('#navCelulares').addClass("active");          
          $("#titulo-view").html("Busqueda en celulares");
          consulta = db.collection("Productos").where('categoria','==','Celular');          
          break;
  }

    const markers = [];

    consulta.get().then(function(querySnapshot) {
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
             "nombre",
             "descripcion"
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
                <a data-id="${producto.id}" href="#" class="producto-card rounded  text-decoration-none">
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