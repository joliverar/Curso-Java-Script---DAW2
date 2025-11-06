'use strict';

let $carage = (function(){

  let vehiculos = [
    { id: 1, matricula: "1234ABC", marca: "Seat", modelo: "Ibiza", kilometros: 72000, precio: 8500 },
    { id: 2, matricula: "5678XYZ", marca: "Ford", modelo: "Focus", kilometros: 98000, precio: 9100 },
    { id: 3, matricula: "1111BBB", marca: "Seat", modelo: "León", kilometros: 35000, precio: 14500 },
    { id: 4, matricula: "2222CCC", marca: "Toyota", modelo: "Yaris", kilometros: 41000, precio: 12800 },
    { id: 5, matricula: "3333DDD", marca: "Peugeot", modelo: "308", kilometros: 55000, precio: 10200 },
    { id: 6, matricula: "4444EEE", marca: "Ford", modelo: "Fiesta", kilometros: 64000, precio: 7800 }
  ];

  // Vehículos económicos
  function economicos(lista = vehiculos){
    return lista
      .filter(a => a.precio < 10000)
      .map(a => ({marca: a.marca, modelo: a.modelo, precio: a.precio}))
      .sort((a,b) => a.marca.localeCompare(b.marca));
  }

  // Estadísticas
  function estadisticas(lista = vehiculos){
    let marcas = {};

    for (const v of lista) {
      let {marca, kilometros, precio} = v;

      if (!marcas[marca]) {
        marcas[marca] = {sumaPrecio: 0, sumKm: 0, cantidad: 0};
      }

      marcas[marca].sumaPrecio += precio;
      marcas[marca].sumKm += kilometros;
      marcas[marca].cantidad++;
    }

    let resultado = [];
    for (const marca in marcas) {
      let dato = marcas[marca];
      resultado.push({
        marca: marca,
        precioMedio: +(dato.sumaPrecio / dato.cantidad).toFixed(2),
        kmMedio: +(dato.sumKm / dato.cantidad).toFixed(2)
      });
    }

    resultado.sort((a,b) => b.kmMedio - a.kmMedio);
    return resultado;
  }

  // CRUD
  function addVehiculo(nuevo){
    vehiculos.push(nuevo);
  }

  function buscarVehiculo(matricula){
    return vehiculos.find(a => a.matricula === matricula) || null;
  }

  function eliminarVehiculo(matricula){
    let index = vehiculos.findIndex(a => a.matricula === matricula);
    if (index !== -1) vehiculos.splice(index, 1);
  }

  // Exportar e importar
  function exportarJSON(){
    return JSON.stringify(vehiculos, null, 2);
  }

  function cargarDatos(cadena){
    try {
      let datos = JSON.parse(cadena);
      if (!Array.isArray(datos)) throw new Error("No es un array");
      vehiculos = datos;
      console.log("✅ Los datos se cargaron correctamente");
    } catch (error) {
      console.error("❌ Error al cargar datos:", error.message);
    }
  }

  return {
    economicos,
    estadisticas,
    addVehiculo,
    buscarVehiculo,
    eliminarVehiculo,
    exportarJSON,
    cargarDatos
  };

})();

// 🔍 Pruebas
console.table($carage.economicos());
console.table($carage.estadisticas());
$carage.addVehiculo({ id: 7, matricula: "9999ZZZ", marca: "Ford", modelo: "Puma", kilometros: 30000, precio: 11000 });
console.log($carage.buscarVehiculo("9999ZZZ"));
$carage.eliminarVehiculo("5678XYZ");
console.log($carage.exportarJSON());
