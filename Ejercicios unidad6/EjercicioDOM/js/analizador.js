// Módulo auto-invocado (IIFE)
// Deja visibles solo dos funciones: obtenerEstructuraJSON e imprimirEstructura
const AnalizadorDOM = (function () {

    /**
     * Procesa un nodo del DOM y devuelve su información en formato JSON.
     * Es una función RECURSIVA: si encuentra hijos, vuelve a llamarse.
     */
    function procesarNodo(nodo) {

        // Obtener texto solo si es un texto directo
        let textoNodo = "";
        if (nodo.childNodes.length === 1 && nodo.childNodes[0].nodeType === 3) {
            textoNodo = nodo.textContent.trim();
        }

        // Obtener atributos data-*
        let dataAtributos = {};
        if (nodo.attributes) {
            for (let atributo of nodo.attributes) {
                if (atributo.name.startsWith("data-")) {
                    let nombreData = atributo.name.replace("data-", "");
                    dataAtributos[nombreData] = atributo.value;
                }
            }
        }

        // Obtener lista de clases
        let clases = [];
        if (nodo.classList) {
            clases = Array.from(nodo.classList);
        }

        // Obtener hijos elemento y procesarlos recursivamente
        let hijosProcesados = [];
        for (let hijo of nodo.children) {
            hijosProcesados.push(procesarNodo(hijo));
        }

        // Estructura JSON del nodo
        return {
            etiqueta: nodo.tagName.toLowerCase(),
            texto: textoNodo,
            tieneId: nodo.id ? true : false,
            lstClass: clases,
            lstData: dataAtributos,
            lstHijos: hijosProcesados
        };
    }

    /**
     * Función pública que devuelve la estructura del DOM en JSON.
     */
    function obtenerEstructuraJSON() {
        return procesarNodo(document.body);
    }

    /**
     * Función pública que imprime el camino desde <html> hasta el nodo indicado.
     * Ejemplo de salida:
     * div-miCaja-clase1-clase2-Texto del nodo
     */
    function imprimirEstructura(selector) {
        let nodo = document.querySelector(selector);

        if (!nodo) {
            console.warn("No se encontró el selector:", selector);
            return;
        }

        let resultado = "";

        // Recorre hacia arriba: nodo → padre → padre → ... → html
        while (nodo) {
            if (nodo.nodeType === 1) { // Solo ELEMENT_NODE
                let etiqueta = nodo.tagName.toLowerCase();
                let id = nodo.id || "noid";
                let clases = nodo.classList.length > 0 
                             ? Array.from(nodo.classList).join("-")
                             : "noclass";
                let texto = nodo.textContent.trim().replace(/\s+/g, " ");

                // Construir parte de la línea
                let linea = `${etiqueta}-${id}-${clases}-${texto}\n`;

                // Se agrega al inicio para mantener el orden desde html → nodo
                resultado = linea + resultado;
            }

            nodo = nodo.parentNode; // subir un nivel
        }

        console.log(resultado);
    }

    // Exponer funciones públicas
    return {
        obtenerEstructuraJSON,
        imprimirEstructura
    };

})();
