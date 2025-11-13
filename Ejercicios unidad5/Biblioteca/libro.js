export class Libro {
    static siguienteID = 200;

    constructor({ libroId, titulo, ISBN, autorId, bibliotecaId, prestamos = [] }) {
        this.libroId = libroId ?? Libro.siguienteID++;
        this.titulo = titulo;
        this.ISBN = ISBN;
        this.autorId = autorId;
        this.bibliotecaId = bibliotecaId;
        this.prestamos = prestamos;
    }

    get estaDisponible() {
        if (this.prestamos.length === 0) return true;
        const ultimo = this.prestamos[this.prestamos.length - 1];
        return !!ultimo.fechaDevolucion;
    }

    generarHTMLCreacion(autores, bibliotecas) {
        return `
        <h2>Crear Libro</h2>
        <form data-form="crear-libro">

            <label>Título</label>
            <input name="titulo" required>

            <label>ISBN</label>
            <input name="ISBN" required>

            <label>Autor</label>
            <select name="autorId" required>
                <option value="">--- Seleccionar autor ---</option>
                ${autores.map(a => `<option value="${a.autorId}">${a.nombre}</option>`).join("")}
            </select>

            <label>Biblioteca</label>
            <select name="bibliotecaId" required>
                <option value="">--- Seleccionar biblioteca ---</option>
                ${bibliotecas.map(b => `<option value="${b.bibliotecaId}">${b.nombre}</option>`).join("")}
            </select>

            <button type="submit">Guardar libro</button>
        </form>
        `;
    }

    generarHTMLEdicion(autores, bibliotecas) {
        return `
        <h2>Editar Libro</h2>
        <form data-form="editar-libro" data-id="${this.libroId}">
            <label>Título</label>
            <input name="titulo" value="${this.titulo}" required>

            <label>ISBN</label>
            <input name="ISBN" value="${this.ISBN}" required>

            <label>Autor</label>
            <select name="autorId">
                ${autores.map(a => `
                    <option value="${a.autorId}" ${a.autorId === this.autorId ? "selected" : ""}>
                        ${a.nombre}
                    </option>`).join("")}
            </select>

            <label>Biblioteca</label>
            <select name="bibliotecaId">
                ${bibliotecas.map(b => `
                    <option value="${b.bibliotecaId}" ${b.bibliotecaId === this.bibliotecaId ? "selected" : ""}>
                        ${b.nombre}
                    </option>`).join("")}
            </select>

            <button type="submit">Guardar cambios</button>
        </form>
        `;
    }

    generarHTMLPropiedades(autor, biblioteca) {
        return `
        <h2>Detalles del Libro</h2>
        <p><b>ID:</b> ${this.libroId}</p>
        <p><b>Título:</b> ${this.titulo}</p>
        <p><b>ISBN:</b> ${this.ISBN}</p>
        <p><b>Autor:</b> ${autor.nombre}</p>
        <p><b>Biblioteca:</b> ${biblioteca.nombre}</p>
        <p><b>Disponible:</b> ${this.estaDisponible ? "Sí" : "No"}</p>

        <button data-accion="editar-libro" data-id="${this.libroId}">Editar</button>
        <button data-accion="borrar-libro" data-id="${this.libroId}">Borrar</button>

        <h3>Préstamos</h3>
        ${this.generarHTMLListadoPrestamos()}

        <button data-accion="crear-prestamo" data-id="${this.libroId}">Crear Préstamo</button>
        <button data-accion="devolver-prestamo" data-id="${this.libroId}">Devolver Préstamo</button>
        `;
    }

    generarHTMLListadoPrestamos() {
        if (this.prestamos.length === 0)
            return "<p>No hay préstamos</p>";

        return `
        <table border="1">
            <tr><th>Préstamo</th><th>Devolución</th></tr>
            ${this.prestamos.map(p => `
                <tr>
                    <td>${p.fechaPrestamo ?? "?"}</td>
                    <td>${p.fechaDevolucion ?? "En préstamo"}</td>
                </tr>`).join("")}
        </table>
        `;
    }
}
