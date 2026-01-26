// Patrón IIFE para simular una API
const negocio = (function () {
  console.log("Cargando negocio");

  // Datos simulados
  let modulos = [
    { id: 1, nombre: "Diseño de interfaces web", horas: 5 },
    { id: 2, nombre: "Desarrollo web en entorno cliente", horas: 9 },
    { id: 3, nombre: "Despliegue de aplicaciones web", horas: 6 },
  ];

  // Control del siguiente ID
  let nextID = 4;

  // Obtener todos los módulos
  async function obtenerModulos() {
    return modulos;
  }

  // Obtener un módulo por ID
  async function obtenerModulo(id) {
    for (let modulo of modulos) {
      if (modulo.id == id) return modulo;
    }
    return null;
  }

  // Crear un módulo
  async function crearModulo(modulo) {
    modulo.id = nextID++;
    modulos.push(modulo);
  }

  // Actualizar un módulo
  async function actualizarModulo(modulo) {
    for (let m of modulos) {
      if (m.id == modulo.id) {
        m.nombre = modulo.nombre;
        m.horas = modulo.horas;
      }
    }
  }

  // Borrar un módulo
  async function borrarModulo(id) {
    modulos = modulos.filter((m) => m.id != id);
  }

  // Buscar por nombre
  async function buscarModulos(texto) {
    return modulos.filter((m) =>
      m.nombre.toLowerCase().includes(texto.toLowerCase()),
    );
  }

  // Filtrar por rango de horas
  async function filtrarPorHoras(min, max) {
    let resultado = [];
    for (let m of modulos) {
      if (m.horas >= min && m.horas <= max) {
        resultado.push(m);
      }
    }
    return resultado;
  }

  // Ordenar por horas
  async function ordenarPorHorasAsc() {
    let copia = [...modulos];
    copia.sort(function (a, b) {
      if (a.horas > b.horas) return 1;
      if (a.horas < b.horas) return -1;
      return 0;
    });
    return copia;
  }

  // Ordenar por nombre
  async function ordenarPorNombre() {
    let copia = [...modulos];
    copia.sort(function (a, b) {
      if (a.nombre > b.nombre) return 1;
      if (a.nombre < b.nombre) return -1;
      return 0;
    });
    return copia;
  }

  return {
    obtenerModulos,
    obtenerModulo,
    crearModulo,
    actualizarModulo,
    borrarModulo,
    buscarModulos,
    filtrarPorHoras,
    ordenarPorHorasAsc,
    ordenarPorNombre,
  };
})();

export default negocio;
