const alumnos = [
    { alumnoId: 1, nombre: "Ana López", ciclo: "DAW" },
    { alumnoId: 2, nombre: "Laura Sánchez", ciclo: "ASIR" },
    { alumnoId: 3, nombre: "Carlos Martínez", ciclo: "DAM" },
    { alumnoId: 4, nombre: "Juan Pérez", ciclo: "ASIR" },
    { alumnoId: 5, nombre: "Mario Gómez", ciclo: "DAW" },
    { alumnoId: 6, nombre: "Lucía Torres", ciclo: "DAM" },
    { alumnoId: 7, nombre: "Sofía Núñez", ciclo: "ASIR" },
    { alumnoId: 8, nombre: "Clara Sánchez", ciclo: "DAW" },
    { alumnoId: 9, nombre: "Manuel Díaz", ciclo: "DAM" },
    { alumnoId: 10, nombre: "Pedro Torres", ciclo: "DAW" },
    { alumnoId: 11, nombre: "Elena Ruiz", ciclo: "DAM" },
    { alumnoId: 12, nombre: "Álvaro Morales", ciclo: "ASIR" }
];

const colIzq = document.getElementById("colIzq");
const colDer = document.getElementById("colDer");
const filtro = document.getElementById("filtro");

let seleccionadoIzq = null;
let seleccionadoDer = null;

// ------------------------------------------------
// RECONSTRUIR IZQUIERDA DESDE CERO SIEMPRE
// ------------------------------------------------
function renderIzquierda() {
    colIzq.innerHTML = "";

    alumnos
        .filter(a => !estaEnDerecha(a.alumnoId))
        .filter(a => filtro.value === "Todos" || a.ciclo === filtro.value)
        .forEach(a => colIzq.appendChild(crearFilaIzquierda(a)));
}

// ------------------------------------------------
// REVISAR SI UN ALUMNO ESTÁ EN LA TABLA DERECHA
// ------------------------------------------------
function estaEnDerecha(id) {
    return [...colDer.children].some(fila => Number(fila.dataset.id) === id);
}

// ------------------------------------------------
// CREAR FILA IZQUIERDA
// ------------------------------------------------
function crearFilaIzquierda(a) {
    const fila = document.createElement("div");
    fila.className = "fila";
    fila.dataset.id = a.alumnoId;
    fila.dataset.nombre = a.nombre;
    fila.dataset.ciclo = a.ciclo;

    fila.innerHTML = `
        <span>${a.nombre}</span>
        <span>${a.ciclo}</span>
    `;

    fila.onclick = () => {
        if (seleccionadoIzq) seleccionadoIzq.classList.remove("seleccionado");
        seleccionadoIzq = fila;
        fila.classList.add("seleccionado");
    };

    return fila;
}

// ------------------------------------------------
// CREAR FILA DERECHA + SUBIR/BAJAR
// ------------------------------------------------
function crearFilaDerecha(a) {
    const fila = document.createElement("div");
    fila.className = "fila";
    fila.dataset.id = a.alumnoId;
    fila.dataset.nombre = a.nombre;
    fila.dataset.ciclo = a.ciclo;

    fila.innerHTML = `
        <span>${a.nombre}</span>
        <span>${a.ciclo}</span>
        <span>
            <button class="subir">↑</button>
            <button class="bajar">↓</button>
        </span>
    `;

    fila.onclick = () => {
        if (seleccionadoDer) seleccionadoDer.classList.remove("seleccionado");
        seleccionadoDer = fila;
        fila.classList.add("seleccionado");
    };

    fila.querySelector(".subir").onclick = (e) => {
        e.stopPropagation();
        const prev = fila.previousElementSibling;
        if (prev) colDer.insertBefore(fila, prev);
    };

    fila.querySelector(".bajar").onclick = (e) => {
        e.stopPropagation();
        const next = fila.nextElementSibling;
        if (next) colDer.insertBefore(next, fila);
    };

    return fila;
}

// ------------------------------------------------
// MOVER A LA DERECHA (CON appendChild)
// ------------------------------------------------
document.getElementById("btnDerecha").onclick = () => {
    if (!seleccionadoIzq) return;

    const a = {
        alumnoId: Number(seleccionadoIzq.dataset.id),
        nombre: seleccionadoIzq.dataset.nombre,
        ciclo: seleccionadoIzq.dataset.ciclo
    };

    colDer.appendChild(crearFilaDerecha(a));
    seleccionadoIzq = null;

    renderIzquierda();
};

// ------------------------------------------------
// MOVER A LA IZQUIERDA
// ------------------------------------------------
document.getElementById("btnIzquierda").onclick = () => {
    if (!seleccionadoDer) return;

    const cicloSel = seleccionadoDer.dataset.ciclo;

    // si ciclo incompatible → solo quitar
    if (filtro.value !== "Todos" && filtro.value !== cicloSel) {
        seleccionadoDer.remove();
        seleccionadoDer = null;
        renderIzquierda();
        return;
    }

    // mover a izquierda = quitar de derecha
    seleccionadoDer.remove();
    seleccionadoDer = null;
    renderIzquierda();
};

// ------------------------------------------------
// ENVÍO FINAL USANDO FORMDATA + INPUTS OCULTOS
// ------------------------------------------------
document.getElementById("btnEnviar").onclick = (e) => {
    e.preventDefault();

    const form = document.getElementById("formAlumnos");
    const hidden = document.getElementById("hiddenInputs");
    hidden.innerHTML = "";

    [...colDer.children].forEach((fila, i) => {
        crearHidden(hidden, "alumnoId[]", fila.dataset.id);
        crearHidden(hidden, "nombres[]", fila.dataset.nombre);
        crearHidden(hidden, "orden[]", i + 1);
    });

    const fd = new FormData(form);

    const resultado = {
        alumnoId: fd.getAll("alumnoId[]"),
        nombres: fd.getAll("nombres[]"),
        orden: fd.getAll("orden[]"),
    };

    document.getElementById("resultado").innerHTML =
        `<pre>${JSON.stringify(resultado, null, 2)}</pre>`;
};

// CREAR INPUT HIDDEN
function crearHidden(container, name, value) {
    const inp = document.createElement("input");
    inp.type = "hidden";
    inp.name = name;
    inp.value = value;
    container.appendChild(inp);
}

// Inicializar
renderIzquierda();


