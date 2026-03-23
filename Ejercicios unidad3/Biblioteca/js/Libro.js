export class Libro {
  constructor(libroId, titulo, ISBN, autorId, bibliotecaId, prestamos = []) {
    this.libroId = libroId;
    this.titulo = titulo;
    this.ISBN = ISBN;
    this.autorId = autorId;
    this.bibliotecaId = bibliotecaId;
    this.prestamos = prestamos;
  }

  get estaDisponible() {
    if (this.prestamos.length === 0) return true;
    const ultimo = this.prestamos[this.prestamos.length - 1];
    return ultimo.fechaDevolucion !== null;
  }

  generarHTMLCreacion(autores, bibliotecas) {
    return `
      <div class="tarjeta">
        <h2>Crear libro</h2>
        <form id="formCrearLibro">
          <label>Título</label>
          <input type="text" name="titulo" required>

          <label>ISBN</label>
          <input type="text" name="isbn" required>

          <label>Autor</label>
          <select name="autorId" required>
            <option value="">Selecciona un autor</option>
            ${autores.map((a) => `<option value="${a.autorId}">${a.nombre}</option>`).join("")}
          </select>

          <label>Biblioteca</label>
          <select name="bibliotecaId" required>
            <option value="">Selecciona una biblioteca</option>
            ${bibliotecas.map((b) => `<option value="${b.bibliotecaId}">${b.nombre}</option>`).join("")}
          </select>

          <div class="acciones">
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    `;
  }

  generarHTMLPropiedades(autor, biblioteca) {
    return `
      <div class="tarjeta">
        <h2>Detalle del libro</h2>
        <p><strong>ID:</strong> ${this.libroId}</p>
        <p><strong>Título:</strong> ${this.titulo}</p>
        <p><strong>ISBN:</strong> ${this.ISBN}</p>
        <p><strong>Autor:</strong> ${autor ? autor.nombre : "No encontrado"}</p>
        <p><strong>Biblioteca:</strong> ${biblioteca ? biblioteca.nombre : "No encontrada"}</p>
        <p><strong>Disponible:</strong> ${this.estaDisponible ? "Sí" : "No"}</p>

        <div class="lista-acciones">
          <button class="biblio-libro-editar" data-id="${this.libroId}">Editar</button>
          <button class="biblio-libro-borrar peligro" data-id="${this.libroId}">Borrar</button>
          <button class="biblio-libro-prestar" data-id="${this.libroId}">Crear préstamo</button>
          <button class="biblio-libro-devolver" data-id="${this.libroId}">Devolver préstamo</button>
          <button class="biblio-libro-listar-prestamos" data-id="${this.libroId}">Ver préstamos</button>
        </div>
      </div>
    `;
  }

  generarHTMLEdicion(autores, bibliotecas) {
    return `
      <div class="tarjeta">
        <h2>Editar libro</h2>
        <form id="formEditarLibro" data-id="${this.libroId}">
          <label>Título</label>
          <input type="text" name="titulo" value="${this.titulo}" required>

          <label>ISBN</label>
          <input type="text" name="isbn" value="${this.ISBN}" required>

          <label>Autor</label>
          <select name="autorId" required>
            ${autores
              .map(
                (a) => `
              <option value="${a.autorId}" ${a.autorId === this.autorId ? "selected" : ""}>
                ${a.nombre}
              </option>
            `,
              )
              .join("")}
          </select>

          <label>Biblioteca</label>
          <select name="bibliotecaId" required>
            ${bibliotecas
              .map(
                (b) => `
              <option value="${b.bibliotecaId}" ${b.bibliotecaId === this.bibliotecaId ? "selected" : ""}>
                ${b.nombre}
              </option>
            `,
              )
              .join("")}
          </select>

          <div class="acciones">
            <button type="submit">Actualizar</button>
          </div>
        </form>
      </div>
    `;
  }

  generarHTMLListadoPrestamos() {
    if (this.prestamos.length === 0) {
      return `
        <div class="tarjeta">
          <h2>Préstamos de "${this.titulo}"</h2>
          <div class="vacio">No hay préstamos registrados.</div>
        </div>
      `;
    }

    return `
      <div class="tarjeta">
        <h2>Préstamos de "${this.titulo}"</h2>
        <table class="tabla">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha préstamo</th>
              <th>Fecha devolución</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            ${this.prestamos
              .map(
                (p, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${p.fechaPrestamo}</td>
                <td>${p.fechaDevolucion ?? "Pendiente"}</td>
                <td>${p.fechaDevolucion ? "Devuelto" : "Prestado"}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }
}
