import datos from "./datos-taller.js";

export class BD {

   #vehiculos = [];
    #reparaciones = [];

    #siguienteVehiculoId = 1;
    #siguienteReparacionId = 1;

    constructor() {

        // 1. Intentar cargar de localStorage
        const datosLS = localStorage.getItem("bd-taller");

        if (datosLS) {
            console.log("Cargando datos desde localStorage...");
            const bd = JSON.parse(datosLS);

            this.#vehiculos = bd.vehiculos;
            this.#reparaciones = bd.reparaciones;
            this.#siguienteVehiculoId = bd.siguienteVehiculoId;
            this.#siguienteReparacionId = bd.siguienteReparacionId;
            return;
        }

        // 2. Si no existe localStorage → cargar datos iniciales
        console.log("Cargando datos iniciales (datos-taller.js)...");
        this.#vehiculos = datos.vehiculos;
        this.#reparaciones = datos.reparaciones;

        if (this.#vehiculos.length > 0) {
            this.#siguienteVehiculoId =
                Math.max(...this.#vehiculos.map(v => v.vehiculoId)) + 1;
        }

        if (this.#reparaciones.length > 0) {
            this.#siguienteReparacionId =
                Math.max(...this.#reparaciones.map(r => r.reparacionId)) + 1;
        }

        // Asignar IDs a trabajos de cada reparación
        this.#reparaciones.forEach(rep => {

            let id = 1;

            rep.trabajos.forEach(trabajo => {
                trabajo.trabajoId = id;
                id++;
            });

        });

        // Guardar por primera vez
        this.#guardar();
    }

    // ==========================
    // MÉTODO PRIVADO PARA GUARDAR
    // ==========================
    #guardar() {
        const bd = {
            vehiculos: this.#vehiculos,
            reparaciones: this.#reparaciones,
            siguienteVehiculoId: this.#siguienteVehiculoId,
            siguienteReparacionId: this.#siguienteReparacionId
        };

        localStorage.setItem("bd-taller", JSON.stringify(bd));
        console.log("Base de datos guardada en localStorage");
    }

    get siguienteVehiculoId() {
        return this.#siguienteVehiculoId;
    }

    obtenerVehiculos() {
        return this.#vehiculos;
    }

    obtenerVehiculo(filtro, valor) {
        if (valor === null || valor === undefined || valor === "") {
            return [];
        }

        valor = valor.toString().toLowerCase();

        if (filtro === "vehiculoId") {
            return this.#vehiculos.filter(v => v.vehiculoId === Number(valor));
        }

        if (filtro === "matricula") {
            return this.#vehiculos.filter(v => v.matricula.toLowerCase().includes(valor));
        }

        if (filtro === "telefono") {
            return this.#vehiculos.filter(v => v.propietario.telefono.toLowerCase().includes(valor));
        }

        return [];
    }

    crearVehiculo(v) {
        v.vehiculoId = this.#siguienteVehiculoId++;
        this.#vehiculos.push(v);
        this.#guardar();
    }

    borrarVehiculo(id) {
        this.#vehiculos = this.#vehiculos.filter(v => v.vehiculoId !== id);

        //borrar tambien reparaciones de ese vehiculo
        this.#reparaciones = this.#reparaciones.filter(r => r.vehiculoId !== id);
    }
    // ============================
    // REPARACIONES — FASE 2.2
    // ============================

    get siguienteReparacionId() {
        return this.#siguienteReparacionId;
    }
    obtenerReparacionPorVehiculo(vehiculoId) {
        return this.#reparaciones.filter(r => r.vehiculoId === Number(vehiculoId));
    }

    obtenerReparacion(id) {
        return this.#reparaciones.find(r => r.reparacionId === Number(id))
    }
    
    crearReparacion(rep) {
        rep.reparacionId = this.#siguienteReparacionId++;
        rep.trabajos = rep.trabajos ?? [];
        this.#reparaciones.push(rep);
    }

    borrarReparaciones(id) {
        this.#reparaciones = this.#reparaciones.filter(r => r.reparacionId !== Number(id));
    }

    // ============================
    // TRABAJOS
    // ============================

    crearTrabajo(reparacionId, trabajo) {
        const rep = this.obtenerReparacion(reparacionId);
        if (!rep) return;
        if (!rep.trabajos) rep.trabajos = [];
        const nuevoId = rep.trabajos.length > 0
            ? rep.trabajos[rep.trabajos.length - 1].trabajoId + 1
            : 1;
        trabajo.trabajoId = nuevoId;
        rep.trabajos.push(trabajo);

    }

    borrarTrabajo(reparacionId, trabajoId) {
        const rep = this.obtenerReparacion(reparacionId);
        if (!rep) return;

        rep.trabajos = rep.trabajos.filter(r => r.trabajoId !== Number(trabajoId));

    }
    obtenerReparacionesPorFiltro(filtro, valor) {

        return this.#reparaciones.filter(r => {

            if (r[filtro] === undefined) return false;

            if (typeof r[filtro] === "boolean") {
                return r[filtro] === Boolean(valor);
            }

            return r[filtro] == valor;
        });
    }
    filtrarReparacionesAvanzado(filtros = {}) {
    return this.#reparaciones.filter(rep => {

        // FILTRO TERMINADO
        if (filtros.terminado !== undefined &&
            rep.terminado !== filtros.terminado) return false;

        // FILTRO PAGADO
        if (filtros.pagado !== undefined &&
            rep.pagado !== filtros.pagado) return false;

        // FILTRO PRESUPUESTO
        if (filtros.presupuesto !== undefined &&
            rep.presupuesto !== filtros.presupuesto) return false;

        // FILTRO APROBADA
        if (filtros.aprobada !== undefined &&
            rep.aprobada !== filtros.aprobada) return false;

        return true;
    });
}
ordenarReparaciones(lista, criterio) {

    if (criterio === "fecha-desc") {
        return lista.sort((a,b) => new Date(b.fecha) - new Date(a.fecha));
    }

    if (criterio === "fecha-asc") {
        return lista.sort((a,b) => new Date(a.fecha) - new Date(b.fecha));
    }

    if (criterio === "total-desc") {
        return lista.sort((a,b) => 
            (b.trabajos?.reduce((t,x)=>t+x.totalTrabajo,0) ?? 0) -
            (a.trabajos?.reduce((t,x)=>t+x.totalTrabajo,0) ?? 0)
        );
    }

    if (criterio === "total-asc") {
        return lista.sort((a,b) => 
            (a.trabajos?.reduce((t,x)=>t+x.totalTrabajo,0) ?? 0) -
            (b.trabajos?.reduce((t,x)=>t+x.totalTrabajo,0) ?? 0)
        );
    }

    return lista;
}
obtenerReparacionesPorMes() {
    const agrupado = {};

    this.#reparaciones.forEach(r => {
        const mes = r.fecha.substring(0,7); // yyyy-mm

        if (!agrupado[mes]) agrupado[mes] = {
            totalReparaciones: 0,
            totalDinero: 0
        };

        const total = r.trabajos?.reduce((t,x)=>t+x.totalTrabajo,0) ?? 0;

        agrupado[mes].totalReparaciones++;
        agrupado[mes].totalDinero += total;
    });

    return agrupado;
}
obtenerEstadoReparaciones() {
    let terminadas = 0;
    let noTerminadas = 0;

    this.#reparaciones.forEach(r => {
        if (r.terminado) terminadas++;
        else noTerminadas++;
    });

    return { terminadas, noTerminadas };
}

rankingClientes() {

    const mapa = {};

    this.#reparaciones.forEach(r => {
        const vehiculo = this.#vehiculos.find(v => v.vehiculoId === r.vehiculoId);

        if (!vehiculo) return;

        const nombre = vehiculo.propietario.nombre;

        const total = r.trabajos?.reduce((t,x)=>t+x.totalTrabajo,0) ?? 0;

        mapa[nombre] = (mapa[nombre] ?? 0) + total;
    });

    // Convertir a lista ordenada
    return Object.entries(mapa)
        .map(([cliente,total]) => ({cliente,total}))
        .sort((a,b)=>b.total - a.total);
}
rankingVehiculos() {

    const mapa = {};

    this.#reparaciones.forEach(r => {

        mapa[r.vehiculoId] = (mapa[r.vehiculoId] ?? 0) + 1;
    });

    return Object.entries(mapa)
        .map(([id, cantidad]) => {
            const veh = this.#vehiculos.find(v => v.vehiculoId === Number(id));
            return {
                vehiculo: veh.matricula,
                cantidad
            };
        })
        .sort((a, b) => b.cantidad - a.cantidad);
}

exportarJSON() {
    const data = {
        vehiculos: this.#vehiculos,
        reparaciones: this.#reparaciones
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "backup-taller.json";
    a.click();
}

filtrarReparacionesAvanzado(filtros = {}) {

    return this.#reparaciones.filter(r => {

        // terminado = true / false
        if (filtros.terminado !== undefined &&
            r.terminado !== filtros.terminado) return false;

        // pagado = true / false
        if (filtros.pagado !== undefined &&
            r.pagado !== filtros.pagado) return false;

        // presupuesto = true / false
        if (filtros.presupuesto !== undefined &&
            r.presupuesto !== filtros.presupuesto) return false;

        // aprobada = true / false
        if (filtros.aprobada !== undefined &&
            r.aprobada !== filtros.aprobada) return false;

        return true;
    });
}
ordenarReparaciones(lista, criterio) {

    if (criterio === "fecha-desc")
        return lista.sort((a,b) => new Date(b.fecha) - new Date(a.fecha));

    if (criterio === "fecha-asc")
        return lista.sort((a,b) => new Date(a.fecha) - new Date(b.fecha));

    if (criterio === "total-desc")
        return lista.sort((a,b) => 
            (b.trabajos?.reduce((s,t)=>s+t.totalTrabajo,0) ?? 0) -
            (a.trabajos?.reduce((s,t)=>s+t.totalTrabajo,0) ?? 0)
        );

    if (criterio === "total-asc")
        return lista.sort((a,b) => 
            (a.trabajos?.reduce((s,t)=>s+t.totalTrabajo,0) ?? 0) -
            (b.trabajos?.reduce((s,t)=>s+t.totalTrabajo,0) ?? 0)
        );

    return lista;
}

buscarReparacionesGlobal(texto) {

    if (!texto || texto.trim() === "") return this.#reparaciones;

    texto = texto.toLowerCase();

    return this.#reparaciones.filter(rep => {

        const vehiculo = this.#vehiculos.find(v => v.vehiculoId === rep.vehiculoId);
        const propietario = vehiculo?.propietario;

        const total = rep.trabajos?.reduce((t,x)=>t+x.totalTrabajo,0) ?? 0;

        const cadena = `
            ${vehiculo?.matricula}
            ${vehiculo?.marca}
            ${vehiculo?.modelo}
            ${propietario?.nombre}
            ${propietario?.telefono}
            ${rep.fecha}
            ${rep.descripcion}
            ${total}
            ${rep.terminado}
            ${rep.pagado}
            ${rep.presupuesto}
            ${rep.aprobada}
            ${rep.trabajos.map(t => t.concepto).join(" ")}
        `.toLowerCase();

        return cadena.includes(texto);
    });
}
exportarJSON() {
    const data = {
        vehiculos: this.#vehiculos,
        reparaciones: this.#reparaciones
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "taller-backup.json";
    a.click();
}
convertirA_CSV(lista) {

    if (!lista || lista.length === 0) return "";

    const headers = Object.keys(lista[0]).join(";");

    const filas = lista.map(obj =>
        Object.values(obj)
            .map(v => `"${v}"`) 
            .join(";")
    );

    return [headers, ...filas].join("\n");
}
exportarVehiculosCSV() {
    const csv = this.convertirA_CSV(this.#vehiculos);

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "vehiculos.csv";
    a.click();
}
exportarReparacionesCSV() {

    const reparacionesPlanas = this.#reparaciones.map(r => ({
        reparacionId: r.reparacionId,
        vehiculoId: r.vehiculoId,
        fecha: r.fecha,
        kilometros: r.kilometros,
        descripcion: r.descripcion,
        terminada: r.terminado,
        pagado: r.pagado,
        presupuesto: r.presupuesto,
        aprobada: r.aprobada,
        total: r.trabajos?.reduce((s,t)=>s+t.totalTrabajo,0) ?? 0
    }));

    const csv = this.convertirA_CSV(reparacionesPlanas);

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "reparaciones.csv";
    a.click();
}

}
