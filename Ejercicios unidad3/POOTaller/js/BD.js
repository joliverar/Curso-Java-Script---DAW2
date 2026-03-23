import { datos } from "./datos-taller.js";

export class BD {
  #vehiculos;
  #reparaciones;
  #siguienteVehiculoId;
  #siguienteReparacionId;

  constructor() {
    this.#vehiculos = datos.vehiculos;
    this.#reparaciones = datos.reparaciones;

    this.#siguienteVehiculoId = this.#vehiculos.length + 1;
    this.#siguienteReparacionId = this.#reparaciones.length + 1;
  }

  // GETTERS AUTOINCREMENTALES (PRO)
  get siguienteVehiculoId() {
    return this.#siguienteVehiculoId++;
  }

  get siguienteReparacionId() {
    return this.#siguienteReparacionId++;
  }

  obtenerVehiculos() {
    return this.#vehiculos;
  }

  obtenerVehiculo(filtro, valor) {
    return this.#vehiculos.find(
      (v) => v[filtro] == valor || v.propietario.telefono == valor,
    );
  }

  crearVehiculo(vehiculo) {
    this.#vehiculos.push(vehiculo);
  }

  borrarVehiculo(id) {
    this.#vehiculos = this.#vehiculos.filter((v) => v.vehiculoId != id);
  }

  obtenerReparaciones(filtro = null, valor = null) {
    if (!filtro) return this.#reparaciones;

    return this.#reparaciones.filter((r) => r[filtro] == valor);
  }

  obtenerReparacion(id) {
    return this.#reparaciones.find((r) => r.reparacionId == id);
  }

  crearReparacion(vehiculoId, reparacion) {
    this.#reparaciones.push(reparacion);
  }

  borrarReparacion(id) {
    this.#reparaciones = this.#reparaciones.filter((r) => r.reparacionId != id);
  }
}
