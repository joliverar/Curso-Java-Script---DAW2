const form = document.getElementById("formRegistro");
const inputs = {
    nombre: document.getElementById("nombre"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    confirmPassword: document.getElementById("confirmPassword"),
    fechaNacimiento: document.getElementById("fechaNacimiento"),
    telefono: document.getElementById("telefono"),
    genero: document.getElementById("genero"),
    terminos: document.getElementById("terminos")
};

const btnEnviar = document.getElementById("btnEnviar");
const resultado = document.getElementById("resultado");

function mostrarError(campo, mensaje) {
    const small = campo.parentElement.querySelector(".error");
    small.textContent = mensaje;
    campo.classList.add("mal");
    campo.classList.remove("ok");
}

function mostrarOk(campo) {
    const small = campo.parentElement.querySelector(".error");
    small.textContent = "";
    campo.classList.add("ok");
    campo.classList.remove("mal");
}

// -------------------- VALIDACIONES --------------------

function validarNombre() {
    const v = inputs.nombre.value.trim();
    if (v.length < 3) return mostrarError(inputs.nombre, "Mínimo 3 caracteres");
    if (/\d/.test(v)) return mostrarError(inputs.nombre, "No puede contener números");
    mostrarOk(inputs.nombre);
    return true;
}

function validarEmail() {
    const v = inputs.email.value.trim();
    if (!v) return mostrarError(inputs.email, "El email es obligatorio");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(v)) return mostrarError(inputs.email, "Email inválido");
    mostrarOk(inputs.email);
    return true;
}

function validarPassword() {
    const v = inputs.password.value;
    if (v.length < 8) return mostrarError(inputs.password, "Mínimo 8 caracteres");
    if (!/[A-Z]/.test(v)) return mostrarError(inputs.password, "Debe incluir mayúscula");
    if (!/[0-9]/.test(v)) return mostrarError(inputs.password, "Debe incluir número");
    if (!/[^A-Za-z0-9]/.test(v)) return mostrarError(inputs.password, "Debe incluir carácter especial");
    mostrarOk(inputs.password);
    return true;
}

function validarConfirmPassword() {
    if (inputs.confirmPassword.value !== inputs.password.value)
        return mostrarError(inputs.confirmPassword, "Las contraseñas no coinciden");
    mostrarOk(inputs.confirmPassword);
    return true;
}

function validarFecha() {
    const fecha = new Date(inputs.fechaNacimiento.value);
    const ahora = new Date();
    const edad = ahora.getFullYear() - fecha.getFullYear();

    if (edad < 16) return mostrarError(inputs.fechaNacimiento, "Debes tener mínimo 16 años");
    mostrarOk(inputs.fechaNacimiento);
    return true;
}

function validarTelefono() {
    const v = inputs.telefono.value.trim();
    if (!v) return mostrarOk(inputs.telefono);
    if (!/^\d{9}$/.test(v)) return mostrarError(inputs.telefono, "Debe tener 9 números");
    mostrarOk(inputs.telefono);
    return true;
}

function validarGenero() {
    if (!inputs.genero.value)
        return mostrarError(inputs.genero, "Seleccione un género");
    mostrarOk(inputs.genero);
    return true;
}

function validarTerminos() {
    if (!inputs.terminos.checked)
        return mostrarError(inputs.terminos, "Debe aceptar los términos");
    mostrarOk(inputs.terminos);
    return true;
}

// -------------------- VALIDACIÓN GLOBAL --------------------

function validarTodo() {
    const ok =
        validarNombre() &&
        validarEmail() &&
        validarPassword() &&
        validarConfirmPassword() &&
        validarFecha() &&
        validarTelefono() &&
        validarGenero() &&
        validarTerminos();

    btnEnviar.disabled = !ok;
    return ok;
}

// Escuchar cambios
Object.values(inputs).forEach(campo =>
    campo.addEventListener("input", validarTodo)
);

inputs.terminos.addEventListener("change", validarTodo);

// -------------------- ENVÍO FINAL --------------------

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validarTodo()) return;

    resultado.innerHTML = `
        <h3 style="color:green">Registro exitoso</h3>
        <pre>${JSON.stringify({
            nombre: inputs.nombre.value,
            email: inputs.email.value,
            fecha_nacimiento: inputs.fechaNacimiento.value,
            telefono: inputs.telefono.value,
            genero: inputs.genero.value
        }, null, 2)}</pre>
    `;
});
