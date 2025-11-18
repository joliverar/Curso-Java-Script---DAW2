import datos from "./datos-taller.js";

export class BD {

    #vehiculos = [];
    #reparaciones = [];

    #siguienteVehiculoId = 1;
    #siguienteReparacionId = 1;

    constructor() {
        this.#vehiculos = datos.vehiculos;
        this.#reparaciones = datos.reparaciones;

        // Ajustar IDs autoincrementales:
        if (datos.vehiculos.length > 0) {
            this.#siguienteVehiculoId =
                Math.max(...datos.vehiculos.map(v => v.vehiculoId)) + 1;
        }

        if (datos.reparaciones.length > 0) {
            this.#siguienteReparacionId =
                Math.max(...datos.reparaciones.map(r => r.reparacionId)) + 1;
        }
    }


    // OBTENER VEHÍCULOS
 

    obtenerVehiculos() {
        return this.#vehiculos;
    }

    obtenerVehiculo(filtro, valor) {
        if (!valor && valor !== 0) return [];

        valor = valor.toString().toLowerCase();

        // Buscar por matrícula
        if (filtro === "matricula") {
            return this.#vehiculos.filter(v =>
                v.matricula.toLowerCase().includes(valor)
            );
        }

        // Buscar por teléfono
        if (filtro === "telefono") {
            return this.#vehiculos.filter(v =>
                v.propietario.telefono.toLowerCase().includes(valor)
            );
        }

        // Buscar por ID
        if (filtro === "vehiculoId") {
            return this.#vehiculos.filter(v =>
                v.vehiculoId === Number(valor)
            );
        }

        return [];
    }

    
    // CRUD VEHÍCULOS
   

    crearVehiculo(vehiculo) {
        vehiculo.vehiculoId = this.#siguienteVehiculoId++;
        this.#vehiculos.push(vehiculo);
    }

    borrarVehiculo(id) {
        this.#vehiculos = this.#vehiculos.filter(v => v.vehiculoId !== id);
    }
}
