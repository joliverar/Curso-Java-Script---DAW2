export class Reparacion {
    constructor({ reparacionId, vehiculoId, fecha, pagado, terminado, trabajos }) {
        this.reparacionId = reparacionId;
        this.vehiculoId = vehiculoId;
        this.fecha = fecha;
        this.pagado = pagado;
        this.terminado = terminado;
        this.trabajos = trabajos;
    }
}
