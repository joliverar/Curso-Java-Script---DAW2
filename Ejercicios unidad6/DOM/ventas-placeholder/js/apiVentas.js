const API_URL = "https://jsonplaceholder.typicode.com/posts";

/*
GET    /posts
POST   /posts
PUT    /posts/:id
DELETE /posts/:id
*/

export function obtenerVentas() {
    return fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error("Error al obtener");
            return res.json();
        });
}

export function crearVenta(venta) {
    return fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(venta)
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al crear");
        return res.json();
    });
}

export function actualizarVenta(venta) {
    return fetch(`${API_URL}/${venta.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(venta)
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al actualizar");
        return res.json();
    });
}

export function eliminarVenta(id) {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
}
