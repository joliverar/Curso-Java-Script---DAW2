/*Vehículos económicos: devuelve un array con los vehículos cuyo precio sea menor de 10 000 €, mostrando solo marca, modelo y precio, ordenados alfabéticamente por marca.

Estadísticas por marca: calcula el precio medio y los kilómetros medios agrupando por marca, redondeando a dos decimales.

CRUD básico (añadir, buscar, eliminar):

Añadir un nuevo vehículo (recibe objeto).

Buscar por matrícula.

Eliminar por matrícula.

Exportar e importar JSON, con control de errores en la importación.

Todo debe estar contenido en una función autoinvocada y asignada a una constante $garage.*/



let $carage = (function(){




  let vehiculos = [
    { id: 1, matricula: "1234ABC", marca: "Seat", modelo: "Ibiza", kilometros: 72000, precio: 8500 },
    { id: 2, matricula: "5678XYZ", marca: "Ford", modelo: "Focus", kilometros: 98000, precio: 9100 },
    { id: 3, matricula: "1111BBB", marca: "Seat", modelo: "León", kilometros: 35000, precio: 14500 },
    { id: 4, matricula: "2222CCC", marca: "Toyota", modelo: "Yaris", kilometros: 41000, precio: 12800 },
    { id: 5, matricula: "3333DDD", marca: "Peugeot", modelo: "308", kilometros: 55000, precio: 10200 },
    { id: 6, matricula: "4444EEE", marca: "Ford", modelo: "Fiesta", kilometros: 64000, precio: 7800 }
  ];

  function economicos(lista = vehiculos){

    let resultado  = lista
        .filter(a => a.precio < 10000)
        .map(a => ({marca: a.marca, modelo: a.modelo, precio: a.precio}))
        .sort((a,b)=> a.marca.localeCompare(b.marca));

    return  resultado;

    
  }

  function economicos2(){
    let resultado = [];
    for (let i = 0; i < vehiculos.length; i++) {
         if(vehiculos[i].precio < 10000){
            resultado.push({ 
                marca: vehiculos[i].marca,
                modelo: vehiculos[i].modelo,
                precio: vehiculos[i].precio
            })
         }
        
    }
    return resultado;
  }


    function estadisticas2(lista = vehiculos){
    let marcas = {};

  

    for (const v of lista) {
         let  {marca, kilometros, precio} = v;
        if(!marcas[marca]){
            marcas[marca] = {sumaPrecio:0, sumKm:0, cantidad:0}
        }

        marcas[marca].sumaPrecio += precio;
        marcas[marca].sumKm += kilometros;
        marcas[marca].cantidad++;
    }


    let resultado = [];
    for (const marca in marcas) {
        let dato = marcas[marca];

        resultado.push({Marca: marca,
                            precioMedio: +(dato.sumaPrecio / dato.cantidad).toFixed(2),
kmMedio: +(dato.sumKm / dato.cantidad).toFixed(2)

        })
         
    }

    resultado.sort((a,b)=> b.kmMedio-a.kmMedio);
    return resultado;
  }
  function estadisticas(lista = vehiculos){
    let marcas = [];

  

    for (const v of lista) {
      
        if(!marcas[v.marca]){
            marcas[v.marca] = {sumaPrecio:0, sumKm:0, cantidad:0}
        }

        marcas[v.marca].sumaPrecio += precio;
        marcas[v.marca].sumKm += kilometros;
        marcas[v.marca].cantidad++;
    }

    

    let resultado = [];
    for (const marca in marcas) {
        let dato = marcas[marca];

        return resultado.push({Marca: marca,
                            precioMedio: +(dato.sumaPrecio / dato.cantidad).toFixed(2),
kmMedio: +(dato.sumKm / dato.cantidad).toFixed(2)

        })
         
    }

    resultado.sort((a,b)=> b.KmMedio -a.KmMedio);
  }

  function addVehiculo(nuevo){
    vehiculos.push(nuevo);
  }
  

  function buscarVehiculo(matricula){
    return vehiculos.find(a => a.matricula === matricula) || null;
  }

  function buscarVehiculo2(matricula){
    for (let i = 0; i < vehiculos.length; i++) {
         if(vehiculos[i].matricula === matricula){
            return vehiculos[i];
         }
         return null;
        
    }
  }
  function eliminarVehiculo(matricula){
    let index = vehiculos.findIndex(a=> a.matricula === matricula);
    if(index != -1){
        vehiculos.splice(index,1);
    }
  }

  function eliminarVehiculo2(matricula){
    for (let i = 0; i < vehiculos.length; i++) {
       if(vehiculos[i].matricula === matricula){
        vehiculos.splice(i,1);
        break;
       }
        
    }
  }

  function exportarJSON(){
    return JSON.stringify(vehiculos, null, 2);
  }

  function cargarDatos(cadena){
    try {
        let datos = JSON.parse(cadena);
        if(!Array.isArray(datos)) throw new Error("No es un array");
        
        vehiculos = datos;
        console.log("Los datos se cargaron correctamente");
    } catch (error) {
        console.error("Error al cargar datos ", error.message)
    }
  }
  return {
    economicos,
    exportarJSON,
    cargarDatos
  }
  })();

  console.log($garage.cargarDatos());