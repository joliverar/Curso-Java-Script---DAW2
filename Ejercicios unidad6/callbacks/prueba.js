// -------------------------------------------------------------
// clase de error personalizada
// -------------------------------------------------------------
class ValidacionError extends Error {
    constructor(mensaje, campo) {
        super(mensaje);
        this.campo = campo;
    }
}

function marcarError(input) {
    input.classList.remove("ok");
    input.classList.add("error");
}

function marcarOk(input) {
    input.classList.remove("error");
    input.classList.add("ok");
}



// 1. Nombre
function validarNombre(valor, callback) {
    if (valor.length < 3) {
        callback(null, new ValidacionError("El nombre debe tener al menos 3 caracteres", "nombre"));
        return;
    }

    for (let c of valor) {
        if (c >= "0" && c <= "9") {
            callback(null, new ValidacionError("El nombre no puede contener números", "nombre"));
            return;
        }
    }

    callback(valor, null);
}

// 2. Contraseña
function validarPassword(valor, callback) {
    let mayus = false, minus = false, num = false;

    if (valor.length < 8) {
        callback(null, new ValidacionError("La contraseña debe tener mínimo 8 caracteres", "password"));
        return;
    }

    for (let c of valor) {
        if (c >= "A" && c <= "Z") mayus = true;
        if (c >= "a" && c <= "z") minus = true;
        if (c >= "0" && c <= "9") num = true;
    }

    if (!mayus) return callback(null, new ValidacionError("Debe tener mayúscula", "password"));
    if (!minus) return callback(null, new ValidacionError("Debe tener minúscula", "password"));
    if (!num) return callback(null, new ValidacionError("Debe tener número", "password"));

    callback(valor, null);
}

// 3. Email
function validarEmail(valor, callback) {
    let partes = valor.split("@");

    if (partes.length !== 2) {
        callback(null, new ValidacionError("Debe contener una sola @", "email"));
        return;
    }

    let antes = partes[0];
    let despues = partes[1];

    if (!antes || !despues) {
        callback(null, new ValidacionError("Debe haber texto antes y después de @", "email"));
        return;
    }

    let posPunto = despues.lastIndexOf(".");
    if (posPunto === -1) {
        callback(null, new ValidacionError("Debe terminar en .xx o .xxx", "email"));
        return;
    }

    let sufijo = despues.substring(posPunto + 1);

    if (sufijo.length < 2 || sufijo.length > 3) {
        callback(null, new ValidacionError("El sufijo debe tener 2 o 3 letras", "email"));
        return;
    }

    callback(valor, null);
}

// 4. Fecha (edad 18-24)
function validarFecha(valor, callback) {
    let hoy = new Date();
    let nac = new Date(valor);

    let edad = hoy.getFullYear() - nac.getFullYear();

    let mes = hoy.getMonth() - nac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nac.getDate())) {
        edad--;
    }

    if (edad < 18 || edad > 24) {
        callback(null, new ValidacionError("Debe tener entre 18 y 24 años", "fecha"));
        return;
    }

    callback(valor, null);
}

// -------------------------------------------------------------
// CONTROLADOR PRINCIPAL (INFIERNO DE CALLBACKS)
// -------------------------------------------------------------
const nombre = document.getElementById("nombre");
const password = document.getElementById("password");
const email = document.getElementById("email");
const fecha = document.getElementById("fecha");

document.getElementById("btn").onclick = function () {

    validarNombre(nombre.value, (v1, err1) => {
        if (err1) return manejarError(err1);
        marcarOk(nombre);

        validarPassword(password.value, (v2, err2) => {
            if (err2) return manejarError(err2);
            marcarOk(password);

            validarEmail(email.value, (v3, err3) => {
                if (err3) return manejarError(err3);
                marcarOk(email);

                validarFecha(fecha.value, (v4, err4) => {
                    if (err4) return manejarError(err4);
                    marcarOk(fecha);

                    // --------------------------
                    // FORMULARIO COMPLETAMENTE VÁLIDO
                    // --------------------------
                    alert("Formulario validado correctamente");

                    const datos = {
                        nombre: nombre.value,
                        password: password.value,
                        email: email.value,
                        fecha: fecha.value
                    };

                    localStorage.setItem("formulario", JSON.stringify(datos));
                });
            });
        });
    });
};

// -------------------------------------------------------------
// MARCAR ERROR Y MOSTRAR MENSAJE
// -------------------------------------------------------------
function manejarError(error) {
    alert(error.message);
    document.getElementById(error.campo).classList.add("error");
}

// -------------------------------------------------------------
// PRECARGAR DESDE LOCALSTORAGE
// -------------------------------------------------------------
window.onload = () => {
    let datos = localStorage.getItem("formulario");
    if (!datos) return;

    datos = JSON.parse(datos);

    nombre.value = datos.nombre;
    password.value = datos.password;
    email.value = datos.email;
    fecha.value = datos.fecha;
};