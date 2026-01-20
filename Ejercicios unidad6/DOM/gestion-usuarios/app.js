"use strict"; 
// Activa el modo estricto de JavaScript para evitar errores comunes
// (por ejemplo, usar variables sin declararlas)

/* =========================
   REFERENCIAS AL DOM
========================= */

// Selecciona el formulario de usuarios
const form = document.querySelector("#userForm");

// Selecciona el contenedor donde se pintarán los usuarios
const usersList = document.querySelector("#usersList");

// Selecciona el título del formulario (Alta / Edición)
const formTitle = document.querySelector("#formTitle");

// Selecciona el input oculto donde guardamos el id del usuario
const userIdInput = document.querySelector("#userId");

// Array donde se almacenan los usuarios en memoria
let users = [];

/* =========================
   CARGA INICIAL DE LA APP
========================= */

// Se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {

    // Cargamos los usuarios guardados en localStorage
    users = loadUsers();

    // Pintamos los usuarios en pantalla
    renderUsers();
});

/* =========================
   EVENTO SUBMIT DEL FORM
========================= */

// Escuchamos el envío del formulario
form.addEventListener("submit", (e) => {

    // Evita que el formulario recargue la página
    e.preventDefault();

    // Creamos un objeto FormData con los datos del formulario
    const data = new FormData(form);

    // Convertimos FormData en un objeto normal { clave: valor }
    const user = Object.fromEntries(data.entries());

    // Si el usuario tiene id, es una edición
    if (user.id) {
        updateUser(user);
    } else {
        // Si no tiene id, es un alta nueva
        createUser(user);
    }

    // Limpiamos el formulario
    form.reset();

    // Vaciamos el input oculto del id
    userIdInput.value = "";

    // Volvemos el título del formulario a "Alta"
    formTitle.textContent = "Alta de usuario";

    // Guardamos los cambios en localStorage
    saveUsers();

    // Repintamos la lista de usuarios
    renderUsers();
});

/* =========================
   FUNCIONES CRUD
========================= */

// Función para crear un nuevo usuario
function createUser(user) {

    // Comprobamos si el email ya existe
    if (emailExists(user.email)) {
        alert("Email duplicado");
        return;
    }

    // Generamos un identificador único
    user.id = crypto.randomUUID();

    // Añadimos el usuario al array SIN usar push
    users = [...users, user];
}

// Función para modificar un usuario existente
function updateUser(user) {

    // Comprobamos si el email ya existe en otro usuario
    if (emailExists(user.email, user.id)) {
        alert("Email duplicado");
        return;
    }

    // Reemplazamos el usuario modificado usando map
    users = users.map(u => u.id === user.id ? user : u);
}

// Función para eliminar un usuario
function deleteUser(id) {

    // Filtramos el array quitando el usuario con ese id
    users = users.filter(u => u.id !== id);

    // Guardamos los cambios
    saveUsers();

    // Repintamos la lista
    renderUsers();
}

/* =========================
   RENDERIZADO DE USUARIOS
========================= */

// Función que pinta todos los usuarios en pantalla
function renderUsers() {

    // Limpiamos el contenedor antes de pintar
    usersList.innerHTML = "";

    // Recorremos el array de usuarios
    users.forEach(user => {

        // Creamos un div para cada usuario
        const card = document.createElement("div");

        // Añadimos la clase BEM
        card.className = "user";

        // Guardamos el id en un data-id
        card.dataset.id = user.id;

        // Insertamos el contenido HTML del usuario
        card.innerHTML = `
            <div class="user__info">
                <span class="user__name">${user.nombre} ${user.apellidos}</span>
                <span>${user.email}</span>
                <span>${user.rol}</span>
            </div>
            <div class="user__actions">
                <button class="btn btn--edit">Editar</button>
                <button class="btn btn--delete">Eliminar</button>
            </div>
        `;

        // Añadimos el usuario al DOM usando appendChild
        usersList.appendChild(card);
    });
}

/* =========================
   DELEGACIÓN DE EVENTOS
========================= */

// Escuchamos los clicks en el contenedor de usuarios
usersList.addEventListener("click", (e) => {

    // Buscamos el elemento .user más cercano al click
    const card = e.target.closest(".user");

    // Si no se ha hecho click dentro de un usuario, salimos
    if (!card) return;

    // Obtenemos el id desde data-id
    const id = card.dataset.id;

    // Si se pulsa el botón editar
    if (e.target.classList.contains("btn--edit")) {
        loadUserToForm(id);
    }

    // Si se pulsa el botón eliminar
    if (e.target.classList.contains("btn--delete")) {
        if (confirm("¿Eliminar usuario?")) {
            deleteUser(id);
        }
    }
});

/* =========================
   FUNCIONES AUXILIARES
========================= */

// Carga un usuario en el formulario para editarlo
function loadUserToForm(id) {

    // Buscamos el usuario por id
    const user = users.find(u => u.id === id);

    // Recorremos las propiedades del usuario
    Object.entries(user).forEach(([key, value]) => {

        // Buscamos el campo del formulario con ese name
        const field = form.querySelector(`[name="${key}"]`);

        // Si existe, asignamos el valor
        if (field) field.value = value;
    });

    // Cambiamos el título del formulario
    formTitle.textContent = "Editar usuario";
}

// Comprueba si un email ya existe
function emailExists(email, ignoreId = null) {

    // Devuelve true si encuentra un email repetido
    return users.some(u =>
        u.email === email && u.id !== ignoreId
    );
}

/* =========================
   LOCAL STORAGE
========================= */

// Guarda el array de usuarios en localStorage
function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

// Carga los usuarios desde localStorage
function loadUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}


