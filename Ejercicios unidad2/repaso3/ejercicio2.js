/*Ejercicio 2
A partir de un array de objetos JSON de tipo alumno (nombre, nota, modulo,
convocatorias), vamos a crear funciones para trabajar con JSON y arrays.
Formato de los datos:
• Propiedad nota debe estar en el rango de 0-10.
• Propiedad convocatorias debe estar en el rango de 1-4.
• Los nombres de los módulos son DWEC y DWES.
• Incluye 5 o 6 datos de prueba
1. Lista de alumnos suspensos: Crea una función que devuelva un array de JSON con los
alumnos que han suspendido (nota inferior a 5). El resultado debe incluir únicamente el
nombre, la nota y el módulo del alumno, y debe estar ordenado alfabéticamente por el
nombre del alumno.
2. Estadísticas por módulo: Crea una función que devuelva un array de JSON con el
nombre del módulo, la nota media y el número de convocatorias medio por módulo. El
2
resultado debe estar ordenado por el número de convocatorias medio en orden
descendente. Para calcular estas estadísticas:
- Primero, crea un objeto que agrupe los módulos y acumule las notas,
convocatorias y cantidad de alumnos por módulo.
- Luego, recorre los datos agrupados para calcular la nota media y las
convocatorias medias, truncando a dos decimales.
3. Función para devolver los datos en formato JSON: Implementa una función que
devuelva la cadena JSON con todos los datos de los alumnos.
4. Función para cargar una nueva cadena JSON: Implementa una función que permita
cargar una nueva cadena JSON. Utiliza un bloque `try-catch` para gestionar posibles
errores durante el parseo del JSON. Si la cadena no es válida o no es un array, muestra un
mensaje de error adecuado. Puedes comprobar si un objeto es un array con
Array.isArray(objeto).
Todo lo anterior debe estar contenido en una función autoinvocada y asociada a una
constante denominada $yedra.
Crea una página HTML que permita probar la funcionalidad requerida.
Organiza el código adecuadamente.*/

'use strict';

const $yedra = (function () {

  // Datos iniciales
  let alumnos = [
    { nombre: "Jino", nota: 5, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Ronald", nota: 4, modulo: "DWEC", convocatorias: 1 },
    { nombre: "Milan", nota: 6, modulo: "DWES", convocatorias: 2 },
    { nombre: "Gloria", nota: 3, modulo: "DWEC", convocatorias: 2 },
    { nombre: "Alana", nota: 2, modulo: "DWES", convocatorias: 3 },
    { nombre: "Juan", nota: 7, modulo: "DWEC", convocatorias: 1 }
  ];

  // 1️⃣ Lista de alumnos suspensos
  function suspensos(lista) {
    let resultado = lista
      .filter(a => a.nota < 5)
      .map(a => ({ nombre: a.nombre, nota: a.nota, modulo: a.modulo }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre));

    return resultado;
  }

  // 2️⃣ Estadísticas por módulo
  function estadisticas(lista) {
    let agrupado = {};

    // Agrupar datos por módulo
    for (const alumno of lista) {
      let { modulo, nota, convocatorias } = alumno;

      if (!agrupado[modulo]) {
        agrupado[modulo] = { totalNotas: 0, totalConv: 0, count: 0 };
      }

      agrupado[modulo].totalNotas += nota;
      agrupado[modulo].totalConv += convocatorias;
      agrupado[modulo].count++;
    }

    // Calcular promedios
    let resultado = [];
    for (const mod in agrupado) {
      let datos = agrupado[mod];
      resultado.push({
        modulo: mod,
        notaMedia: +(datos.totalNotas / datos.count).toFixed(2),
        convMedia: +(datos.totalConv / datos.count).toFixed(2)
      });
    }

    // Orden descendente por convocatorias medias
    resultado.sort((a, b) => b.convMedia - a.convMedia);
    return resultado;
  }

  // 3️⃣ Exportar datos como JSON
  function exportarJSON() {
    return JSON.stringify(alumnos, null, 2);
  }

  // 4️⃣ Cargar nueva cadena JSON con control de errores
  function cargarJSON(cadena) {
    try {
      const datos = JSON.parse(cadena);
      if (!Array.isArray(datos)) throw new Error("El JSON no es un array válido");
      alumnos = datos;
      console.log("✅ Datos cargados correctamente");
    } catch (error) {
      console.error("❌ Error al cargar JSON:", error.message);
    }
  }

  // Exponer funciones públicas
  return {
    suspensos,
    estadisticas,
    exportarJSON,
    cargarJSON
  };

})();



console.table($yedra.suspensos([
  { nombre: "Pedro", nota: 4, modulo: "DWES", convocatorias: 2 },
  { nombre: "Ana", nota: 8, modulo: "DWEC", convocatorias: 1 }
]));

console.table($yedra.estadisticas([
  { nombre: "Jino", nota: 5, modulo: "DWEC", convocatorias: 1 },
  { nombre: "Ronald", nota: 4, modulo: "DWEC", convocatorias: 2 },
  { nombre: "Milan", nota: 6, modulo: "DWES", convocatorias: 2 }
]));

console.log($yedra.exportarJSON());

$yedra.cargarJSON('[{"nombre":"Pedro","nota":8,"modulo":"DWES","convocatorias":1}]');
