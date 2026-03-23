import { datosIniciales } from "./datos.js";
import { Libro } from "./Libro.js";
import { Autor } from "./Autor.js";
import { Biblioteca } from "./Biblioteca.js";

window.$biblio = (() => {
  let libros = [];
  let autores = [];
  let bibliotecas = [];

  let ultimoLibroId = 0;
  let ultimoAutorId = 0;
  let ultimaBibliotecaId = 0;

  const app = () => document.querySelector("#app");

  function cargarDatos() {
    autores = datosIniciales.autores.map(
      (a) =>
        new Autor(a.autorId, a.nombre, a.nacionalidad, a.biografia, a.libros),
    );

    bibliotecas = datosIniciales.bibliotecas.map(
      (b) => new Biblioteca(b.bibliotecaId, b.nombre, b.ubicacion),
    );

    libros = datosIniciales.libros.map(
      (l) =>
        new Libro(
          l.libroId,
          l.titulo,
          l.ISBN,
          l.autorId,
          l.bibliotecaId,
          l.prestamos,
        ),
    );

    ultimoLibroId = libros.length
      ? Math.max(...libros.map((l) => l.libroId))
      : 0;
    ultimoAutorId = autores.length
      ? Math.max(...autores.map((a) => a.autorId))
      : 0;
    ultimaBibliotecaId = bibliotecas.length
      ? Math.max(...bibliotecas.map((b) => b.bibliotecaId))
      : 0;
  }

  function setHTML(html) {
    app().innerHTML = html;
    mapearEventosInternos();
  }

  function mostrarMensaje(texto) {
    return `<div class="mensaje">${texto}</div>`;
  }

  function buscarLibro(libroId) {
    return libros.find((l) => l.libroId === Number(libroId));
  }

  function buscarAutor(autorId) {
    return autores.find((a) => a.autorId === Number(autorId));
  }

  function buscarBiblioteca(bibliotecaId) {
    return bibliotecas.find((b) => b.bibliotecaId === Number(bibliotecaId));
  }

  function crearLibro(libro) {
    ultimoLibroId++;
    libro.libroId = ultimoLibroId;
    libros.push(libro);

    const autor = buscarAutor(libro.autorId);
    if (autor && !autor.libros.includes(libro.titulo)) {
      autor.libros.push(libro.titulo);
    }
  }

  function crearAutor(autor) {
    ultimoAutorId++;
    autor.autorId = ultimoAutorId;
    autores.push(autor);
  }

  function crearBiblioteca(biblioteca) {
    ultimaBibliotecaId++;
    biblioteca.bibliotecaId = ultimaBibliotecaId;
    bibliotecas.push(biblioteca);
  }

  function borrarLibro(libroId) {
    const libro = buscarLibro(libroId);
    if (!libro) return;

    const autor = buscarAutor(libro.autorId);
    if (autor) {
      autor.libros = autor.libros.filter((t) => t !== libro.titulo);
    }

    libros = libros.filter((l) => l.libroId !== Number(libroId));
  }

  function borrarAutor(autorId) {
    libros = libros.filter((l) => l.autorId !== Number(autorId));
    autores = autores.filter((a) => a.autorId !== Number(autorId));
  }

  function borrarBiblioteca(bibliotecaId) {
    libros = libros.filter((l) => l.bibliotecaId !== Number(bibliotecaId));
    bibliotecas = bibliotecas.filter(
      (b) => b.bibliotecaId !== Number(bibliotecaId),
    );
  }

  function crearPrestamo(libro) {
    if (!libro.estaDisponible) return false;

    libro.prestamos.push({
      fechaPrestamo: new Date().toISOString().split("T")[0],
      fechaDevolucion: null,
    });

    return true;
  }

  function devolverPrestamo(libro) {
    if (libro.estaDisponible || libro.prestamos.length === 0) return false;

    const ultimo = libro.prestamos[libro.prestamos.length - 1];
    ultimo.fechaDevolucion = new Date().toISOString().split("T")[0];
    return true;
  }

  function buscarLibrosPorTitulo(texto) {
    const criterio = texto.trim().toLowerCase();
    return libros.filter((l) => l.titulo.toLowerCase().includes(criterio));
  }

  function buscarLibrosPorAutor(texto) {
    const criterio = texto.trim().toLowerCase();
    return autores.filter((a) => a.nombre.toLowerCase().includes(criterio));
  }

  function generarHTMLResultadoBuscador(tipo, texto) {
    if (tipo === "libro") {
      const resultados = buscarLibrosPorTitulo(texto);
      if (resultados.length === 0) {
        return `<div class="tarjeta"><h2>Resultados</h2><div class="vacio">No se encontraron libros.</div></div>`;
      }

      return `
        <div class="tarjeta">
          <h2>Resultados de libros</h2>
          <table class="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>ISBN</th>
                <th>Disponible</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${resultados
                .map(
                  (l) => `
                <tr>
                  <td>${l.libroId}</td>
                  <td>${l.titulo}</td>
                  <td>${l.ISBN}</td>
                  <td>${l.estaDisponible ? "Sí" : "No"}</td>
                  <td>
                    <div class="lista-acciones">
                      <button class="biblio-libro-ver" data-id="${l.libroId}">Ver</button>
                    </div>
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    const resultados = buscarLibrosPorAutor(texto);
    if (resultados.length === 0) {
      return `<div class="tarjeta"><h2>Resultados</h2><div class="vacio">No se encontraron autores.</div></div>`;
    }

    return `
      <div class="tarjeta">
        <h2>Resultados de autores</h2>
        <table class="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Nacionalidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${resultados
              .map(
                (a) => `
              <tr>
                <td>${a.autorId}</td>
                <td>${a.nombre}</td>
                <td>${a.nacionalidad}</td>
                <td>
                  <div class="lista-acciones">
                    <button class="biblio-autor-ver" data-id="${a.autorId}">Ver</button>
                  </div>
                </td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function generarHTMLListadoAutores() {
    return `
      <div class="tarjeta">
        <h2>Listado de autores</h2>
        <div class="acciones">
          <button id="btnNuevoAutor">Crear autor</button>
        </div>

        ${
          autores.length === 0
            ? `<div class="vacio">No hay autores registrados.</div>`
            : `
              <table class="tabla">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Nacionalidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${autores
                    .map(
                      (a) => `
                    <tr>
                      <td>${a.autorId}</td>
                      <td>${a.nombre}</td>
                      <td>${a.nacionalidad}</td>
                      <td>
                        <div class="lista-acciones">
                          <button class="biblio-autor-ver" data-id="${a.autorId}">Ver</button>
                          <button class="biblio-autor-editar" data-id="${a.autorId}">Editar</button>
                          <button class="biblio-autor-borrar peligro" data-id="${a.autorId}">Borrar</button>
                        </div>
                      </td>
                    </tr>
                  `,
                    )
                    .join("")}
                </tbody>
              </table>
            `
        }
      </div>
    `;
  }

  function generarHTMLListadoBibliotecas() {
    return `
      <div class="tarjeta">
        <h2>Listado de bibliotecas</h2>
        <div class="acciones">
          <button id="btnNuevaBiblioteca">Crear biblioteca</button>
        </div>

        ${
          bibliotecas.length === 0
            ? `<div class="vacio">No hay bibliotecas registradas.</div>`
            : `
              <table class="tabla">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Ubicación</th>
                    <th>Nº Libros</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${bibliotecas
                    .map(
                      (b) => `
                    <tr>
                      <td>${b.bibliotecaId}</td>
                      <td>${b.nombre}</td>
                      <td>${b.ubicacion}</td>
                      <td>${libros.filter((l) => l.bibliotecaId === b.bibliotecaId).length}</td>
                      <td>
                        <div class="lista-acciones">
                          <button class="biblio-biblioteca-ver" data-id="${b.bibliotecaId}">Ver</button>
                          <button class="biblio-biblioteca-editar" data-id="${b.bibliotecaId}">Editar</button>
                          <button class="biblio-biblioteca-borrar peligro" data-id="${b.bibliotecaId}">Borrar</button>
                        </div>
                      </td>
                    </tr>
                  `,
                    )
                    .join("")}
                </tbody>
              </table>
            `
        }
      </div>
    `;
  }

  function generarHTMLListadoLibros() {
    return `
      <div class="tarjeta">
        <h2>Listado de libros</h2>
        <div class="acciones">
          <button id="btnNuevoLibro">Crear libro</button>
        </div>

        ${
          libros.length === 0
            ? `<div class="vacio">No hay libros registrados.</div>`
            : `
              <table class="tabla">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>ISBN</th>
                    <th>Disponible</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${libros
                    .map(
                      (l) => `
                    <tr>
                      <td>${l.libroId}</td>
                      <td>${l.titulo}</td>
                      <td>${l.ISBN}</td>
                      <td>${l.estaDisponible ? "Sí" : "No"}</td>
                      <td>
                        <div class="lista-acciones">
                          <button class="biblio-libro-ver" data-id="${l.libroId}">Ver</button>
                          <button class="biblio-libro-editar" data-id="${l.libroId}">Editar</button>
                          <button class="biblio-libro-borrar peligro" data-id="${l.libroId}">Borrar</button>
                        </div>
                      </td>
                    </tr>
                  `,
                    )
                    .join("")}
                </tbody>
              </table>
            `
        }
      </div>
    `;
  }

  function vistaDetalleLibro(id, mensaje = "") {
    const libro = buscarLibro(id);
    if (!libro) return;

    const autor = buscarAutor(libro.autorId);
    const biblioteca = buscarBiblioteca(libro.bibliotecaId);

    setHTML(`
      ${mensaje ? mostrarMensaje(mensaje) : ""}
      ${libro.generarHTMLPropiedades(autor, biblioteca)}
    `);
  }

  function vistaDetalleAutor(id, mensaje = "") {
    const autor = buscarAutor(id);
    if (!autor) return;

    setHTML(`
      ${mensaje ? mostrarMensaje(mensaje) : ""}
      ${autor.generarHTMLPropiedades()}
    `);
  }

  function vistaDetalleBiblioteca(id) {
    const biblioteca = buscarBiblioteca(id);
    if (!biblioteca) return;

    const librosAsignados = libros.filter(
      (l) => l.bibliotecaId === biblioteca.bibliotecaId,
    );

    setHTML(`
      <div class="tarjeta">
        <h2>Detalle de biblioteca</h2>
        <p><strong>ID:</strong> ${biblioteca.bibliotecaId}</p>
        <p><strong>Nombre:</strong> ${biblioteca.nombre}</p>
        <p><strong>Ubicación:</strong> ${biblioteca.ubicacion}</p>

        <h3>Libros asignados</h3>
        ${
          librosAsignados.length === 0
            ? `<div class="vacio">No tiene libros asignados.</div>`
            : `
              <table class="tabla">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>ISBN</th>
                  </tr>
                </thead>
                <tbody>
                  ${librosAsignados
                    .map(
                      (l) => `
                    <tr>
                      <td>${l.libroId}</td>
                      <td>${l.titulo}</td>
                      <td>${l.ISBN}</td>
                    </tr>
                  `,
                    )
                    .join("")}
                </tbody>
              </table>
            `
        }

        <div class="lista-acciones">
          <button class="biblio-biblioteca-editar" data-id="${biblioteca.bibliotecaId}">Editar</button>
          <button class="biblio-biblioteca-borrar peligro" data-id="${biblioteca.bibliotecaId}">Borrar</button>
        </div>
      </div>
    `);
  }

  function mapearEventosMenu() {
    document.querySelector("#btnAutores").addEventListener("click", () => {
      setHTML(generarHTMLListadoAutores());
    });

    document.querySelector("#btnLibros").addEventListener("click", () => {
      setHTML(generarHTMLListadoLibros());
    });

    document.querySelector("#btnBibliotecas").addEventListener("click", () => {
      setHTML(generarHTMLListadoBibliotecas());
    });

    document.querySelector("#btnBuscar").addEventListener("click", () => {
      const tipo = document.querySelector("#tipoBusqueda").value;
      const texto = document.querySelector("#textoBusqueda").value;
      setHTML(generarHTMLResultadoBuscador(tipo, texto));
    });
  }

  function mapearEventosInternos() {
    const btnNuevoAutor = document.querySelector("#btnNuevoAutor");
    if (btnNuevoAutor) {
      btnNuevoAutor.addEventListener("click", () => {
        const autor = new Autor(null, "", "", "", []);
        setHTML(autor.generarHTMLCreacion());
      });
    }

    const btnNuevoLibro = document.querySelector("#btnNuevoLibro");
    if (btnNuevoLibro) {
      btnNuevoLibro.addEventListener("click", () => {
        const libro = new Libro(null, "", "", "", "", []);
        setHTML(libro.generarHTMLCreacion(autores, bibliotecas));
      });
    }

    const btnNuevaBiblioteca = document.querySelector("#btnNuevaBiblioteca");
    if (btnNuevaBiblioteca) {
      btnNuevaBiblioteca.addEventListener("click", () => {
        const biblioteca = new Biblioteca(null, "", "");
        setHTML(biblioteca.generarHTMLCreacion());
      });
    }

    document.querySelectorAll(".biblio-libro-ver").forEach((btn) => {
      btn.addEventListener("click", () => vistaDetalleLibro(btn.dataset.id));
    });

    document.querySelectorAll(".biblio-autor-ver").forEach((btn) => {
      btn.addEventListener("click", () => vistaDetalleAutor(btn.dataset.id));
    });

    document.querySelectorAll(".biblio-biblioteca-ver").forEach((btn) => {
      btn.addEventListener("click", () =>
        vistaDetalleBiblioteca(btn.dataset.id),
      );
    });

    document.querySelectorAll(".biblio-libro-editar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const libro = buscarLibro(btn.dataset.id);
        setHTML(libro.generarHTMLEdicion(autores, bibliotecas));
      });
    });

    document.querySelectorAll(".biblio-autor-editar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const autor = buscarAutor(btn.dataset.id);
        setHTML(autor.generarHTMLEdicion());
      });
    });

    document.querySelectorAll(".biblio-biblioteca-editar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const biblioteca = buscarBiblioteca(btn.dataset.id);
        setHTML(biblioteca.generarHTMLEdicion());
      });
    });

    document.querySelectorAll(".biblio-libro-borrar").forEach((btn) => {
      btn.addEventListener("click", () => {
        borrarLibro(btn.dataset.id);
        setHTML(generarHTMLListadoLibros());
      });
    });

    document.querySelectorAll(".biblio-autor-borrar").forEach((btn) => {
      btn.addEventListener("click", () => {
        borrarAutor(btn.dataset.id);
        setHTML(generarHTMLListadoAutores());
      });
    });

    document.querySelectorAll(".biblio-biblioteca-borrar").forEach((btn) => {
      btn.addEventListener("click", () => {
        borrarBiblioteca(btn.dataset.id);
        setHTML(generarHTMLListadoBibliotecas());
      });
    });

    document.querySelectorAll(".biblio-libro-prestar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const libro = buscarLibro(btn.dataset.id);
        const ok = crearPrestamo(libro);
        vistaDetalleLibro(
          btn.dataset.id,
          ok
            ? "Préstamo registrado correctamente."
            : "El libro no está disponible.",
        );
      });
    });

    document.querySelectorAll(".biblio-libro-devolver").forEach((btn) => {
      btn.addEventListener("click", () => {
        const libro = buscarLibro(btn.dataset.id);
        const ok = devolverPrestamo(libro);
        vistaDetalleLibro(
          btn.dataset.id,
          ok
            ? "Devolución registrada correctamente."
            : "El libro ya estaba disponible.",
        );
      });
    });

    document
      .querySelectorAll(".biblio-libro-listar-prestamos")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          const libro = buscarLibro(btn.dataset.id);
          setHTML(libro.generarHTMLListadoPrestamos());
        });
      });

    document.querySelectorAll(".biblio-autor-anadir-libro").forEach((btn) => {
      btn.addEventListener("click", () => {
        const autor = buscarAutor(btn.dataset.id);
        const titulo = prompt("Introduce el título del libro a añadir:");
        if (titulo && titulo.trim()) {
          autor.libros.push(titulo.trim());
          vistaDetalleAutor(btn.dataset.id, "Libro añadido al autor.");
        }
      });
    });

    document.querySelectorAll(".biblio-autor-eliminar-libro").forEach((btn) => {
      btn.addEventListener("click", () => {
        const autor = buscarAutor(btn.dataset.id);
        const titulo = prompt(
          "Introduce exactamente el título del libro a eliminar:",
        );
        if (titulo && titulo.trim()) {
          autor.libros = autor.libros.filter((t) => t !== titulo.trim());
          vistaDetalleAutor(btn.dataset.id, "Libro eliminado del autor.");
        }
      });
    });

    const formCrearAutor = document.querySelector("#formCrearAutor");
    if (formCrearAutor) {
      formCrearAutor.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(formCrearAutor);
        const autor = new Autor(
          null,
          fd.get("nombre").trim(),
          fd.get("nacionalidad").trim(),
          fd.get("biografia").trim(),
          [],
        );
        crearAutor(autor);
        setHTML(generarHTMLListadoAutores());
      });
    }

    const formCrearLibro = document.querySelector("#formCrearLibro");
    if (formCrearLibro) {
      formCrearLibro.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(formCrearLibro);
        const libro = new Libro(
          null,
          fd.get("titulo").trim(),
          fd.get("isbn").trim(),
          Number(fd.get("autorId")),
          Number(fd.get("bibliotecaId")),
          [],
        );
        crearLibro(libro);
        setHTML(generarHTMLListadoLibros());
      });
    }

    const formCrearBiblioteca = document.querySelector("#formCrearBiblioteca");
    if (formCrearBiblioteca) {
      formCrearBiblioteca.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(formCrearBiblioteca);
        const biblioteca = new Biblioteca(
          null,
          fd.get("nombre").trim(),
          fd.get("ubicacion").trim(),
        );
        crearBiblioteca(biblioteca);
        setHTML(generarHTMLListadoBibliotecas());
      });
    }

    const formEditarAutor = document.querySelector("#formEditarAutor");
    if (formEditarAutor) {
      formEditarAutor.addEventListener("submit", (e) => {
        e.preventDefault();
        const autor = buscarAutor(formEditarAutor.dataset.id);
        const fd = new FormData(formEditarAutor);
        autor.nombre = fd.get("nombre").trim();
        autor.nacionalidad = fd.get("nacionalidad").trim();
        autor.biografia = fd.get("biografia").trim();
        vistaDetalleAutor(autor.autorId, "Autor actualizado.");
      });
    }

    const formEditarLibro = document.querySelector("#formEditarLibro");
    if (formEditarLibro) {
      formEditarLibro.addEventListener("submit", (e) => {
        e.preventDefault();
        const libro = buscarLibro(formEditarLibro.dataset.id);
        const autorAnterior = buscarAutor(libro.autorId);

        const fd = new FormData(formEditarLibro);
        libro.titulo = fd.get("titulo").trim();
        libro.ISBN = fd.get("isbn").trim();
        libro.autorId = Number(fd.get("autorId"));
        libro.bibliotecaId = Number(fd.get("bibliotecaId"));

        if (autorAnterior) {
          autorAnterior.libros = autorAnterior.libros.filter(
            (t) => t !== libro.titulo,
          );
        }

        const autorNuevo = buscarAutor(libro.autorId);
        if (autorNuevo && !autorNuevo.libros.includes(libro.titulo)) {
          autorNuevo.libros.push(libro.titulo);
        }

        vistaDetalleLibro(libro.libroId, "Libro actualizado.");
      });
    }

    const formEditarBiblioteca = document.querySelector(
      "#formEditarBiblioteca",
    );
    if (formEditarBiblioteca) {
      formEditarBiblioteca.addEventListener("submit", (e) => {
        e.preventDefault();
        const biblioteca = buscarBiblioteca(formEditarBiblioteca.dataset.id);
        const fd = new FormData(formEditarBiblioteca);
        biblioteca.nombre = fd.get("nombre").trim();
        biblioteca.ubicacion = fd.get("ubicacion").trim();
        vistaDetalleBiblioteca(biblioteca.bibliotecaId);
      });
    }
  }

  function init() {
    cargarDatos();
    mapearEventosMenu();
    setHTML(generarHTMLListadoLibros());
  }

  return {
    init,
    generarHTMLListadoAutores,
    generarHTMLListadoBibliotecas,
    generarHTMLListadoLibros,
    buscarLibrosPorTitulo,
    buscarLibrosPorAutor,
    generarHTMLResultadoBuscador,
    buscarLibro,
    buscarAutor,
    buscarBiblioteca,
    crearLibro,
    crearAutor,
    crearBiblioteca,
    borrarLibro,
    borrarAutor,
    borrarBiblioteca,
    devolverPrestamo,
    crearPrestamo,
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  window.$biblio.init();
});
