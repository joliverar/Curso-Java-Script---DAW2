// ===============================================
// gestorBiblioteca.js
// ===============================================
// Archivo PRINCIPAL que controla:
// - La SPA (Single Page Application)
// - La gestión de autores, libros y bibliotecas
// - El manejo de eventos con delegación (closest)
// - El uso de POO mediante Libro, Autor, Biblioteca
// - CRUD completo (crear, listar, ver, editar, borrar)
// ===============================================

// Importamos los módulos requeridos
import datos from "./datos.js";
import { Libro } from "./libro.js";
import { Autor } from "./autor.js";
import { Biblioteca } from "./biblioteca.js";

// =======================================================
// IIFE PRINCIPAL:  $biblio
// =======================================================
// Este patrón encapsula datos privados
// y expone métodos públicos para gestionar la app.

export const $biblio = (function () {

    // -----------------------------------------
    // COLECCIONES PRIVADAS (No accesibles fuera)
    // -----------------------------------------
    let autores = [];      // Lista de objetos Autor
    let libros = [];       // Lista de objetos Libro
    let bibliotecas = [];  // Lista de objetos Biblioteca

    // -----------------------------------------
    // init() — carga los datos desde datos.js
    // -----------------------------------------
    function init() {

        // Convertimos cada autor del JSON en instancia de la clase Autor
        autores = datos.autores.map(a => new Autor(a));

        // Convertimos libros a instancia de Libro
        libros = datos.libros.map(l => new Libro(l));

        // Convertimos bibliotecas a instancia de Biblioteca
        bibliotecas = datos.bibliotecas.map(b => new Biblioteca(b));
    }

    // ---------------------------------------------------
    // METODOS PRIVADOS PARA BUSCAR
    // ---------------------------------------------------

    function buscarLibro(id) {
        return libros.find(l => l.libroId === Number(id));
    }

    function buscarAutor(id) {
        return autores.find(a => a.autorId === Number(id));
    }

    function buscarBiblioteca(id) {
        return bibliotecas.find(b => b.bibliotecaId === Number(id));
    }

    // ---------------------------------------------------
    // CREAR ENTIDADES
    // ---------------------------------------------------

    function crearLibro(info) {
        const nuevo = new Libro(info);
        libros.push(nuevo);
    }

    function crearAutor(info) {
        const nuevo = new Autor(info);
        autores.push(nuevo);
    }

    function crearBiblioteca(info) {
        const nuevo = new Biblioteca(info);
        bibliotecas.push(nuevo);
    }

    // ---------------------------------------------------
    // BORRAR ENTIDADES
    // ---------------------------------------------------
    function borrarLibro(id) {
        libros = libros.filter(l => l.libroId !== Number(id));
    }

    function borrarAutor(id) {
        autores = autores.filter(a => a.autorId !== Number(id));
    }

    function borrarBiblioteca(id) {
        bibliotecas = bibliotecas.filter(b => b.bibliotecaId !== Number(id));
    }

    // ---------------------------------------------------
    // PRESTAMOS (crear y devolver)
    // ---------------------------------------------------

    function crearPrestamo(libro) {
        if (!libro.estaDisponible) return;

        libro.prestamos.push({
            fechaPrestamo: new Date().toISOString().substring(0, 10),
            fechaDevolucion: null
        });
    }

    function devolverPrestamo(libro) {
        if (libro.estaDisponible) return;

        const ultimo = libro.prestamos[libro.prestamos.length - 1];
        ultimo.fechaDevolucion = new Date().toISOString().substring(0, 10);
    }

    // ---------------------------------------------------
    // LISTADOS — generan HTML COMPLETO
    // ---------------------------------------------------

    function generarHTMLListadoLibros() {
        return `
        <h2>Listado de Libros</h2>
        <button data-accion="crear-libro">Crear Libro</button>

        <table border="1" cellpadding="5">
            <tr>
                <th>ID</th><th>Título</th><th>Autor</th><th>Biblioteca</th><th>Acciones</th>
            </tr>

            ${libros.map(l => `
                <tr>
                    <td>${l.libroId}</td>
                    <td>${l.titulo}</td>
                    <td>${buscarAutor(l.autorId).nombre}</td>
                    <td>${buscarBiblioteca(l.bibliotecaId).nombre}</td>
                    <td>
                        <button data-accion="ver-libro" data-id="${l.libroId}">Ver</button>
                        <button data-accion="editar-libro" data-id="${l.libroId}">Editar</button>
                        <button data-accion="borrar-libro" data-id="${l.libroId}">Borrar</button>
                    </td>
                </tr>
            `).join("")}
        </table>
        `;
    }

    function generarHTMLListadoAutores() {
        return `
        <h2>Listado de Autores</h2>
        <button data-accion="crear-autor">Crear Autor</button>

        <table border="1">
            <tr><th>ID</th><th>Nombre</th><th>Libros</th><th>Acciones</th></tr>

            ${autores.map(a => `
            <tr>
                <td>${a.autorId}</td>
                <td>${a.nombre}</td>
                <td>${a.libros.length}</td>
                <td>
                    <button data-accion="ver-autor" data-id="${a.autorId}">Ver</button>
                    <button data-accion="editar-autor" data-id="${a.autorId}">Editar</button>
                    <button data-accion="borrar-autor" data-id="${a.autorId}">Borrar</button>
                </td>
            </tr>
            `).join("")}
        </table>`;
    }

    function generarHTMLListadoBibliotecas() {
        return `
        <h2>Listado Bibliotecas</h2>
        <button data-accion="crear-biblioteca">Crear Biblioteca</button>

        <table border="1">
            <tr><th>ID</th><th>Nombre</th><th>Ubicación</th><th>Acciones</th></tr>

            ${bibliotecas.map(b => `
            <tr>
                <td>${b.bibliotecaId}</td>
                <td>${b.nombre}</td>
                <td>${b.ubicacion}</td>
                <td>
                    <button data-accion="ver-biblioteca" data-id="${b.bibliotecaId}">Ver</button>
                    <button data-accion="editar-biblioteca" data-id="${b.bibliotecaId}">Editar</button>
                    <button data-accion="borrar-biblioteca" data-id="${b.bibliotecaId}">Borrar</button>
                </td>
            </tr>
            `).join("")}
        </table>
        `;
    }

    // ---------------------------------------------------
    // BUSCADOR
    // ---------------------------------------------------

    function buscarLibrosPorTitulo(texto) {
        return libros.filter(l => 
            l.titulo.toLowerCase().includes(texto.toLowerCase())
        );
    }

    function buscarLibrosPorAutor(texto) {
        return libros.filter(l => {
            const autor = buscarAutor(l.autorId);
            return autor.nombre.toLowerCase().includes(texto.toLowerCase());
        });
    }

    function generarHTMLResultadoBuscador(resultados) {
        if (resultados.length === 0)
            return "<p>No se encontró nada</p>";

        return `
        <h2>Resultados</h2>

        <ul>
            ${resultados.map(l => `
                <li>
                    <b>${l.titulo}</b> — ${buscarAutor(l.autorId).nombre}
                    <button data-accion="ver-libro" data-id="${l.libroId}">
                        Ver
                    </button>
                </li>`).join("")}
        </ul>`;
    }

    // ---------------------------------------------------
    // MÉTODOS PÚBLICOS
    // ---------------------------------------------------
    return {
        init,
        crearLibro,
        crearAutor,
        crearBiblioteca,
        borrarLibro,
        borrarAutor,
        borrarBiblioteca,
        crearPrestamo,
        devolverPrestamo,

        generarHTMLListadoAutores,
        generarHTMLListadoLibros,
        generarHTMLListadoBibliotecas,

        buscarLibrosPorTitulo,
        buscarLibrosPorAutor,
        generarHTMLResultadoBuscador,

        // EXPONEMOS BUSCADORES INDIVIDUALES
        buscarLibro,
        buscarAutor,
        buscarBiblioteca,

        autores: () => autores,
        bibliotecas: () => bibliotecas
    };

})();

// =======================================================
// INICIALIZAR DATOS
// =======================================================
$biblio.init();


// =======================================================
// SPA + EVENTOS CON DELEGACIÓN Y closest
// =======================================================

const app = document.querySelector("#app");
const nav = document.querySelector("nav");

// Cambiar contenido del SPA
function cargarVista(html) {
    app.innerHTML = html;
}

// -------------------------------------------
// 1) DELEGACIÓN MENÚ SUPERIOR
// -------------------------------------------
nav.addEventListener("click", e => {
    const btn = e.target.closest("button[data-accion]");
    if (!btn) return;

    const accion = btn.dataset.accion;

    if (accion === "listado-libros")
        return cargarVista($biblio.generarHTMLListadoLibros());

    if (accion === "listado-autores")
        return cargarVista($biblio.generarHTMLListadoAutores());

    if (accion === "listado-bibliotecas")
        return cargarVista($biblio.generarHTMLListadoBibliotecas());
});

// -------------------------------------------
// 2) DELEGACIÓN DE FORMULARIO DE BUSQUEDA
// -------------------------------------------
document.querySelector("#form-buscar")
.addEventListener("submit", e => {
    e.preventDefault();

    const form = e.target;
    const tipo = form.tipo.value;
    const texto = form.texto.value;

    let resultados = [];

    if (tipo === "titulo")
        resultados = $biblio.buscarLibrosPorTitulo(texto);

    if (tipo === "autor")
        resultados = $biblio.buscarLibrosPorAutor(texto);

    cargarVista($biblio.generarHTMLResultadoBuscador(resultados));
});

// -------------------------------------------
// 3) DELEGACIÓN DENTRO DE #app
// -------------------------------------------
app.addEventListener("click", e => {

    const btn = e.target.closest("[data-accion]");
    if (!btn) return;

    const accion = btn.dataset.accion;
    const id = btn.dataset.id;

    // LIBROS -------------------------
    if (accion === "crear-libro") {
        const dummy = new Libro({ titulo:"", ISBN:"" });
        return cargarVista(dummy
            .generarHTMLCreacion($biblio.autores(), $biblio.bibliotecas()));
    }

    if (accion === "ver-libro") {
        const libro = $biblio.buscarLibro(id);
        return cargarVista(
            libro.generarHTMLPropiedades(
                $biblio.buscarAutor(libro.autorId),
                $biblio.buscarBiblioteca(libro.bibliotecaId)
            )
        );
    }

    if (accion === "editar-libro") {
        const libro = $biblio.buscarLibro(id);
        return cargarVista(
            libro.generarHTMLEdicion($biblio.autores(), $biblio.bibliotecas())
        );
    }

    if (accion === "borrar-libro") {
        $biblio.borrarLibro(id);
        return cargarVista($biblio.generarHTMLListadoLibros());
    }

    if (accion === "crear-prestamo") {
        const libro = $biblio.buscarLibro(id);
        $biblio.crearPrestamo(libro);
        return cargarVista(
            libro.generarHTMLPropiedades(
                $biblio.buscarAutor(libro.autorId),
                $biblio.buscarBiblioteca(libro.bibliotecaId)
            )
        );
    }

    if (accion === "devolver-prestamo") {
        const libro = $biblio.buscarLibro(id);
        $biblio.devolverPrestamo(libro);
        return cargarVista(
            libro.generarHTMLPropiedades(
                $biblio.buscarAutor(libro.autorId),
                $biblio.buscarBiblioteca(libro.bibliotecaId)
            )
        );
    }

    // AUTORES -------------------------
    if (accion === "crear-autor") {
        const dummy = new Autor({ nombre:"", nacionalidad:"", biografia:"" });
        return cargarVista(dummy.generarHTMLCreacion());
    }

    if (accion === "ver-autor") {
        const autor = $biblio.buscarAutor(id);
        return cargarVista(autor.generarHTMLPropiedades());
    }

    if (accion === "editar-autor") {
        const autor = $biblio.buscarAutor(id);
        return cargarVista(autor.generarHTMLEdicion());
    }

    if (accion === "borrar-autor") {
        $biblio.borrarAutor(id);
        return cargarVista($biblio.generarHTMLListadoAutores());
    }

    // BIBLIOTECAS -------------------------
    if (accion === "crear-biblioteca") {
        const dummy = new Biblioteca({ nombre:"", ubicacion:"" });
        return cargarVista(dummy.generarHTMLCreacion());
    }

    if (accion === "ver-biblioteca") {
        const b = $biblio.buscarBiblioteca(id);
        return cargarVista(`
            <h2>${b.nombre}</h2>
            <p><b>Ubicación:</b> ${b.ubicacion}</p>
        `);
    }

    if (accion === "editar-biblioteca") {
        const b = $biblio.buscarBiblioteca(id);
        return cargarVista(b.generarHTMLEdicion());
    }

    if (accion === "borrar-biblioteca") {
        $biblio.borrarBiblioteca(id);
        return cargarVista($biblio.generarHTMLListadoBibliotecas());
    }
});

// -------------------------------------------
// 4) DELEGACIÓN DE FORMULARIOS CRUD
// -------------------------------------------
app.addEventListener("submit", e => {

    const form = e.target.closest("form[data-form]");
    if (!form) return;

    e.preventDefault();

    const tipo = form.dataset.form;
    const id = form.dataset.id;
    const datosForm = Object.fromEntries(new FormData(form).entries());

    // LIBRO
    if (tipo === "crear-libro") {
        $biblio.crearLibro({
            titulo: datosForm.titulo,
            ISBN: datosForm.ISBN,
            autorId: Number(datosForm.autorId),
            bibliotecaId: Number(datosForm.bibliotecaId)
        });
        return cargarVista($biblio.generarHTMLListadoLibros());
    }

    if (tipo === "editar-libro") {
        const libro = $biblio.buscarLibro(id);
        libro.titulo = datosForm.titulo;
        libro.ISBN = datosForm.ISBN;
        libro.autorId = Number(datosForm.autorId);
        libro.bibliotecaId = Number(datosForm.bibliotecaId);
        return cargarVista($biblio.generarHTMLListadoLibros());
    }

    // AUTOR
    if (tipo === "crear-autor") {
        $biblio.crearAutor(datosForm);
        return cargarVista($biblio.generarHTMLListadoAutores());
    }

    if (tipo === "editar-autor") {
        const autor = $biblio.buscarAutor(id);
        autor.nombre = datosForm.nombre;
        autor.nacionalidad = datosForm.nacionalidad;
        autor.biografia = datosForm.biografia;
        return cargarVista($biblio.generarHTMLListadoAutores());
    }

    // BIBLIOTECA
    if (tipo === "crear-biblioteca") {
        $biblio.crearBiblioteca(datosForm);
        return cargarVista($biblio.generarHTMLListadoBibliotecas());
    }

    if (tipo === "editar-biblioteca") {
        const b = $biblio.buscarBiblioteca(id);
        b.nombre = datosForm.nombre;
        b.ubicacion = datosForm.ubicacion;
        return cargarVista($biblio.generarHTMLListadoBibliotecas());
    }

});
