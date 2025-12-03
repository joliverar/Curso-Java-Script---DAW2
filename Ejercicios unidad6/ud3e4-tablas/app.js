const alumnos = [
    { nombre:"Ana López", dni:"12345678A", curso:"2º Desarrollo Web",
      asignaturas:["HTML","CSS","JavaScript","React"],
      telefono:"600123456", email:"ana.lopez@example.com" },

    { nombre:"Carlos Martínez", dni:"23456789B", curso:"1º Administración de Sistemas",
      asignaturas:["Linux","Redes","Hardware"],
      telefono:"650987654", email:"carlos.martinez@example.com" },

    { nombre:"Laura Sánchez", dni:"34567890C", curso:"3º Diseño Gráfico",
      asignaturas:["Photoshop","Illustrator","UX Design"],
      telefono:"620111222", email:"laura.sanchez@example.com" },

    { nombre:"Mario Gómez", dni:"45678901D", curso:"1º Inteligencia Artificial",
      asignaturas:["Python","Machine Learning","Data Science"],
      telefono:"670555444", email:"mario.gomez@example.com" }
];

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

cambiarModo("tabla");

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

// -------------------------------------
// TABLA CON DIVS Y FLEXBOX
// -------------------------------------
function construirTablaDivs() {
    // Cabecera tipo tabla
    const head = document.createElement("div");
    head.className = "cabecera-tabla";
    ["Nombre","Curso","Teléfono","Email"].forEach(t => {
        let c = document.createElement("div");
        c.className = "celda";
        c.textContent = t;
        head.appendChild(c);
    });
    contenedor.appendChild(head);

    alumnos.forEach(a => {
        const fila = document.createElement("div");
        fila.className = "fila";

        const cursoCorto = a.curso.length > 15 ? a.curso.slice(0,15)+"..." : a.curso;
        const emailCorto = a.email.length > 20 ? a.email.slice(0,20)+"..." : a.email;

        fila.innerHTML = `
            <div class="celda">${a.nombre}</div>
            <div class="celda">${cursoCorto}</div>
            <div class="celda">${a.telefono}</div>
            <div class="celda">${emailCorto}</div>
        `;

        fila.addEventListener("mouseenter", ()=> fila.classList.add("hover"));
        fila.addEventListener("mouseleave", ()=> fila.classList.remove("hover"));

        fila.addEventListener("click", () => seleccionar(fila));

        contenedor.appendChild(fila);
    });
}

// -------------------------------------
// FICHAS
// -------------------------------------
function construirFichas() {
    const box = document.createElement("div");
    box.className = "contenedor-fichas";

    alumnos.forEach(a => {

        const card = document.createElement("div");
        card.className = "ficha";

        card.innerHTML = `
            <strong>${a.nombre}</strong><br>
            DNI: ${a.dni}<br>
            Curso: ${a.curso}<br><br>
            Asignaturas:<br>
            <ul>${a.asignaturas.map(s => `<li>${s}</li>`).join("")}</ul>
            Tel: ${a.telefono}<br>
            Email: ${a.email}
        `;

        card.addEventListener("mouseenter", ()=> card.classList.add("hover"));
        card.addEventListener("mouseleave", ()=> card.classList.remove("hover"));

        card.addEventListener("click", () => seleccionar(card));

        box.appendChild(card);
    });

    contenedor.appendChild(box);
}

// -------------------------------------
// SELECCIÓN ÚNICA
// -------------------------------------
function seleccionar(elem) {
    if (seleccionado)
        seleccionado.classList.remove("seleccionado");

    seleccionado = elem;
    seleccionado.classList.add("seleccionado");
}

