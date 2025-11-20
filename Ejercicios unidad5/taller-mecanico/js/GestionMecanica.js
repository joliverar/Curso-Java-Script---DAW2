// GestionMecanica.js
import { BD } from "./BD.js";

export class GestionMecanica {

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

        this.#contenedor.innerHTML = this.generarHTMLBase();

        this.pintarInicio();
        this.configurarEventos();
    }

    // ============================
    // HELPERS
    // ============================
    getVista() {
        return document.querySelector("#vista");
    }

    pintarInicio() {
        this.getVista().innerHTML = this.generarHTMLInicio();
    }

    pintarVehiculos() {
        const lista = this.#bd.obtenerVehiculos();
        this.getVista().innerHTML = this.generarHTMLVehiculos(lista);
    }

    // ============================
    // HTML BASE SPA
    // ============================
    generarHTMLBase() {
        return `
  <nav class="navbar">

    <button data-action="inicio" class="btn-nav btn-primary">Inicio</button>
    <button data-action="vehiculos" class="btn-nav btn-primary">Vehículos</button>

    <!-- GRUPO REPARACIONES -->
    <div class="dropdown">
        <button class="btn-nav btn-info dropdown-btn">Reparaciones ▾</button>

        <div class="dropdown-content">
            <button data-action="reparaciones-no-terminadas">No terminadas</button>
            <button data-action="reparaciones-no-pagadas">No pagadas</button>
            <button data-action="presupuestos">Presupuestos</button>
            <button data-action="presupuestos-aprobados">Aprobadas</button>
            <button data-action="presupuestos-no-aprobados">No aprobadas</button>
            <button data-action="filtrar-reparaciones">Filtrar reparaciones</button>
            <button data-action="buscar-reparaciones">Buscar reparaciones</button>
        </div>
    </div>

    <button data-action="reportes" class="btn-nav btn-dark">Reportes</button>

    <button data-action="exportar-json" class="btn-nav btn-export">Exportar JSON</button>
    <button data-action="exportar-csv" class="btn-nav btn-export">Exportar CSV</button>

</nav>



        <div id="vista" class="vista-general"></div>
    `;
    }


    // ============================
    // INICIO + BUSCADOR
    // ============================
    generarHTMLInicio() {
        return `
            <h2>Inicio del Taller</h2>

            <form data-form="buscar" class="form-buscar">
                <select name="tipo" class="input-select">
                    <option value="matricula">Matrícula</option>
                    <option value="telefono">Teléfono</option>
                </select>

                <input name="valor" placeholder="Buscar..." class="input-text"/>

                <button type="submit" class="btn">Buscar</button>
            </form>

            <div id="resultado-busqueda" class="resultado-busqueda"></div>
        `;
    }

    // ============================
    // LISTADO VEHÍCULOS
    // ============================
    generarHTMLVehiculos(vehiculos) {

        let html = `
            <div class="titulo-y-boton">
                <h2>Vehículos</h2>
                <button data-action="nuevo-vehiculo" class="btn btn-nuevo">Nuevo vehículo</button>
            </div>

            <div class="lista-vehiculos">
        `;

        vehiculos.forEach(v => {
            html += `
                <div class="vehiculo-card">

                    <div class="vehiculo-info">
                        <strong class="vehiculo-matricula">${v.matricula}</strong>
                        <span class="vehiculo-modelo">${v.marca} - ${v.modelo}</span>
                        <span class="vehiculo-propietario">${v.propietario.nombre} (${v.propietario.telefono})</span>
                    </div>

                    <div class="vehiculo-acciones">
                        <button data-action="ver-vehiculo" data-id="${v.vehiculoId}" class="btn">Ver</button>
                        <button data-action="editar-vehiculo" data-id="${v.vehiculoId}" class="btn">Editar</button>
                        <button data-action="borrar-vehiculo" data-id="${v.vehiculoId}" class="btn btn-danger">Borrar</button>
                        <button data-action="ver-reparaciones" data-id="${v.vehiculoId}" class="btn btn-danger">ver reparacion</button>
                    </div>
                </div>
            `;
        });

        html += `</div>`;

        return html;
    }

    // ============================
    // DETALLE VEHÍCULO
    // ============================
    generarHTMLVehiculo(v) {
        return `
            <h2>Vehículo ${v.matricula}</h2>

            <div class="vehiculo-detalle">
                <p><b>Marca:</b> ${v.marca}</p>
                <p><b>Modelo:</b> ${v.modelo}</p>
                <p><b>Propietario:</b> ${v.propietario.nombre}</p>
                <p><b>Teléfono:</b> ${v.propietario.telefono}</p>
            </div>
            <button data-action="ver-reparaciones" data-id="${v.vehiculoId}" class="btn">Ver reparaciones</button>
            <button data-action="vehiculos" class="btn">Volver</button>
        `;
    }

    // ============================
    // FORMULARIO VEHÍCULO
    // ============================
    generarHTMLFormularioVehiculo(v = null) {

        const esNuevo = v === null;

        return `
            <h2>${esNuevo ? "Nuevo Vehículo" : "Editar Vehículo"}</h2>

            <form data-form="${esNuevo ? "crear-vehiculo" : "editar-vehiculo"}" 
                  data-id="${esNuevo ? "" : v.vehiculoId}"
                  class="form-vehiculo">

                <div class="form-grupo">
                    <label>Matrícula:</label>
                    <input name="matricula" value="${v?.matricula ?? ""}" required class="input-text">
                </div>

                <div class="form-grupo">
                    <label>Marca:</label>
                    <input name="marca" value="${v?.marca ?? ""}" required class="input-text">
                </div>

                <div class="form-grupo">
                    <label>Modelo:</label>
                    <input name="modelo" value="${v?.modelo ?? ""}" required class="input-text">
                </div>

                <div class="form-grupo">
                    <label>Propietario:</label>
                    <input name="propietario-nombre" value="${v?.propietario?.nombre ?? ""}" required class="input-text">
                </div>

                <div class="form-grupo">
                    <label>Teléfono:</label>
                    <input name="propietario-telefono" value="${v?.propietario?.telefono ?? ""}" required class="input-text">
                </div>

                <button type="submit" class="btn btn-guardar">Guardar</button>
                <button type="button" data-action="vehiculos" class="btn">Cancelar</button>
            </form>
        `;
    }

    generarHTMLListadoReparaciones(reps, vehiculo) {

        let html = `
        <div class="titulo-y-boton">
            <h2>Reparaciones de ${vehiculo.matricula}</h2>
            <button data-action="nueva-reparacion" data-id="${vehiculo.vehiculoId}" class="btn btn-nuevo">
                Nueva reparación
            </button>
        </div>

        <button data-action="ver-vehiculo" data-id="${vehiculo.vehiculoId}" class="btn">
            Ver vehículo
        </button>

        <div class="lista-reparaciones">
    `;

        reps.forEach(r => {

            const total = r.trabajos?.reduce((s, t) => s + t.totalTrabajo, 0) ?? 0;

            html += `
            <div class="reparacion-card">

                <div class="reparacion-info">
                    <p><b>Fecha:</b> ${r.fecha}</p>
                    <p><b>Kilómetros:</b> ${r.kilometros}</p>
                    <p><b>Total:</b> ${total} €</p>

                    <p><b>Terminado:</b> ${r.terminado ? "Sí" : "No"}</p>
                    <p><b>Pagado:</b> ${r.pagado ? "Sí" : "No"}</p>
                    <p><b>Presupuesto:</b> ${r.presupuesto ? "Sí" : "No"}</p>
                    <p><b>Aprobada:</b> ${r.aprobada ? "Sí" : "No"}</p>
                </div>

                <div class="reparacion-acciones">
                    <button data-action="ver-reparacion" data-id="${r.reparacionId}" class="btn">Editar</button>
                    <button data-action="borrar-reparacion" data-id="${r.reparacionId}" class="btn btn-danger">Borrar</button>
                </div>

            </div>
            <div class="card reparacion-card">

    <div class="card-header">
        <h3>${r.fecha}</h3>
        <span class="card-total">${total} €</span>
    </div>

    <div class="card-body">
        <p><b>Kilómetros:</b> ${r.kilometros}</p>
        <p><b>Descripción:</b> ${r.descripcion}</p>

        ${/* badges */""}
        ${this.generarBadgesReparacion(r)}
    </div>

    <div class="card-footer">
        <button data-action="ver-reparacion" data-id="${r.reparacionId}" class="btn btn-small">Editar</button>
        <button data-action="borrar-reparacion" data-id="${r.reparacionId}" class="btn btn-small btn-danger">Borrar</button>
    </div>

</div>

        `;
        });

        html += `</div>`;

        return html;
    }

    generarBadgesReparacion(r) {
        return `
        <div class="badges-estado">
            <span class="badge ${r.terminado ? "badge-ok" : "badge-pendiente"}">
                ${r.terminado ? "Terminado" : "Pendiente"}
            </span>
            <span class="badge ${r.pagado ? "badge-ok" : "badge-no"}">
                ${r.pagado ? "Pagado" : "No pagado"}
            </span>
            <span class="badge ${r.presupuesto ? "badge-info" : "badge-secondary"}">
                ${r.presupuesto ? "Presupuesto" : "Normal"}
            </span>
            <span class="badge ${r.aprobada ? "badge-ok" : "badge-no"}">
                ${r.aprobada ? "Aprobada" : "Rechazada"}
            </span>
        </div>
    `;
    }

    generarHTMLFormularioReparacion(rep = null, vehiculoId) {

        const esNueva = rep === null;

        // total calculado
        const total = rep?.trabajos?.reduce((sum, t) => sum + t.totalTrabajo, 0) ?? 0;

        return `
        <h2>${esNueva ? "Nueva reparación" : "Editar reparación"}</h2>

        <form data-form="${esNueva ? "crear-reparacion" : "editar-reparacion"}"
              data-id="${esNueva ? "" : rep.reparacionId}"
              data-vehiculoid="${vehiculoId}"
              class="form-reparacion">

            <!-- CAMPOS PRINCIPALES -->
            <div class="form-grupo">
                <label>Fecha:</label>
                <input type="date" name="fecha" value="${rep?.fecha ?? ""}" required>
            </div>

            <div class="form-grupo">
                <label>Kilómetros:</label>
                <input name="kilometros" type="number" value="${rep?.kilometros ?? ""}">
            </div>

            <div class="form-grupo">
                <label>Descripción:</label>
                <input name="descripcion" value="${rep?.descripcion ?? ""}">
            </div>

            <!-- CHECKBOXES -->
            <div class="form-grupo">
                <label>Terminado:</label>
                <input type="checkbox" name="terminado" ${rep?.terminado ? "checked" : ""}>
            </div>

            <div class="form-grupo">
                <label>Pagado:</label>
                <input type="checkbox" name="pagado" ${rep?.pagado ? "checked" : ""}>
            </div>

            <div class="form-grupo">
                <label>Presupuesto:</label>
                <input type="checkbox" name="presupuesto" ${rep?.presupuesto ? "checked" : ""}>
            </div>

            <div class="form-grupo">
                <label>Aprobada:</label>
                <input type="checkbox" name="aprobada" ${rep?.aprobada ? "checked" : ""}>
            </div>

            <!-- TRABAJOS -->
            <h3>Trabajos</h3>

            <div id="lista-trabajos" class="lista-trabajos">
                ${(rep?.trabajos ?? [])
                .map(t => `
                        <div class="trabajo-item">
                            <span>${t.concepto} — ${t.totalTrabajo} €</span>

                            <button data-action="borrar-trabajo"
                                    data-id="${t.trabajoId}"
                                    data-rep="${rep.reparacionId}"
                                    class="btn btn-danger">
                                X
                            </button>
                        </div>
                    `).join("")
            }
            </div>

            <!-- FORM NUEVO TRABAJO -->
            <h4>Añadir trabajo</h4>

            <div class="form-grupo">
                <input name="nuevo-concepto" placeholder="Concepto">
            </div>

            <div class="form-grupo">
                <input name="nuevo-precio" type="number" placeholder="Precio unitario">
            </div>

            <div class="form-grupo">
                <input name="nuevo-cantidad" type="number" placeholder="Cantidad">
            </div>

            <button 
                type="button"
                data-action="agregar-trabajo"
                data-id="${rep?.reparacionId}"
                data-vehiculo="${vehiculoId}"
                class="btn btn-nuevo">
                Agregar trabajo
            </button>

            <!-- TOTAL -->
            <h3 class="total-reparacion">Total actual: ${total} €</h3>

            <!-- BOTONES -->
            <button type="submit" class="btn btn-guardar">Guardar</button>
            <button type="button" data-action="ver-reparaciones" data-id="${vehiculoId}" class="btn">
                Cancelar
            </button>

        </form>
    `;
    }

    generarHTMLReparacionesGlobal(reps) {

        let html = `
        <h2>Listado de reparaciones</h2>

        <div class="lista-reparaciones">
    `;

        reps.forEach(r => {

            const vehiculo = this.#bd.obtenerVehiculo("vehiculoId", r.vehiculoId)[0];
            const total = r.trabajos?.reduce((s, t) => s + t.totalTrabajo, 0) ?? 0;

            html += `
            <div class="reparacion-card">

                <div class="reparacion-info">
                    <p><b>Vehículo:</b> ${vehiculo.matricula}</p>
                    <p><b>Fecha:</b> ${r.fecha}</p>
                    <p><b>Total:</b> ${total} €</p>

                    <p><b>Terminado:</b> ${r.terminado ? "Sí" : "No"}</p>
                    <p><b>Pagado:</b> ${r.pagado ? "Sí" : "No"}</p>
                    <p><b>Presupuesto:</b> ${r.presupuesto ? "Sí" : "No"}</p>
                    <p><b>Aprobada:</b> ${r.aprobada ? "Sí" : "No"}</p>

                    <div class="badges-estado">
                        <span class="badge estado-terminado ${r.terminado ? "ok" : "no"}">
                            ${r.terminado ? "Terminado" : "Pendiente"}
                        </span>

                        <span class="badge estado-pagado ${r.pagado ? "ok" : "no"}">
                            ${r.pagado ? "Pagado" : "No pagado"}
                        </span>

                        <span class="badge estado-presupuesto ${r.presupuesto ? "ok" : "no"}">
                            ${r.presupuesto ? "Presupuesto" : "No presupuesto"}
                        </span>

                        <span class="badge estado-aprobada ${r.aprobada ? "ok" : "no"}">
                            ${r.aprobada ? "Aprobada" : "Rechazada"}
                        </span>
                    </div>

                </div>

                <div class="reparacion-acciones">
                    <button data-action="ver-reparacion" data-id="${r.reparacionId}" class="btn">Ver</button>
                </div>

            </div>
        `;
        });

        html += `</div>`;

        return html;
    }

    generarHTMLPanelFiltros() {
        return `
    <div class="filtros-contenedor">

        <h2 class="filtros-titulo">Filtrar reparaciones</h2>

        <div class="filtros-box">

            <div class="filtro-item">
                <label>Estado:</label>
                <select id="filtro-estado">
                    <option value="">(todos)</option>
                    <option value="terminado-true">Terminadas</option>
                    <option value="terminado-false">No terminadas</option>
                    <option value="pagado-true">Pagadas</option>
                    <option value="pagado-false">No pagadas</option>
                    <option value="presupuesto-true">Con presupuesto</option>
                    <option value="presupuesto-false">Sin presupuesto</option>
                    <option value="aprobada-true">Aprobadas</option>
                    <option value="aprobada-false">No aprobadas</option>
                </select>
            </div>

            <div class="filtro-item">
                <label>Ordenar por:</label>
                <select id="orden-reps">
                    <option value="">(sin orden)</option>
                    <option value="fecha-desc">Fecha ↓ (reciente)</option>
                    <option value="fecha-asc">Fecha ↑ (antigua)</option>
                    <option value="total-desc">Total ↓ (mayor)</option>
                    <option value="total-asc">Total ↑ (menor)</option>
                </select>
            </div>

            <button class="boton-aplicar-filtro" id="btn-aplicar-filtros">Aplicar filtros</button>
        </div>

        <div id="resultado-filtros" class="resultados-filtro"></div>
    </div>
    `;
    }

    generarHTMLBuscadorReparaciones() {
        return `
        <h2>Buscar reparaciones</h2>

        <input id="buscador-global" 
               placeholder="Buscar por matrícula, cliente, fecha, descripción, trabajo..."
               class="input-text"/>

        <div id="resultado-busqueda-global"></div>
    `;
    }

    generarHTMLReportes() {

        const porMes = this.#bd.obtenerReparacionesPorMes();
        const estado = this.#bd.obtenerEstadoReparaciones();
        const rankingClientes = this.#bd.rankingClientes();
        const rankingVehiculos = this.#bd.rankingVehiculos();

        let html = `
        <div class="reportes-contenedor">

            <h2 class="reportes-titulo">Reportes del Taller</h2>

            <div class="reportes-grid">
    `;

        // 1) Reparaciones por Mes
        html += `
        <div class="reporte-card">
            <h3>Reparaciones por Mes</h3>
            <ul>
                ${Object.entries(porMes).map(([mes, data]) =>
            `<li>${mes}: ${data.cantidad} rep. — ${data.total} €</li>`
        ).join("")}
            </ul>
        </div>
    `;

        // 2) Estado global
        html += `
        <div class="reporte-card">
            <h3>Estado Global</h3>
            <p>Terminadas: ${estado.terminadas}</p>
            <p>No terminadas: ${estado.noTerminadas}</p>
        </div>
    `;

        // 3) Ranking clientes
        html += `
        <div class="reporte-card">
            <h3>Ranking de Clientes</h3>
            <ul>
                ${rankingClientes.map(c =>
            `<li>${c.cliente}: ${c.total} €</li>`
        ).join("")}
            </ul>
        </div>
    `;

        // 4) Ranking vehículos
        html += `
        <div class="reporte-card">
            <h3>Vehículos más atendidos</h3>
            <ul>
                ${rankingVehiculos.map(v =>
            `<li>${v.vehiculo}: ${v.cantidad} visitas</li>`
        ).join("")}
            </ul>
        </div>
    `;

        html += `
            </div> 
        </div>
    `;

        return html;
    }

    mostrarToast(mensaje, tipo = "info") {
        let cont = document.querySelector(".toast-container");
        if (!cont) {
            cont = document.createElement("div");
            cont.classList.add("toast-container");
            document.body.appendChild(cont);
        }

        const t = document.createElement("div");
        t.classList.add("toast", tipo);
        t.innerText = mensaje;

        cont.appendChild(t);

        setTimeout(() => {
            t.style.opacity = 0;
            setTimeout(() => t.remove(), 500);
        }, 2500);
    }
    confirmar(mensaje, callback) {

        const overlay = document.createElement("div");
        overlay.classList.add("modal-overlay");

        const modal = document.createElement("div");
        modal.classList.add("modal");

        modal.innerHTML = `
        <p>${mensaje}</p>
        <button class="btn btn-danger" data-res="si">Sí</button>
        <button class="btn" data-res="no">No</button>
    `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        overlay.addEventListener("click", e => {
            const btn = e.target.closest("[data-res]");
            if (!btn) return;

            const res = btn.dataset.res === "si";
            overlay.remove();
            callback(res);
        });
    }
    mostrarBanner(mensaje) {
        const vista = this.getVista();

        vista.innerHTML = `
        <div class="info-banner">${mensaje}</div>
        ${vista.innerHTML}
    `;
    }

    // ============================
    // EVENTOS
    // ============================
    configurarEventos() {

        // CLICKs delegados
        document.addEventListener("click", e => {
            const btn = e.target.closest("[data-action]");
            if (!btn) return;

            const accion = btn.dataset.action;
            const id = Number(btn.dataset.id);

            if (accion === "inicio") return this.pintarInicio();
            if (accion === "vehiculos") return this.pintarVehiculos();

            if (accion === "nuevo-vehiculo") {
                this.getVista().innerHTML = this.generarHTMLFormularioVehiculo();
                return;
            }
            console.log("Vehículos en BD:", this.#bd.obtenerVehiculos());
            console.log("Buscando ID:", id);

            if (accion === "ver-vehiculo") {
                const v = this.#bd.obtenerVehiculo("vehiculoId", id)[0];
                console.log("BTN dataset:", btn.dataset);
                console.log("ID recibido:", id);

                this.getVista().innerHTML = this.generarHTMLVehiculo(v);
                return;
            }

            if (accion === "editar-vehiculo") {
                const v = this.#bd.obtenerVehiculo("vehiculoId", id)[0];
                this.getVista().innerHTML = this.generarHTMLFormularioVehiculo(v);
                return;
            }

            if (accion === "borrar-vehiculo") {
                this.confirmar("Dese borrar este vehiculo?", (ok) =>{
                    if(!ok) return;
                        this.#bd.borrarVehiculo(Number(id));
                        this.mostrarToast("Se elimino el vehiculo correctamente","success");
                        this.pintarVehiculos();
                });
                
                return;
            }
            // ===============================
            // REPARACIONES — CLICK
            // ===============================
            if (accion === "ver-reparaciones") {
                const v = this.#bd.obtenerVehiculo("vehiculoId", id)[0];
                const reps = this.#bd.obtenerReparacionPorVehiculo(id);
                this.getVista().innerHTML = this.generarHTMLListadoReparaciones(reps, v);
                return;
            }

            if (accion === "nueva-reparacion") {
                this.getVista().innerHTML = this.generarHTMLFormularioReparacion(null, id);
                return;
            }

            if (accion === "ver-reparacion") {
                const r = this.#bd.obtenerReparacion(id);
                this.getVista().innerHTML = this.generarHTMLFormularioReparacion(r, r.vehiculoId);
                return;
            }

            if (accion === "borrar-reparacion") {
                this.confirmar("¿Deseas borrar esta reparación?", (ok) => {
                    if (!ok) return;
                    this.#bd.borrarReparaciones(id);
                    this.mostrarToast("Reparación eliminada", "success");
                    // alert("Reparación eliminada");
                    // OPCIONAL: recargar vista actual
                    this.pintarVehiculos();

                });
                return;
            }

            if (accion === "agregar-trabajo") {

                const repId = btn.dataset.id;
                const form = btn.closest("form");

                const concepto = form["nuevo-concepto"].value;
                const precioUnitario = Number(form["nuevo-precio"].value);
                const cantidad = Number(form["nuevo-cantidad"].value);

                if (!concepto || !precioUnitario || !cantidad) {
                    alert("Completa concepto, precio y cantidad");
                    return;
                }

                const total = precioUnitario * cantidad;

                this.#bd.crearTrabajo(repId, {
                    concepto,
                    precioUnitario,
                    cantidad,
                    totalTrabajo: total
                });

                const r = this.#bd.obtenerReparacion(repId);
                this.getVista().innerHTML = this.generarHTMLFormularioReparacion(r, r.vehiculoId);

                return;
            }

            if (accion === "borrar-trabajo") {

                this.#bd.borrarTrabajo(btn.dataset.rep, btn.dataset.id);

                const r = this.#bd.obtenerReparacion(btn.dataset.rep);
                this.getVista().innerHTML = this.generarHTMLFormularioReparacion(r, r.vehiculoId);

                return;
            }


            // ===============================
            // FASE 3 — FILTROS GLOBALES
            // ===============================

            if (accion === "reparaciones-no-terminadas") {
                const reps = this.#bd.obtenerReparacionesPorFiltro("terminado", false);
                this.getVista().innerHTML = this.generarHTMLReparacionesGlobal(reps);
                return;
            }

            if (accion === "reparaciones-no-pagadas") {
                const reps = this.#bd.obtenerReparacionesPorFiltro("pagado", false);
                this.getVista().innerHTML = this.generarHTMLReparacionesGlobal(reps);
                this.mostrarBanner("Mostrando reparaciones NO pagadas");
                return;
            }

            if (accion === "presupuestos") {
                const reps = this.#bd.obtenerReparacionesPorFiltro("presupuesto", true);
                this.getVista().innerHTML = this.generarHTMLReparacionesGlobal(reps);
                return;
            }

            if (accion === "presupuestos-aprobados") {
                const reps = this.#bd.obtenerReparacionesPorFiltro("aprobada", true);
                this.getVista().innerHTML = this.generarHTMLReparacionesGlobal(reps);
                return;
            }

            if (accion === "presupuestos-no-aprobados") {
                const reps = this.#bd.obtenerReparacionesPorFiltro("aprobada", false);
                this.getVista().innerHTML = this.generarHTMLReparacionesGlobal(reps);
                return;
            }
            if (accion === "filtrar-reparaciones") {
                this.getVista().innerHTML =
                    this.generarHTMLPanelFiltros();

                return;
            }
            if (accion === "buscar-reparaciones") {
                this.getVista().innerHTML = this.generarHTMLBuscadorReparaciones();
                return;
            }

            if (accion === "reportes") {
                this.getVista().innerHTML = this.generarHTMLReportes();
                return;
            }
            if (accion === "exportar-json") {
                this.#bd.exportarJSON();
                return;
            }

            if (accion === "exportar-csv") {

                const opcion = prompt(
                    "¿Qué deseas exportar?\n" +
                    "1 = Vehículos\n" +
                    "2 = Reparaciones\n" +
                    "3 = Todo (vehículos + reparaciones)\n"
                );

                if (opcion === "1") this.#bd.exportarVehiculosCSV();
                else if (opcion === "2") this.#bd.exportarReparacionesCSV();
                else if (opcion === "3") {
                    this.#bd.exportarVehiculosCSV();
                    this.#bd.exportarReparacionesCSV();
                }

                return;
            }

        });

        document.addEventListener("click", e => {
            if (e.target.id !== "btn-aplicar-filtros") return;

            const estado = document.querySelector("#filtro-estado").value;
            const orden = document.querySelector("#orden-reps").value;

            let filtros = {};

            if (estado) {
                const [campo, valor] = estado.split("-");
                filtros[campo] = valor === "true";
            }

            // 1. Aplicar filtros
            let lista = this.#bd.filtrarReparacionesAvanzado(filtros);

            // 2. Aplicar ordenación
            lista = this.#bd.ordenarReparaciones(lista, orden);

            document.querySelector("#resultado-filtros").innerHTML =
                this.generarHTMLReparacionesGlobal(lista);
        });


        // SUBMITs delegados
        document.addEventListener("submit", e => {

            const form = e.target.closest("form[data-form]");
            if (!form) return;

            e.preventDefault();

            const datos = Object.fromEntries(new FormData(form).entries());
            const tipo = form.dataset.form;

            // CREAR
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
                this.pintarVehiculos();
                this.mostrarToast("Vehículo creado correctamente", "success");
                return;
            }

            // EDITAR
            if (tipo === "editar-vehiculo") {
                const v = this.#bd.obtenerVehiculo("vehiculoId", form.dataset.id)[0];

                v.matricula = datos.matricula;
                v.marca = datos.marca;
                v.modelo = datos.modelo;
                v.propietario.nombre = datos["propietario-nombre"];
                v.propietario.telefono = datos["propietario-telefono"];

                this.pintarVehiculos();
                return;
            }

            // BUSCAR
            if (tipo === "buscar") {
                const res = this.#bd.obtenerVehiculo(datos.tipo, datos.valor);
                document.querySelector("#resultado-busqueda").innerHTML =
                    this.generarHTMLVehiculos(res);
                return;
            }
            // ===============================
            // CREAR REPARACION
            // ===============================
            if (tipo === "crear-reparacion") {

                this.#bd.crearReparacion({
                    vehiculoId: Number(form.dataset.vehiculoid),
                    fecha: datos.fecha,
                    kilometros: Number(datos.kilometros),
                    descripcion: datos.descripcion,
                    terminado: !!datos.terminado,
                    pagado: !!datos.pagado,
                    presupuesto: !!datos.presupuesto,
                    aprobada: !!datos.aprobada,
                    trabajos: []
                });

                const v = this.#bd.obtenerVehiculo("vehiculoId", form.dataset.vehiculoid)[0];
                const reps = this.#bd.obtenerReparacionPorVehiculo(form.dataset.vehiculoid);

                this.getVista().innerHTML = this.generarHTMLListadoReparaciones(reps, v);
                return;
            }


            // ===============================
            // EDITAR REPARACION
            // ===============================
            if (tipo === "editar-reparacion") {

                const r = this.#bd.obtenerReparacion(form.dataset.id);

                r.fecha = datos.fecha;
                r.kilometros = Number(datos.kilometros);
                r.descripcion = datos.descripcion;
                r.terminado = !!datos.terminado;
                r.pagado = !!datos.pagado;
                r.presupuesto = !!datos.presupuesto;
                r.aprobada = !!datos.aprobada;

                const v = this.#bd.obtenerVehiculo("vehiculoId", r.vehiculoId)[0];
                const reps = this.#bd.obtenerReparacionPorVehiculo(r.vehiculoId);

                this.getVista().innerHTML = this.generarHTMLListadoReparaciones(reps, v);
                return;
            }



        });

        document.addEventListener("input", e => {
            if (e.target.id !== "buscador-rep") return;

            const text = e.target.value.toLowerCase();

            const reps = this.#bd.obtenerReparacionesPorFiltro(text);

            document.querySelector("#resultado-global-rep").innerHTML =
                this.generarHTMLReparacionesGlobal(reps);
        });

        document.addEventListener("input", e => {

            if (e.target.id !== "buscador-global") return;

            const texto = e.target.value;

            const resultados = this.#bd.buscarReparacionesGlobal(texto);

            document.querySelector("#resultado-busqueda-global").innerHTML =
                this.generarHTMLReparacionesGlobal(resultados);
        });



    }
}
