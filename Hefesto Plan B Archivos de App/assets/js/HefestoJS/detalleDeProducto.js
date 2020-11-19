var productoId                  = localStorage.getItem('producto-id');
var productoCategoria           = localStorage.getItem('producto-categoria');
var productoCoordenadaLatitud   = localStorage.getItem('producto-coordenadaLatitud');
var productoCoordenadaLongitud  = localStorage.getItem('producto-coordenadaLongitud');
var productoCorreo              = localStorage.getItem('producto-correo');
var productoDescripcion         = localStorage.getItem('producto-descripcion');
var productoFavorito            = localStorage.getItem('producto-favorito');
var productoImagen              = localStorage.getItem('producto-imagen');
var productoNombre              = localStorage.getItem('producto-nombre');
var productoPrecio              = localStorage.getItem('producto-precio');
var productoTelefono            = localStorage.getItem('producto-telefono');
var productoTienda              = localStorage.getItem('producto-tienda');
var productoUbicacion           = localStorage.getItem('producto-ubicacion');

// console.log(productoId                );
// console.log(productoCategoria         );
// console.log(productoCoordenadaLatitud );
// console.log(productoCoordenadaLongitud);
// console.log(productoCorreo            );
// console.log(productoDescripcion       );
// console.log(productoFavorito          );
// console.log(productoImagen            );
// console.log(productoNombre            );
// console.log(productoPrecio            );
// console.log(productoTelefono          );
// console.log(productoTienda            );
// console.log(productoUbicacion         );

//Colocando elementos en vista HTML
const detalleImagenProducto = document.getElementById("detalleImagenProducto").src=productoImagen;

const detallePrecioProducto = document.getElementById("detallePrecioProducto");
detallePrecioProducto.innerHTML="$"+productoPrecio;

const detalleNombreProducto = document.getElementById("detalleNombreProducto");
detalleNombreProducto.innerHTML=productoNombre;

const detalleUbicacionProducto = document.getElementById("detalleUbicacionProducto");
detalleUbicacionProducto.innerHTML=productoUbicacion;

const detalleDescripcionProducto = document.getElementById("detalleDescripcionProducto");
detalleDescripcionProducto.innerHTML=productoDescripcion;

const detalleCategoriaProducto = document.getElementById("detalleCategoriaProducto");
detalleCategoriaProducto.innerHTML="Categoria: "+productoCategoria;

const detalleTiendaProducto = document.getElementById("detalleTiendaProducto");
detalleTiendaProducto.innerHTML="Nombre: "+productoTienda;

const detalleTelefonoProducto = document.getElementById("detalleTelefonoProducto");
detalleTelefonoProducto.innerHTML="Telefono: "+productoTelefono;

const detalleCorreoProducto = document.getElementById("detalleCorreoProducto");
detalleCorreoProducto.innerHTML="Email: "+productoCorreo;