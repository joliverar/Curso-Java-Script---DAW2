function query(sel) {
    return document.querySelector(sel);
}

function crearElemento(tag, clase = "", contenido = "") {
    const el = document.createElement(tag);
    if (clase) el.className = clase;
    if (contenido) el.innerHTML = contenido;
    return el;
}

function guardarLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function leerLS(key) {
    let x = localStorage.getItem(key);
    return x ? JSON.parse(x) : null;
}

function mostrarError(msg) {
    const div = query("#errores");
    div.innerHTML = `<p class="error">${msg}</p>`;
}

function leerParametroURL(name) {
    return new URLSearchParams(window.location.search).get(name);
}

function navegar(url) {
    window.location.href = url;
}
