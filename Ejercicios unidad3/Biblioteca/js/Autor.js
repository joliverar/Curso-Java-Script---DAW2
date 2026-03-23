export class Autor {
  constructor(autorId, nombre, nacionalidad, biografia, libros = []) {
    this.autorId = autorId;
    this.nombre = nombre;
    this.nacionalidad = nacionalidad;
    this.biografia = biografia;
    this.libros = libros;
  }

  generarHTMLCreacion() {
    return `
      <div class="tarjeta">
        <h2>Crear autor</h2>
        <form id="formCrearAutor">
          <label>Nombre</label>
          <input type="text" name="nombre" required>

          <label>Nacionalidad</label>
          <input type="text" name="nacionalidad" required>

          <label>Biografía</label>
          <textarea name="biografia" rows="5" required></textarea>

          <div class="acciones">
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    `;
  }

  generarHTMLPropiedades() {
    return `
      <div class="tarjeta">
        <h2>Detalle del autor</h2>
        <p><strong>ID:</strong> ${this.autorId}</p>
        <p><strong>Nombre:</strong> ${this.nombre}</p>
        <p><strong>Nacionalidad:</strong> ${this.nacionalidad}</p>
        <p><strong>Biografía:</strong> ${this.biografia}</p>

        <h3>Libros publicados</h3>
        ${
          this.libros.length === 0
            ? `<div class="vacio">No tiene libros asociados.</div>`
            : `
              <table class="tabla">
                <thead>
                  <tr>
                    <th>Título</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.libros
                    .map(
                      (titulo) => `
                    <tr>
                      <td>${titulo}</td>
                    </tr>
                  `,
                    )
                    .join("")}
                </tbody>
              </table>
            `
        }

        <div class="lista-acciones">
          <button class="biblio-autor-editar" data-id="${this.autorId}">Editar</button>
          <button class="biblio-autor-borrar peligro" data-id="${this.autorId}">Borrar</button>
          <button class="biblio-autor-anadir-libro" data-id="${this.autorId}">Añadir libro</button>
          <button class="biblio-autor-eliminar-libro" data-id="${this.autorId}">Eliminar libro</button>
        </div>
      </div>
    `;
  }

  generarHTMLEdicion() {
    return `
      <div class="tarjeta">
        <h2>Editar autor</h2>
        <form id="formEditarAutor" data-id="${this.autorId}">
          <label>Nombre</label>
          <input type="text" name="nombre" value="${this.nombre}" required>

          <label>Nacionalidad</label>
          <input type="text" name="nacionalidad" value="${this.nacionalidad}" required>

          <label>Biografía</label>
          <textarea name="biografia" rows="5" required>${this.biografia}</textarea>

          <div class="acciones">
            <button type="submit">Actualizar</button>
          </div>
        </form>
      </div>
    `;
  }
}
