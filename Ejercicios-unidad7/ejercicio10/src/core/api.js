/**
 * api.js
 * Centraliza el acceso a la API REST
 */

const API_URL = "http://127.0.0.1:8000/api/v1";

export async function apiGet(url) {
  const res = await fetch(API_URL + url);
  if (!res.ok) {
    throw new Error("Error al obtener datos");
  }
  return await res.json();
}

export async function apiPost(url, data) {
  const res = await fetch(API_URL + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Error al crear");
  }
  return await res.json();
}

export async function apiPut(url, data) {
  const res = await fetch(API_URL + url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Error al editar");
  }
  return await res.json();
}

export async function apiDelete(url) {
  const res = await fetch(API_URL + url, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error("Error al eliminar");
  }
  // Devolvemos true si fue exitoso; no se espera contenido normalmente
  return true;
}
