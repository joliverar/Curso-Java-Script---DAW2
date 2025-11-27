// -------------------------------------------------------------
// Clase NodoInspector
// Gestiona la navegación por el DOM y el resaltado del nodo
// -------------------------------------------------------------
class NodoInspector {

    #nodoActual; // nodo DOM actualmente seleccionado

    constructor(nodoInicial) {
        this.#crearEstiloResaltado();
        this.actualizarNodo(nodoInicial);
    }

    // Crea el estilo .resaltado dinámicamente en el <head>
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

    // Cambia de nodo: quita resaltado del anterior y añade al nuevo
    actualizarNodo(nuevoNodo) {

        // Quitar resaltado del nodo anterior
        if (this.#nodoActual) {
            this.#nodoActual.classList.toggle("resaltado", false);
        }

        // Cambiar referencia
        this.#nodoActual = nuevoNodo;

        // Añadir resaltado al nuevo nodo
        this.#nodoActual.classList.toggle("resaltado", true);
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

    get nodoActual() {
        return this.#nodoActual;
    }

    // ---- INFO ----
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

    // Limpieza final
    eliminarEstilo() {
        if (this.#nodoActual) {
            this.#nodoActual.classList.toggle("resaltado", false);
        }
        this.estilo.remove();
    }
}

// -------------------------------------------------------------
// IIFE $depurador
// Crea el panel flotante y maneja los botones del depurador
// -------------------------------------------------------------
const $depurador = (function () {

    let inspector = null;
    let panel = null;
    let areaInfo = null;

    function activarDepuracion() {

        // Seleccionar inicialmente <body>
        inspector = new NodoInspector(document.body);

        // Crear el panel flotante
        panel = document.createElement("div");
        panel.style.position = "fixed";
        panel.style.bottom = "10px";
        panel.style.right = "10px";
        panel.style.width = "260px";
        panel.style.padding = "10px";
        panel.style.background = "#f0f0f0";
        panel.style.border = "1px solid #888";
        panel.style.borderRadius = "6px";
        panel.style.boxShadow = "0 0 5px #333";
        panel.style.fontSize = "14px";
        panel.style.zIndex = "99999";

        document.body.appendChild(panel);

        // Crear los botones
        crearBoton("Raíz", () => inspector.actualizarNodo(document.documentElement));
        crearBoton("Padre", () => inspector.irPadre());
        crearBoton("Primer hijo", () => inspector.irPrimerHijo());
        crearBoton("Último hijo", () => inspector.irUltimoHijo());
        crearBoton("Hermano anterior", () => inspector.irAnteriorHermano());
        crearBoton("Hermano siguiente", () => inspector.irSiguienteHermano());

        // Área de información
        areaInfo = document.createElement("textarea");
        areaInfo.readOnly = true;
        areaInfo.style.width = "100%";
        areaInfo.style.marginTop = "8px";
        areaInfo.style.height = "110px";

        panel.appendChild(areaInfo);

        actualizarPanelInfo();
    }

    // Actualiza el área de texto con la info del nodo seleccionado
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

    function desactivarDepuracion() {
        if (panel) panel.remove();
        if (inspector) inspector.eliminarEstilo();
        inspector = null;
        panel = null;
        areaInfo = null;
    }

    return {
        activarDepuracion,
        desactivarDepuracion
    };

})();
