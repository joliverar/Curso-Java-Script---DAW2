// -----------------------------------------------
// Clase NodoInspector
// Encargada de moverse entre nodos del DOM
// y mantener aplicado el estilo resaltado
// -----------------------------------------------
class NodoInspector {

    #nodoActual; // nodo seleccionado

    constructor(nodoInicial) {
        this.#crearEstiloResaltado();
        this.actualizarNodo(nodoInicial);
    }

    // Estilo .resaltado añadido dinámicamente
    #crearEstiloResaltado() {
        this.estilo = document.createElement("style");
        this.estilo.textContent = `
            .resaltado {
                outline: 2px solid rgba(255, 0, 0, 0.9);
                background-color: rgba(255, 0, 0, 0.2);
            }
        `;
        document.head.appendChild(this.estilo);
    }

    // Quita resaltado del anterior y aplica al nuevo
    actualizarNodo(nuevoNodo) {
        if (this.#nodoActual) {
            this.#nodoActual.classList.remove("resaltado");
        }
        this.#nodoActual = nuevoNodo;
        this.#nodoActual.classList.add("resaltado");
    }

    // ---- GETTERS ----
    get esRaiz() {
        return this.#nodoActual === document.documentElement;
    }

    get esPrimerHijo() {
        return this.#nodoActual.parentElement &&
               this.#nodoActual === this.#nodoActual.parentElement.firstElementChild;
    }

    get esUltimoHijo() {
        return this.#nodoActual.parentElement &&
               this.#nodoActual === this.#nodoActual.parentElement.lastElementChild;
    }

    get tieneHijos() {
        return this.#nodoActual.children.length > 0;
    }

    // ---- INFO DEL NODO ----
    obtenerInfo() {
        return {
            etiqueta: this.#nodoActual.tagName.toLowerCase(),
            id: this.#nodoActual.id || "noid",
            clases: [...this.#nodoActual.classList],
            texto: this.#nodoActual.textContent.trim()
        };
    }

    // ---- MOVIMIENTOS ----

    irPadre() {
        if (this.#nodoActual.parentElement) {
            this.actualizarNodo(this.#nodoActual.parentElement);
        }
    }

    irPrimerHijo() {
        if (this.#nodoActual.firstElementChild) {
            this.actualizarNodo(this.#nodoActual.firstElementChild);
        }
    }

    irUltimoHijo() {
        if (this.#nodoActual.lastElementChild) {
            this.actualizarNodo(this.#nodoActual.lastElementChild);
        }
    }

    irAnteriorHermano() {
        if (this.#nodoActual.previousElementSibling) {
            this.actualizarNodo(this.#nodoActual.previousElementSibling);
        }
    }

    irSiguienteHermano() {
        if (this.#nodoActual.nextElementSibling) {
            this.actualizarNodo(this.#nodoActual.nextElementSibling);
        }
    }

    // Permitir acceso controlado desde el depurador
    get nodoActual() {
        return this.#nodoActual;
    }

    // Eliminar estilo cuando el depurador se desactiva
    eliminarEstilo() {
        this.#nodoActual.classList.remove("resaltado");
        this.estilo.remove();
    }
}


// ----------------------------------------------------------
// IIFE $depurador
// Se encarga de crear el panel flotante y manejar los botones
// ----------------------------------------------------------
const $depurador = (function () {

    let inspector = null;
    let panel = null;

    function activarDepuracion() {

        // Iniciar seleccionando el <body>
        inspector = new NodoInspector(document.body);

        // Crear panel flotante
        panel = document.createElement("div");
        panel.style.position = "fixed";
        panel.style.bottom = "10px";
        panel.style.right = "10px";
        panel.style.width = "260px";
        panel.style.padding = "10px";
        panel.style.background = "#f0f0f0";
        panel.style.border = "1px solid #999";
        panel.style.fontSize = "14px";
        panel.style.zIndex = "99999";
        panel.style.boxShadow = "0 0 5px #333";

        document.body.appendChild(panel);

        // Crear botones
        crearBoton("Raíz", () => inspector.actualizarNodo(document.documentElement));
        crearBoton("Padre", () => inspector.irPadre());
        crearBoton("Primer hijo", () => inspector.irPrimerHijo());
        crearBoton("Último hijo", () => inspector.irUltimoHijo());
        crearBoton("Hermano anterior", () => inspector.irAnteriorHermano());
        crearBoton("Hermano siguiente", () => inspector.irSiguienteHermano());

        // Área de información
        areaInfo = document.createElement("textarea");
        areaInfo.style.width = "100%";
        areaInfo.style.height = "100px";
        areaInfo.readOnly = true;
        panel.appendChild(areaInfo);

        actualizarPanelInfo();
    }

    function actualizarPanelInfo() {
        const info = inspector.obtenerInfo();
        areaInfo.value =
            `Etiqueta: ${info.etiqueta}\n` +
            `ID: ${info.id}\n` +
            `Clases: ${info.clases.join(", ") || "ninguna"}\n` +
            `Texto: ${info.texto}`;
    }

    // Crea un botón sin usar IDs
    function crearBoton(texto, accion) {
        const btn = document.createElement("button");
        btn.textContent = texto;
        btn.style.margin = "2px";
        btn.addEventListener("click", () => {
            accion();
            actualizarPanelInfo();
        });
        panel.appendChild(btn);
    }

    // Eliminar todo
    function desactivarDepuracion() {
        if (panel) panel.remove();
        if (inspector) inspector.eliminarEstilo();
        inspector = null;
    }

    return {
        activarDepuracion,
        desactivarDepuracion
    };

})();
