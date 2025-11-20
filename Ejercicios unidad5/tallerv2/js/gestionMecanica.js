import { BD } from "./BD.js";

class gestionMecanica{
    #clienteBD;
    #contenedor;

    constructor() {
        this.#clienteBD = new BD();
    }

    // MÉTODO PÚBLICO
    iniciarApp(selector) {
        this.#contenedor = document.querySelector(selector);

        if (!this.#contenedor) {
            alert("No existe el contenedor");
            return;
        }

        this.#contenedor.innerHTML = this.#generarHTMLBase();
        this.#pintarInicio();
        this.#configurarEventos();
    }

    // ==========================
    // MÉTODOS PRIVADOS
    // ==========================

    #generarHTMLBase() { }

    #generarHTMLInicio() {  }

    #generarHTMLVehiculos(lista) {  }

    #pintarInicio() {
        document.querySelector("#vista").innerHTML = this.#generarHTMLInicio();
    }

    #configurarEventos() {  }
}