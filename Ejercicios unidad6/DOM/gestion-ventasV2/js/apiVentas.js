const API_URL = "https://jsonplaceholder.typicode.com/posts";

/* GET */
export async function obtenerVentas() {
    const res = await fetch(`${API_URL}?_limit=5`);
    if (!res.ok) throw new Error("Error al obtener ventas");

    const data = await res.json();

    // 🔑 AQUÍ ESTÁ LA CLAVE
    return data.map(post => ({
        id: post.id.toString(),
        servicio: post.title,
        descripcion: post.body,
        cliente: "Cliente demo",
        monto: 30,
        email: "demo@email.com",
        estado: "Pendiente",
        fecha: new Date().toISOString().split("T")[0]
    }));
}

/* CREAR (ALTA) */
export async function crearVenta(venta) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(venta)
    });

    if (!res.ok) throw new Error("Error al crear venta");
    return await res.json();
}

/* ACTUALIZAR (MODIFICACIÓN) */
export async function actualizarVenta(venta) {
    const res = await fetch(`${API_URL}/${venta.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(venta)
    });

    if (!res.ok) throw new Error("Error al actualizar venta");
    return await res.json();
}

/* ELIMINAR (BAJA) */
export async function eliminarVenta(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Error al eliminar venta");
}
