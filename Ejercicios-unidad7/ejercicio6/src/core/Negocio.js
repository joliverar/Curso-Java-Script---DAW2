const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function obtenerVentas() {
  const res = await fetch(`${API_URL}?_limit=5`);
  if (!res.ok) throw new Error("Error al obtener ventas");

  const data = await res.json();

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

export async function crearVenta(venta) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(venta)
  });
  if (!res.ok) throw new Error("Error al crear venta");
  return res.json();
}

export async function actualizarVenta(venta) {
  const res = await fetch(`${API_URL}/${venta.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(venta)
  });
  if (!res.ok) throw new Error("Error al actualizar venta");
  return res.json();
}

export async function eliminarVenta(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Error al eliminar venta");
}
