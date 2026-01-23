const negocio = (function () {
  console.log("Cargando negocio");

  const modulos = [
    { id: 1, nombre: "Diseño de interfaces web", horas: 5 },
    { id: 2, nombre: "Desarrollo web en entorno cliente", horas: 9 },
    { id: 3, nombre: "Despliegue de aplicaciones web", horas: 6 },
  ];

  async function obtenerModulos() {
    return modulos;
  }

  async function obtenerModulo(id) {
    for (let modulo of modulos) {
      if (modulo.id == id) {
        return modulo;
      }
    }
    return null;
  }

  async function actualizarModulo(modulo) {
    if ("id" in modulo) {
      let moduloBD = await obtenerModulo(modulo.id);
      if (moduloBD) {
        moduloBD.nombre = modulo.nombre;
        moduloBD.horas = modulo.horas;
      }
    }
  }

  return {
    obtenerModulos,
    obtenerModulo,
    actualizarModulo,
  };
})();

export default negocio;
