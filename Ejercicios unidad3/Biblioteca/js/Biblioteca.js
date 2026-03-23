export class Biblioteca {
  constructor(bibliotecaId, nombre, ubicacion) {
    this.bibliotecaId = bibliotecaId;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
  }

  generarHTMLCreacion() {
    return `
      <div class="tarjeta">
        <h2>Crear biblioteca</h2>
        <form id="formCrearBiblioteca">
          <label>Nombre</label>
          <input type="text" name="nombre" required>

          <label>Ubicación</label>
          <input type="text" name="ubicacion" required>

          <div class="acciones">
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    `;
  }

  generarHTMLEdicion() {
    return `
      <div class="tarjeta">
        <h2>Editar biblioteca</h2>
        <form id="formEditarBiblioteca" data-id="${this.bibliotecaId}">
          <label>Nombre</label>
          <input type="text" name="nombre" value="${this.nombre}" required>

          <label>Ubicación</label>
          <input type="text" name="ubicacion" value="${this.ubicacion}" required>

          <div class="acciones">
            <button type="submit">Actualizar</button>
          </div>
        </form>
      </div>
    `;
  }
}
