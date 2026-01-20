// Clave donde se guardarán las tareas en LocalStorage
const CLAVE_TAREAS = "tareas";

/**
 * Carga las tareas desde LocalStorage
 * Es async para mantener el mismo patrón que una API real
 */
async function cargaTareas() {
  // Recuperamos el texto almacenado
  const datos = localStorage.getItem(CLAVE_TAREAS);

  // Si no hay datos guardados, devolvemos un array vacío
  if (!datos) return [];

  // Convertimos el texto JSON a objeto JavaScript
  return JSON.parse(datos);
}

/**
 * Guarda el array de tareas en LocalStorage
 * @param {Array} tareas
 */
async function guardarTareas(tareas) {
  // Convertimos el array en texto JSON y lo almacenamos
  localStorage.setItem(CLAVE_TAREAS, JSON.stringify(tareas));
}

// Exportamos las funciones para usarlas en los componentes
export { cargaTareas, guardarTareas };
