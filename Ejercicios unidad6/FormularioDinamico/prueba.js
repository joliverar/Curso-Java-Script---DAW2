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

let seleccionados = [];   // alumnos en la derecha
let seleccionadoIzq = null;
let seleccionadoDer = null;

// -------------------------------
// RENDERIZAR COLUMNAS
// -------------------------------

function renderIzquierda() {
    colIzq.innerHTML = "";

    alumnos
        .filter(a => !seleccionados.includes(a))
        .filter(a => filtro.value === "Todos" || a.ciclo === filtro.value)
        .forEach(a => {
            const fila = crearFilaIzquierda(a);
            colIzq.appendChild(fila);
        });
}

function renderDerecha() {
    colDer.innerHTML = "";

    seleccionados.forEach((a, i) => {
        const fila = crearFilaDerecha(a, i);
        colDer.appendChild(fila);
    });
}

// -------------------------------
// Fila de la izquierda
// -------------------------------

function crearFilaIzquierda(a) {
    const fila = document.createElement("div");
    fila.className = "fila";
    fila.innerHTML = `
        <span>${a.nombre}</span>
        <span>${a.ciclo}</span>
    `;

    fila.addEventListener("click", () => {
        if (seleccionadoIzq) seleccionadoIzq.classList.remove("seleccionado");
        fila.classList.add("seleccionado");
        seleccionadoIzq = fila;
        fila.dataset.id = a.alumnoId;
    });

    return fila;
}

// -------------------------------
// Fila de la derecha
// -------------------------------

function crearFilaDerecha(a, index) {
    const fila = document.createElement("div");
    fila.className = "fila";
    fila.innerHTML = `
        <span>${a.nombre}</span>
        <span>${a.ciclo}</span>
        <span class="botones-orden">
            <button class="subir">🔼</button>
            <button class="bajar">🔽</button>
        </span>
    `;

    fila.addEventListener("click", () => {
        if (seleccionadoDer) seleccionadoDer.classList.remove("seleccionado");
        fila.classList.add("seleccionado");
        seleccionadoDer = fila;
        fila.dataset.id = a.alumnoId;
    });

    fila.querySelector(".subir").addEventListener("click", (e) => {
        e.stopPropagation();
        if (index > 0) {
            [seleccionados[index], seleccionados[index - 1]] =
                [seleccionados[index - 1], seleccionados[index]];
            renderDerecha();
        }
    });

    fila.querySelector(".bajar").addEventListener("click", (e) => {
        e.stopPropagation();
        if (index < seleccionados.length - 1) {
            [seleccionados[index], seleccionados[index + 1]] =
                [seleccionados[index + 1], seleccionados[index]];
            renderDerecha();
        }
    });

    return fila;
}

// -------------------------------
// MOVER A LA DERECHA
// -------------------------------

document.getElementById("btnDerecha").addEventListener("click", () => {
    if (!seleccionadoIzq) return;

    const id = Number(seleccionadoIzq.dataset.id);
    const alumno = alumnos.find(a => a.alumnoId === id);

    seleccionados.push(alumno);

    seleccionadoIzq = null;

    renderIzquierda();
    renderDerecha();
});

// -------------------------------
// MOVER A LA IZQUIERDA
// -------------------------------

document.getElementById("btnIzquierda").addEventListener("click", () => {
    if (!seleccionadoDer) return;

    const id = Number(seleccionadoDer.dataset.id);
    const alumno = seleccionados.find(a => a.alumnoId === id);

    // Comprobación de compatibilidad
    if (filtro.value !== "Todos" && filtro.value !== alumno.ciclo) {
        // solo lo quitamos
        seleccionados = seleccionados.filter(a => a.alumnoId !== id);
    } else {
        // vuelve a izquierda
        seleccionados = seleccionados.filter(a => a.alumnoId !== id);
    }

    seleccionadoDer = null;
    renderIzquierda();
    renderDerecha();
});

// -------------------------------
// ENVÍO
// -------------------------------

document.getElementById("btnEnviar").addEventListener("click", (e) => {
    e.preventDefault();

    const json = {
        alumnoId: seleccionados.map(a => a.alumnoId),
        nombres: seleccionados.map(a => a.nombre),
        orden: seleccionados.map((a, i) => i + 1)
    };

    document.getElementById("resultado").innerHTML =
        `<pre>${JSON.stringify(json, null, 2)}</pre>`;
});


// Primera carga
renderIzquierda();
renderDerecha();
