import { BD } from "./BD.js";
import { Vehiculo } from "./Vehiculo.js";
import { Propietario } from "./Propietario.js";
import { Reparacion } from "./Reparacion.js";
import { Trabajo } from "./Trabajo.js";

export class GestionMecanica {
  #clienteBD;
  #contenedor;

  constructor() {
    this.#clienteBD = new BD();
  }

  iniciarApp(selector) {
    this.#contenedor = document.querySelector(selector);

    if (!this.#contenedor) {
      alert("No se pudo iniciar la app");
      return;
    }

    this.#contenedor.innerHTML = this.#generaHTMLBase();
    this.#mapearEventosMenu();
    this.#mostrarInicio();
  }

  #generaHTMLBase() {
    return `
      <nav>
        <button id="inicio">Inicio</button>
        <button id="vehiculos">Vehículos</button>
        <button id="noTerminadas">No terminadas</button>
        <button id="noPagadas">No pagadas</button>
      </nav>
      <div id="contenido"></div>
    `;
  }

  #getContenido() {
    return this.#contenedor.querySelector("#contenido");
  }

  #mostrarInicio() {
    this.#getContenido().innerHTML = `
      <h2>Buscador</h2>
      <input id="busqueda" placeholder="Matrícula o teléfono">
      <button id="btnBuscar">Buscar</button>
      <div id="resultados"></div>
    `;

    document.querySelector("#btnBuscar").addEventListener("click", () => {
      const texto = document.querySelector("#busqueda").value;
      const vehiculos = this.#clienteBD
        .obtenerVehiculos()
        .filter(
          (v) =>
            v.matricula.includes(texto) ||
            v.propietario.telefono.includes(texto),
        );

      this.#mostrarVehiculos(vehiculos);
    });
  }

  #mostrarVehiculos(lista) {
    this.#getContenido().innerHTML = `
      <h2>Vehículos</h2>
      <button id="nuevoVehiculo">Nuevo</button>
      <ul>
        ${lista
          .map(
            (v) => `
          <li>
            ${v.matricula} - ${v.propietario.nombre}
            <button class="ver" data-id="${v.vehiculoId}">Ver</button>
            <button class="borrar" data-id="${v.vehiculoId}">Borrar</button>
          </li>
        `,
          )
          .join("")}
      </ul>
    `;

    document.querySelectorAll(".ver").forEach((btn) => {
      btn.addEventListener("click", () => this.#verVehiculo(btn.dataset.id));
    });

    document.querySelectorAll(".borrar").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.#clienteBD.borrarVehiculo(btn.dataset.id);
        this.#mostrarVehiculos(this.#clienteBD.obtenerVehiculos());
      });
    });
  }

  #verVehiculo(id) {
    const v = this.#clienteBD.obtenerVehiculo("vehiculoId", id);

    this.#getContenido().innerHTML = `
      <h2>${v.matricula}</h2>
      <p>${v.marca} - ${v.modelo}</p>
      <p>${v.propietario.nombre} (${v.propietario.telefono})</p>
      <button id="verReparaciones">Reparaciones</button>
    `;

    document.querySelector("#verReparaciones").addEventListener("click", () => {
      this.#verReparacionesVehiculo(id);
    });
  }

  #verReparacionesVehiculo(id) {
    const reparaciones = this.#clienteBD
      .obtenerReparaciones()
      .filter((r) => r.vehiculoId == id);

    this.#getContenido().innerHTML = `
      <h2>Reparaciones</h2>
      <button id="nuevaRep">Nueva reparación</button>
      <ul>
        ${reparaciones
          .map(
            (r) => `
          <li>
            ${r.fecha}
            <button class="verRep" data-id="${r.reparacionId}">Ver</button>
          </li>
        `,
          )
          .join("")}
      </ul>
    `;
  }

  #mapearEventosMenu() {
    this.#contenedor
      .querySelector("#inicio")
      .addEventListener("click", () => this.#mostrarInicio());

    this.#contenedor
      .querySelector("#vehiculos")
      .addEventListener("click", () => {
        this.#mostrarVehiculos(this.#clienteBD.obtenerVehiculos());
      });

    this.#contenedor
      .querySelector("#noTerminadas")
      .addEventListener("click", () => {
        const lista = this.#clienteBD.obtenerReparaciones("terminado", false);
        this.#mostrarReparaciones(lista);
      });

    this.#contenedor
      .querySelector("#noPagadas")
      .addEventListener("click", () => {
        const lista = this.#clienteBD.obtenerReparaciones("pagado", false);
        this.#mostrarReparaciones(lista);
      });
  }

  #mostrarReparaciones(lista) {
    this.#getContenido().innerHTML = `
      <h2>Reparaciones</h2>
      <ul>
        ${lista
          .map(
            (r) => `
          <li>${r.fecha}</li>
        `,
          )
          .join("")}
      </ul>
    `;
  }
}
