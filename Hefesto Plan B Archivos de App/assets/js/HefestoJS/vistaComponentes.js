const productosContainer = document.getElementById("oficinas-container");

window.addEventListener("DOMContentLoaded", async (e) => {
    const productoSeleccionado = productosContainer.querySelectorAll(".oficina-card");
    productoSeleccionado.forEach((seleccion) => {
        seleccion.addEventListener("click", async (e) => {
            const doc = e.currentTarget.dataset.id;
            localStorage.setItem("pantalla-anterior", "componentes");
            localStorage.setItem("categoria-seleccionada", doc);
            window.location.href = "vistaDetalleCategoria.html";
        });
    });
});