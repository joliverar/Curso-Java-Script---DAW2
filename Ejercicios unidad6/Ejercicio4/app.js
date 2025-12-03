import alumnos from "./datos.js";

let modo = "tabla";
let seleccionado = null;
const contenedor = document.getElementById("contenedor");


// -------- CABECERA CON BOTONES --------
(function crearCabecera() {
    const cab = document.querySelector(".cabecera");

    const btnTabla = document.createElement("button");
    btnTabla.textContent = "Vista Detalles";
    btnTabla.onclick = () => cambiarModo("tabla");

    const btnFicha = document.createElement("button");
    btnFicha.textContent = "Vista Fichas";
    btnFicha.onclick = () => cambiarModo("ficha");

    cab.append(btnTabla, btnFicha);
})();


// -------------------------------------
// CAMBIO DE MODO
// -------------------------------------
function cambiarModo(nuevo) {
    modo = nuevo;
    seleccionado = null;
    contenedor.innerHTML = "";

    if (modo === "tabla") construirTablaDivs();
    else construirFichas();
}

function construirTablaDivs() {
    // Cabecera tipo tabla
    const head = document.createElement("div");
    head.className = "cabecera-tabla";
    ["Nombre", "Curso", "Teléfono", "Email"].forEach(t => {
        let c = document.createElement("div");
        c.className = "celda";
        c.textContent = t;
        head.appendChild(c);
    });
    contenedor.appendChild(head);

    alumnos.forEach(a => {
        const fila = document.createElement("div");
        fila.className = "fila";

        const cursoCorto = a.curso.length > 15 ? a.curso.slice(0, 15) + "..." : a.curso;
        const emailCorto = a.email.length > 20 ? a.email.slice(0, 20) + "..." : a.email;

        fila.innerHTML = `
            <div class="celda">${a.nombre}</div>
            <div class="celda">${cursoCorto}</div>
            <div class="celda">${a.telefono}</div>
            <div class="celda">${emailCorto}</div>
        `;

        fila.addEventListener("mouseenter", () => fila.classList.add("hover"));
        fila.addEventListener("mouseleave", () => fila.classList.remove("hover"));

        fila.addEventListener("click", () => seleccionar(fila));

        contenedor.appendChild(fila);



    });





}

function construirFichas() {
    const box = document.createElement("div");
    box.className = "contenedor-fichas";

    alumnos.forEach(a => {
        const ficha = document.createElement("div");
        ficha.className = "ficha";

        ficha.innerHTML = `
        <p>Nombre: ${a.nombre}</br>
          DNI: ${a.dni}</br>
        Curso: ${a.curso}</br>
        Asignaturas:<br>
        <ul>${a.asignaturas.map(s => `<li>${s}</li>`).join("")}</ul>
        Telefono: ${a.telefono}</br>
        Email: ${a.email}</br>
        </p>

        
    `;

    ficha.addEventListener("mouseleave", () => ficha.classList.remove("hover"));
    ficha.addEventListener("mouseenter", () => ficha.classList.add("hover"));
    ficha.addEventListener("click", () =>seleccionar(ficha));
    box.appendChild(ficha);
    });

    contenedor.appendChild(box);
}


function seleccionar(elem) {
    if (seleccionado)
        seleccionado.classList.remove("seleccionado");

    seleccionado = elem;
    seleccionado.classList.add("seleccionado");
}

