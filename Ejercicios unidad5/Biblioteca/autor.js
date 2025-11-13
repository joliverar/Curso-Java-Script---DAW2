export class Autor {
    static siguienteID = 50;

    constructor({ autorId, nombre, nacionalidad, biografia, libros = [] }) {
        this.autorId = autorId ?? Autor.siguienteID++;
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
        this.biografia = biografia;
        this.libros = libros;
    }

    generarHTMLCreacion() {
        return `
        <h2>Crear Autor</h2>
        <form data-form="crear-autor">
            <label>Nombre</label>
            <input name="nombre" required>

            <label>Nacionalidad</label>
            <input name="nacionalidad">

            <label>Biografía</label>
            <textarea name="biografia"></textarea>

            <button type="submit">Guardar</button>
        </form>`;
    }

    generarHTMLEdicion() {
        return `
        <h2>Editar Autor</h2>
        <form data-form="editar-autor" data-id="${this.autorId}">
            <label>Nombre</label>
            <input name="nombre" value="${this.nombre}" required>

            <label>Nacionalidad</label>
            <input name="nacionalidad" value="${this.nacionalidad}">

            <label>Biografía</label>
            <textarea name="biografia">${this.biografia}</textarea>

            <button>Guardar cambios</button>
        </form>`;
    }

    generarHTMLPropiedades() {
        return `
        <h2>${this.nombre}</h2>
        <p><b>Nacionalidad:</b> ${this.nacionalidad}</p>
        <p>${this.biografia}</p>

        <h3>Libros publicados</h3>
        <ul>
            ${this.libros.map(t => `<li>${t}</li>`).join("")}
        </ul>

        <button data-accion="autor-anadir-libro" data-id="${this.autorId}">Añadir Libro</button>
        <button data-accion="autor-eliminar-libro" data-id="${this.autorId}">Eliminar Libro</button>
        <button data-accion="editar-autor" data-id="${this.autorId}">Editar</button>
        <button data-accion="borrar-autor" data-id="${this.autorId}">Borrar</button>
        `;
    }
}
