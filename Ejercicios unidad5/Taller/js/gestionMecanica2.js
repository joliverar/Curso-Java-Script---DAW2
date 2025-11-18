import { BD } from "./BD.js";

export class gestionMecanica {

    #bd;
    #contenedor;

    constructor() {
        this.#bd = new BD();
    }

    iniciarAPP(selector) {
        this.#contenedor = document.querySelector(selector);

        if (!this.#contenedor) {
            alert("No existe el contenedor");
            return;
        }

        // cargar la base inicial
        this.#contenedor.innerHTML = this.generarHTMLBase();

        // activar eventos globales
        this.configurarEventos();

        // cargar inicio
        document.querySelector("#vista").innerHTML = this.generarHTMLInicio();
    }

    // ============================================
    //  HTML BASE SPA
    // ============================================
    generarHTMLBase() {
        return `
            <nav>
                <button data-action="inicio">Inicio</button>
                <button data-action="vehiculos">Vehículos</button>
                <button data-action="sin-terminar">No terminadas</button>
                <button data-action="sin-pagar">No pagadas</button>
                <button data-action="presupuestos">Presupuestos</button>
            </nav>

            <div id="vista"></div>
        `;
    }

    // ============================================
    //  PANTALLA INICIO + BUSCADOR
    // ============================================
    generarHTMLInicio() {
        return `
            <h2>Inicio del Taller</h2>

            <form data-form="buscar">
                <select name="tipo">
                    <option value="matricula">Matrícula</option>
                    <option value="telefono">Teléfono</option>
                </select>

                <input name="valor" placeholder="Buscar..." />

                <button type="submit">Buscar</button>
            </form>

            <div id="resultado-busqueda"></div>
        `;
    }

    generarHTMLVehiculos(vehiculos) {
        return `
            <h2>Vehículos</h2>

            <button data-action="nuevo-vehiculo">Nuevo vehículo</button>

            <ul>
                ${vehiculos.map(v => `
                    <li>
                        <b>${v.matricula}</b> — ${v.marca} ${v.modelo}
                        <button data-action="ver-vehiculo" data-id="${v.vehiculoId}">Ver</button>
                        <button data-action="editar-vehiculo" data-id="${v.vehiculoId}">Editar</button>
                        <button data-action="borrar-vehiculo" data-id="${v.vehiculoId}">Borrar</button>
                        <button data-action="ver-reparaciones" data-id="${v.vehiculoId}">Reparaciones</button>
                    </li>
                `).join("")}
            </ul>
        `;
    }

    generarHTMLVehiculo(v) {
        return `
            <h2>Vehículo ${v.matricula}</h2>

            <p><b>Marca:</b> ${v.marca}</p>
            <p><b>Modelo:</b> ${v.modelo}</p>
            <p><b>Propietario:</b> ${v.propietario.nombre}</p>
            <p><b>Teléfono:</b> ${v.propietario.telefono}</p>

            <button data-action="ver-reparaciones" data-id="${v.vehiculoId}">
                Ver Reparaciones
            </button>
        `;
    }

    generarHTMLFormularioVehiculo(v = null) {
        const esNuevo = v === null;

        return `
            <h2>${esNuevo ? "Nuevo Vehículo" : "Editar Vehículo"}</h2>

            <form data-form="${esNuevo ? "crear-vehiculo" : "editar-vehiculo"}"
                  data-id="${esNuevo ? "" : v.vehiculoId}">
                
                Matrícula:
                <input name="matricula" value="${v?.matricula ?? ""}" required>

                Marca:
                <input name="marca" value="${v?.marca ?? ""}" required>

                Modelo:
                <input name="modelo" value="${v?.modelo ?? ""}" required>

                Propietario:
                <input name="propietario-nombre" value="${v?.propietario?.nombre ?? ""}" required>

                Teléfono:
                <input name="propietario-telefono" value="${v?.propietario?.telefono ?? ""}" required>

                <button type="submit">Guardar</button>

            </form>
        `;
    }

    // ============================================
    //   REPARACIONES
    // ============================================
    generarHTMLListadoReparaciones(reps, vehiculo) {
        return `
            <h2>Reparaciones de ${vehiculo.matricula}</h2>

            <button data-action="ver-vehiculo" data-id="${vehiculo.vehiculoId}">
                Ver Vehículo
            </button>

            <button data-action="nueva-reparacion" data-id="${vehiculo.vehiculoId}">
                Nueva Reparación
            </button>

            <ul>
                ${reps.map(r => `
                    <li>
                        <b>${r.fecha}</b> —
                        Terminado: ${r.terminado ? "Sí" : "No"}, 
                        Pagado: ${r.pagado ? "Sí" : "No"}

                        <button data-action="ver-reparacion" data-id="${r.reparacionId}">
                            Ver
                        </button>
                        <button data-action="borrar-reparacion" data-id="${r.reparacionId}">
                            Borrar
                        </button>
                    </li>
                `).join("")}
            </ul>
        `;
    }

    generarHTMLFormularioReparacion(r, vehiculoId) {
        const esNueva = r === null;

        return `
            <h2>${esNueva ? "Nueva Reparación" : "Editar Reparación"}</h2>

            <form data-form="${esNueva ? "crear-reparacion" : "editar-reparacion"}"
                  data-id="${esNueva ? "" : r.reparacionId}"
                  data-vehiculoid="${vehiculoId}">

                Fecha:
                <input type="date" name="fecha" value="${r?.fecha ?? ""}" required>

                Terminado:
                <input type="checkbox" name="terminado" ${r?.terminado ? "checked" : ""}>

                Pagado:
                <input type="checkbox" name="pagado" ${r?.pagado ? "checked" : ""}>

                <h3>Trabajos</h3>

                <div id="lista-trabajos">
                    ${(r?.trabajos ?? []).map(t => `
                        <p>
                            ${t.concepto} — ${t.precio}€
                            <button data-action="borrar-trabajo"
                                    data-id="${t.trabajoId}"
                                    data-rep="${r.reparacionId}">X</button>
                        </p>
                    `).join("")}
                </div>

                <h4>Añadir trabajo</h4>

                <input name="nuevo-concepto" placeholder="Concepto">
                <input name="nuevo-precio" placeholder="Precio" type="number">

                <button data-action="agregar-trabajo"
                        data-id="${r?.reparacionId}"
                        data-vehiculo="${vehiculoId}"
                        type="button">
                    Agregar trabajo
                </button>

                <br><br>
                <button type="submit">Guardar</button>

            </form>
        `;
    }

    // ============================================
    //  CONFIGURACIÓN DE EVENTOS
    // ============================================
    configurarEventos() {

        //-------------------------------------------
        // CLICK
        //-------------------------------------------
        document.addEventListener("click", e => {
            const btn = e.target.closest("[data-action]");
            if (!btn) return;

            const accion = btn.dataset.action;
            const id = btn.dataset.id;

            // ---- MENÚ PRINCIPAL ----
            if (accion === "inicio") {
                return document.querySelector("#vista").innerHTML =
                    this.generarHTMLInicio();
            }

            if (accion === "vehiculos") {
                const vs = this.#bd.obtenerVehiculos();
                return document.querySelector("#vista").innerHTML =
                    this.generarHTMLVehiculos(vs);
            }

            // NUEVO VEHICULO
            if (accion === "nuevo-vehiculo") {
                return document.querySelector("#vista").innerHTML =
                    this.generarHTMLFormularioVehiculo();
            }

            // VER VEHICULO
            if (accion === "ver-vehiculo") {
                const v = this.#bd.obtenerVehiculo("vehiculoId", id)[0];
                return document.querySelector("#vista").innerHTML =
                    this.generarHTMLVehiculo(v);
            }

            // EDITAR VEHICULO
            if (accion === "editar-vehiculo") {
                const v = this.#bd.obtenerVehiculo("vehiculoId", id)[0];
                return document.querySelector("#vista").innerHTML =
                    this.generarHTMLFormularioVehiculo(v);
            }

            // BORRAR VEHICULO
            if (accion === "borrar-vehiculo") {
                this.#bd.borrarVehiculo(Number(id));
                const vs = this.#bd.obtenerVehiculos();
                return document.querySelector("#vista").innerHTML =
                    this.generarHTMLVehiculos(vs);
            }

            // VER REPARACIONES
            if (accion === "ver-reparaciones") {
                const v = this.#bd.obtenerVehiculo("vehiculoId", id)[0];
                const reps = this.#bd.obtenerReparacionesPorVehiculo(id);

                return document.querySelector("#vista").innerHTML =
                    this.generarHTMLListadoReparaciones(reps, v);
            }

            // NUEVA REPARACION
            if (accion === "nueva-reparacion") {
                return document.querySelector("#vista").innerHTML =
                    this.generarHTMLFormularioReparacion(null, id);
            }

            // VER REPARACION
            if (accion === "ver-reparacion") {
                const r = this.#bd.obtenerReparacion(id);
                return document.querySelector("#vista").innerHTML =
                    this.generarHTMLFormularioReparacion(r, r.vehiculoId);
            }

            // BORRAR REPARACION
            if (accion === "borrar-reparacion") {
                this.#bd.borrarReparacion(Number(id));
                const r = this.#bd.obtenerReparacion(id);
                return alert("Reparación eliminada.");
            }

            // AGREGAR TRABAJO
            if (accion === "agregar-trabajo") {
                const repId = btn.dataset.id;
                const form = btn.closest("form");
                const concepto = form["nuevo-concepto"].value;
                const precio = Number(form["nuevo-precio"].value);

                if (!concepto || !precio) return alert("Completa el trabajo");

                this.#bd.crearTrabajo(repId, {
                    concepto,
                    precio
                });

                const r = this.#bd.obtenerReparacion(repId);

                document.querySelector("#vista").innerHTML =
                    this.generarHTMLFormularioReparacion(r, r.vehiculoId);
            }

            // BORRAR TRABAJO
            if (accion === "borrar-trabajo") {
                this.#bd.borrarTrabajo(btn.dataset.rep, btn.dataset.id);
                const r = this.#bd.obtenerReparacion(btn.dataset.rep);

                document.querySelector("#vista").innerHTML =
                    this.generarHTMLFormularioReparacion(r, r.vehiculoId);
            }
        });

        //-------------------------------------------
        // SUBMIT FORMULARIOS
        //-------------------------------------------
        document.addEventListener("submit", e => {
            const form = e.target.closest("form[data-form]");
            if (!form) return;

            e.preventDefault();

            const datos = Object.fromEntries(new FormData(form).entries());
            const tipo = form.dataset.form;

            //-------------------------------------------------
            // CREAR VEHICULO
            //-------------------------------------------------
            if (tipo === "crear-vehiculo") {
                this.#bd.crearVehiculo({
                    vehiculoId: this.#bd.siguienteVehiculoId,
                    matricula: datos.matricula,
                    marca: datos.marca,
                    modelo: datos.modelo,
                    propietario: {
                        nombre: datos["propietario-nombre"],
                        telefono: datos["propietario-telefono"]
                    }
                });

                const vs = this.#bd.obtenerVehiculos();
                return document.querySelector("#vista").innerHTML =
                    this.generarHTMLVehiculos(vs);
            }

            //-------------------------------------------------
            // EDITAR VEHICULO
            //-------------------------------------------------
            if (tipo === "editar-vehiculo") {
                const v = this.#bd.obtenerVehiculo("vehiculoId", form.dataset.id)[0];

                v.matricula = datos.matricula;
                v.marca = datos.marca;
                v.modelo = datos.modelo;
                v.propietario.nombre = datos["propietario-nombre"];
                v.propietario.telefono = datos["propietario-telefono"];

                const vs = this.#bd.obtenerVehiculos();
                return document.querySelector("#vista").innerHTML =
                    this.generarHTMLVehiculos(vs);
            }

            //-------------------------------------------------
            // BUSCADOR
            //-------------------------------------------------
            if (tipo === "buscar") {
                const resultados = this.#bd.obtenerVehiculo(datos.tipo, datos.valor);

                return document.querySelector("#resultado-busqueda").innerHTML =
                    this.generarHTMLVehiculos(resultados);
            }

            //-------------------------------------------------
            // CREAR REPARACIÓN
            //-------------------------------------------------
            if (tipo === "crear-reparacion") {
                this.#bd.crearReparacion({
                    reparacionId: this.#bd.siguienteReparacionId,
                    vehiculoId: Number(form.dataset.vehiculoid),
                    fecha: datos.fecha,
                    pagado: datos.pagado ? true : false,
                    terminado: datos.terminado ? true : false,
                    trabajos: []
                });

                const reps = this.#bd.obtenerReparacionesPorVehiculo(form.dataset.vehiculoid);
                const v = this.#bd.obtenerVehiculo("vehiculoId", form.dataset.vehiculoid)[0];

                return document.querySelector("#vista").innerHTML =
                    this.generarHTMLListadoReparaciones(reps, v);
            }

            //-------------------------------------------------
            // EDITAR REPARACION
            //-------------------------------------------------
            if (tipo === "editar-reparacion") {
                const r = this.#bd.obtenerReparacion(form.dataset.id);

                r.fecha = datos.fecha;
                r.pagado = datos.pagado ? true : false;
                r.terminado = datos.terminado ? true : false;

                const reps = this.#bd.obtenerReparacionesPorVehiculo(r.vehiculoId);
                const v = this.#bd.obtenerVehiculo("vehiculoId", r.vehiculoId)[0];

                return document.querySelector("#vista").innerHTML =
                    this.generarHTMLListadoReparaciones(reps, v);
            }

        });
    }
}

// Ejecutar APP
const app = new gestionMecanica();
app.iniciarAPP("#app");
