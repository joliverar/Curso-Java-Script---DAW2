const API_URL = "http://127.0.0.1:8000/api/v1";

export async function apiGet(url) {
  const res = await fetch(API_URL + url);

  if (!res.ok) {
    throw new Error("Error al obtener api");
  }
  return res.json();
}
export async function apiPost(url, data) {
  const res = await fetch(API_URL + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al crear api");
  }
  return res.json();
}
export async function apiPut(url, data) {
  const res = await fetch(API_URL + url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar api");
  }
  return res.json();
}
export async function apiDelete(url) {
  const res = await fetch(API_URL + url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Error al eliminar api");
  }
  return true;
}
