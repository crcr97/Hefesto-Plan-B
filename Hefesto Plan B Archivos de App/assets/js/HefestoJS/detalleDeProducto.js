var retrievedObject = localStorage.getItem('prueba');
console.log(retrievedObject);

const productosContainer = document.getElementById("productos-nombre");
productosContainer.innerHTML=retrievedObject;