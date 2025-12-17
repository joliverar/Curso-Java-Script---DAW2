const formulario = document.forms['miformulario'];
const resultado = document.getElementById("resultado");
const btnEnviar = document.getElementById("btnEnviar");

// Acceso rápido a cada campo
const campos = {
    nombre: formulario.elements['nombre'],
    correo: formulario.elements['correo'],
    password: formulario.elements['password'],
    confirmar: formulario.elements['confirmar'],
    fecha: formulario.elements['fecha'],
    telefono: formulario.elements['telefono'],
    genero: formulario.elements['genero'],
    terminos: formulario.elements['terminos']
};

function error(campo, msg) {
    campo.classList.add("mal");
    campo.classList.remove("ok");
    campo.parentElement.querySelector('.error').textContent = msg;
}

function ok(campo) {
    campo.classList.add("ok");
    campo.classList.remove("mal");
    campo.parentElement.querySelector('.error').textContent = "";
}

//validaciones

function validarNombre() {
    let v = campos.nombre.value.trim();
    if (v.length < 3) return error(campos.nombre, "Min 3 caracteres");
    if (/\d/.test(v)) return error(campos.nombre, "No números");
    ok(campos.nombre); return true;



}

function validarCorreo() {
    let v = campos.correo.value.trim();
    let r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!r.test(v)) return error(campos.correo, "Correo inválido");
    ok(campos.correo); return true;
}

function validarPassword(){
    let p = campos.password.value.trim();
    if(p.length < 8) return error(campos.password, "Minimo 8 caracteres");
    ok(campos.password); return true;
}

function validarConfirmar(){
    let t = campos.confirmar.value.trim();
    if(t.length < 8  ) return error(campos.confirmar, "Minimo 8 caracteres");
    ok(campos.confirmar); return true;
}

function validarFecha() {
    const f = new Date(campos.fecha.value);
    const hoy = new Date();
    const edad = hoy.getFullYear() - f.getFullYear();
    if (edad < 16) return error(campos.fecha, "Debe tener 16 años");
    ok(campos.fecha); return true;
}


function validarGenero() {
    if (!campos.genero.value) return error(campos.genero, "Seleccione uno");
    ok(campos.genero); return true;

}

function validarTerminos() {
    if (!campos.terminos.checked) return error(campos.terminos, "Debe aceptar");
    ok(campos.terminos); return true;
}


// ----------------- VALIDACIÓN GLOBAL ----------------------

function validarTodo() {
    const esOK =
        validarNombre() &&
        validarPassword() &&
        validarConfirmar() &&
        validarCorreo() &&
        validarFecha() &&
        validarTelefono() &&
        validarGenero() &&
        validarTerminos();

    btnEnviar.disabled = !esOK;
    return esOK;
}

// Escuchar en tiempo real
Object.values(campos).forEach(c =>
    c.addEventListener("input", validarTodo)
);
campos.terminos.addEventListener("change", validarTodo);

// ----------------- ENVÍO FINAL ----------------------

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validarTodo()) return;

    resultado.innerHTML = `
        <h3 style="color:green">Registro exitoso</h3>
        <pre>${JSON.stringify({
            nombre: campos.nombre.value,
            password: campos.password.value,
            confirmar: campos.confirmar.value,
            correo: campos.correo.value,
            fecha: campos.fecha.value,
            telefono: campos.telefono.value,
            genero: campos.genero.value
        }, null, 2)}</pre>
    `;
});

