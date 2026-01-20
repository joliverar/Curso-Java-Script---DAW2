"use strict";
console.log("JS cargado");

/* =========================
   SELECTORES DOM
========================= */

const userIdInput = document.querySelector("#userId");
const form = document.querySelector("#userForm");
const userList = document.querySelector("#usersList");
const formTitle = document.querySelector("#formTitle");
const searchInput = document.querySelector("#searchInput");
const filterRole = document.querySelector("#filterRole");
const orderBy = document.querySelector("#orderBy");

/* =========================
   ESTADO
========================= */

let users = [];

/* =========================
   ARRANQUE
========================= */

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado");
    users = loadUsers();
    console.log("Usuarios cargados:", users);
    renderUsers();
});

//en consola del navegador localStorage.getItem("users");

/* =========================
   EVENTOS
========================= */

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const user = Object.fromEntries(data.entries());

    if (user.id) {
        updateUser(user);
    } else {
        createUser(user);
    }

    form.reset();
    userIdInput.value = "";
    formTitle.textContent = "Alta de usuarios";

    saveUsers();
    renderUsers();
    console.log("Users después de crear:", users);
});


userList.addEventListener("click", (e) => {
    console.log("Click en:", e.target);
    const card = e.target.closest(".user");
    if (!card) return;

    const id = card.dataset.id;
    console.log("ID seleccionado:", id);

    if (e.target.classList.contains("btn--edit")) {
        loadUserToForm(id);
    }

    if (e.target.classList.contains("btn--delete")) {
        if (confirm("Desea eliminar")) {
            deleteUser(id);
        }
    }
    
});

searchInput.addEventListener("input", applyFilters);
filterRole.addEventListener("change", applyFilters);
orderBy.addEventListener("change", applyFilters);

/* =========================
   CRUD
========================= */

function createUser(user) {
    if (emailExists(user.email)) {
        alert("Email duplicado");
        return;
    }
    console.log("Creando usuario:", user);

    user.id = crypto.randomUUID();
    users = [...users, user];
}

function updateUser(user) {
    if (emailExists(user.email, user.id)) {
        alert("Email duplicado");
        return;
    }

    users = users.map(u => u.id === user.id ? user : u);
    console.log("Users después de editar:", users);

}

function deleteUser(id) {
    console.log("Eliminando ID:", id);
    users = users.filter(u => u.id !== id);
    console.log("Users después de borrar:", users);


    saveUsers();
    renderUsers();
}

/* =========================
   FILTROS
========================= */

function searchUsers(list, text) {
    if (!text) return list;

    const search = text.toLowerCase();

    return list.filter(user =>
        user.nombre.toLowerCase().includes(search) ||
        user.apellidos.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
    );
}

function filterUsersByRole(list, role) {
    if (!role) return list;
    return list.filter(user => user.rol === role);
}

function orderUsersBy(list, field) {
    if (!field) return list;

    return [...list].sort((a, b) =>
        a[field].localeCompare(b[field])
    );
}

function applyFilters() {
    let result = [...users];

      console.log("Filtro aplicado", {
        search: searchInput.value,
        role: filterRole.value,
        order: orderBy.value
    });
    result = searchUsers(result, searchInput.value);
    result = filterUsersByRole(result, filterRole.value);
    result = orderUsersBy(result, orderBy.value);

    console.log("Resultado filtrado:", result);

    renderUsers(result);
    
  

}

/* =========================
   RENDER
========================= */

function renderUsers(list = users) {
    userList.innerHTML = "";

    list.forEach(user => {
        const card = document.createElement("div");
        card.className = "user";
        card.dataset.id = user.id;

        card.innerHTML = `
            <div class="user__info">
                <span class="user__name">${user.nombre} ${user.apellidos}</span>
                <span>${user.email}</span>
                <span>${user.rol}</span>
            </div>
            <div class="user__actions">
                <span class="btn btn--edit">Editar</span>
                <span class="btn btn--delete">Eliminar</span>
            </div>
        `;

        userList.appendChild(card);
    });
    console.log("Renderizando:", list);

}

/* =========================
   AUXILIARES
========================= */

function loadUserToForm(id) {
    

    const user = users.find(u => u.id === id);
    console.log("Usuario a editar:", user);
    Object.entries(user).forEach(([key, value]) => {
        const field = form.querySelector(`[name="${key}"]`);
        if (field) field.value = value;
    });

    formTitle.textContent = "Editar usuario";
}

function emailExists(email, ignoreId = null) {
    return users.some(u => u.email === email && u.id !== ignoreId);
}

/* =========================
   LOCAL STORAGE
========================= */

function saveUsers() {
    
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Guardado en localStorage:", localStorage.getItem("users"));
}

function loadUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}
