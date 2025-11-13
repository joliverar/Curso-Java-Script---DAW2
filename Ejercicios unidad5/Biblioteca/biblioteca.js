export class Biblioteca {
    static siguienteID = 10;

    constructor({ bibliotecaId, nombre, ubicacion }) {
        this.bibliotecaId = bibliotecaId ?? Biblioteca.siguienteID++;
        this.nombre = nombre;
        this.ubicacion = ubicacion;
    }

    generarHTMLCreacion() {
        return `
        <h2>Crear Biblioteca</h2>
        <form data-form="crear-biblioteca">
            <label>Nombre</label>
            <input name="nombre" required>

            <label>Ubicación</label>
            <input name="ubicacion">

            <button>Guardar</button>
        </form>
        `;
    }

    generarHTMLEdicion() {
        return `
        <h2>Editar Biblioteca</h2>
        <form data-form="editar-biblioteca" data-id="${this.bibliotecaId}">
            <label>Nombre</label>
            <input name="nombre" value="${this.nombre}" required>

            <label>Ubicación</label>
            <input name="ubicacion" value="${this.ubicacion}">

            <button>Guardar cambios</button>
        </form>
        `;
    }
}
