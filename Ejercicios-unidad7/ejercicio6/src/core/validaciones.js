const CLAVE = "usuarios";

export async function cargarUsuariosLS() {
  const datos = localStorage.getItem(CLAVE);
  if (!datos) return [];
  return JSON.parse(datos);
}

export async function guardarUsuariosLS(usuarios) {
  localStorage.setItem(CLAVE, JSON.stringify(usuarios));
}
