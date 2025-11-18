import datos from "./datos-taller.js";
import { Vehiculo } from "./Vehiculo.js";
import { Reparacion } from "./Reparacion.js";
import { Trabajo } from "./Trabajo.js";

export class BD {
    #vehiculos = [];
    #reparaciones = [];
    #siguienteVehiculoId = 1;
    #siguienteReparacionId = 1;
    #siguienteTrabajoId = 1;

    constructor() {
        // cargar datos iniciales
        this.#vehiculos = datos.vehiculos.map(v => new Vehiculo(v));
        this.#reparaciones = datos.reparaciones.map(r => new Reparacion(r));

        this.#siguienteVehiculoId += this.#vehiculos.length;
        this.#siguienteReparacionId += this.#reparaciones.length;

        // trabajos
        datos.reparaciones.forEach(r => {
            r.trabajos.forEach(t => {
                this.#siguienteTrabajoId++;
            });
        });
    }

    //------------------------
    // VEHÍCULOS
    //------------------------
    obtenerVehiculos() {
        return this.#vehiculos;
    }

    obtenerVehiculo(filtro, valor) {
        if (!valor) return [];

        valor = valor.toLowerCase();

        if (filtro === "matricula")
            return this.#vehiculos.filter(v => v.matricula.toLowerCase().includes(valor));

        if (filtro === "telefono")
            return this.#vehiculos.filter(v => v.propietario.telefono.toLowerCase().includes(valor));

        if (filtro === "vehiculoId")
            return this.#vehiculos.filter(v => v.vehiculoId === Number(valor));

        return [];
    }

    crearVehiculo(v) {
        this.#vehiculos.push(new Vehiculo(v));
        this.#siguienteVehiculoId++;
    }

    borrarVehiculo(id) {
        this.#vehiculos = this.#vehiculos.filter(v => v.vehiculoId !== id);
    }

    get siguienteVehiculoId() {
        return this.#siguienteVehiculoId;
    }

    //------------------------
    // REPARACIONES
    //------------------------
    obtenerReparacionesPorVehiculo(id) {
        return this.#reparaciones.filter(r => r.vehiculoId === Number(id));
    }

    obtenerReparacion(id) {
        return this.#reparaciones.find(r => r.reparacionId === Number(id));
    }

    crearReparacion(r) {
        this.#reparaciones.push(new Reparacion(r));
        this.#siguienteReparacionId++;
    }

    borrarReparacion(id) {
        this.#reparaciones = this.#reparaciones.filter(r => r.reparacionId !== Number(id));
    }

    get siguienteReparacionId() {
        return this.#siguienteReparacionId;
    }

    //------------------------
    // TRABAJOS
    //------------------------
    crearTrabajo(reparacionId, t) {
        const rep = this.obtenerReparacion(reparacionId);
        t.trabajoId = this.#siguienteTrabajoId++;
        rep.trabajos.push(new Trabajo(t));
    }

    borrarTrabajo(reparacionId, trabajoId) {
        const rep = this.obtenerReparacion(reparacionId);
        rep.trabajos = rep.trabajos.filter(t => t.trabajoId !== Number(trabajoId));
    }
}
