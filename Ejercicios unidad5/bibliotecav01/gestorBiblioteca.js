import datos from "./datos.js";
import { Libro } from "./libro.js";

// ========================
//  IIFE $biblio (gestor)
// ========================
export const $biblio = (function () {

    // Colecciones POO
    let autores = [];
    let bibliotecas = [];
    let libros = [];

    // Cargar datos desde datos.js
    function init() {
        autores = datos.autores;
        bibliotecas = datos.bibliotecas;
        libros = datos.libros.map(l => new Libro(l));
    }

    // Crear libro
    function crearLibro(info) {
        const nuevo = new Libro(info);
        libros.push(nuevo);
        console.log("Libro creado:", nuevo);
    }

    // Listado de libros
    function generarHTMLListadoLibros() {
        return `
            <h2>Listado de Libros</h2>
            <table border="1" cellpadding="5">
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>ISBN</th>
                    <th>Autor</th>
                    <th>Biblioteca</th>
                </tr>

                ${libros.map(l => `
                <tr>
                    <td>${l.libroId}</td>
                    <td>${l.titulo}</td>
                    <td>${l.ISBN}</td>
                    <td>${obtenerAutor(l.autorId).nombre}</td>
                    <td>${obtenerBiblioteca(l.bibliotecaId).nombre}</td>
                </tr>
                `).join("")}
            </table>
        `;
    }

    // Helpers privados
    function obtenerAutor(id) {
        return autores.find(a => a.autorId === Number(id));
    }

    function obtenerBiblioteca(id) {
        return bibliotecas.find(b => b.bibliotecaId === Number(id));
    }

    return {
        init,
        autores: () => autores,
        bibliotecas: () => bibliotecas,
        crearLibro,
        generarHTMLListadoLibros
    };

})();

// Inicializar datos
$biblio.init();


// =============================
// SPA + Delegación (closest)
// =============================
const app = document.querySelector("#app");
const nav = document.querySelector("nav");

// Cambiar vista
function cargarVista(html) {
    app.innerHTML = html;
}

// Delegación del menú
nav.addEventListener("click", e => {
    const btn = e.target.closest("button[data-accion]");
    if (!btn) return;

    const accion = btn.dataset.accion;

    if (accion === "listado-libros") {
        cargarVista($biblio.generarHTMLListadoLibros());
    }

    if (accion === "crear-libro") {
        const libroTemp = new Libro({
            titulo: "",
            ISBN: "",
            autorId: null,
            bibliotecaId: null
        });

        cargarVista(libroTemp.generarHTMLCreacion(
            $biblio.autores(),
            $biblio.bibliotecas()
        ));
    }
});

// Delegación de formularios dentro de #app
app.addEventListener("submit", e => {
    const form = e.target.closest("form[data-form]");
    if (!form) return;

    e.preventDefault();

    const datos = Object.fromEntries(new FormData(form));

    $biblio.crearLibro({
        titulo: datos.titulo,
        ISBN: datos.ISBN,
        autorId: Number(datos.autorId),
        bibliotecaId: Number(datos.bibliotecaId)
    });

    cargarVista(`<h3>Libro creado correctamente ✔</h3>`);
});
