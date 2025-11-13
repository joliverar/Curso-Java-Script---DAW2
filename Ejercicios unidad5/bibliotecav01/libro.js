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
}
