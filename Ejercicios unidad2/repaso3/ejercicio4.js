'use strict';


let $yedra = (function(){


let alumnos = [{ nombre: "Jino", nota: 1, modulo: "DWEC", convocatorias: 1}, 
                { nombre: "Ronald", nota: 4, modulo: "DWEC", convocatorias: 3},
                { nombre: "Ivan", nota: 1, modulo: "DWES", convocatorias: 1},
                { nombre: "Milan", nota: 4, modulo: "DWEC", convocatorias: 2},
                { nombre: "Alana", nota: 1, modulo: "DWES", convocatorias: 1},
                { nombre: "Gloria", nota: 6, modulo: "DWEC", convocatorias: 3},
];

function suspensos(lista = alumnos){

    let resultado = lista
            .filter(a => a<5)
            .map(a => [{nombre: a.nombre, nota: a.nota,modulo: a.modulo}])
            .sort((a,b) => a.nombre.localeCompare(b.nombre));

    return resultado;

}

function estadisticas(lista = alumnos){
    let agrupados = {};
   
    for (const alumno of lista) {
        
         let{modulo, nota, convocatorias}= alumno;
        if(!agrupados[modulo]){
             agrupados[modulo] = {sumaNotas:0, sumaConv:0, cantidad:0};
        }

        agrupados[modulo].sumaNotas +=nota;
        agrupados[modulo].sumaConv += convocatorias;
        agrupados[modulo].cantidad++;

    }

   
    for (const mod in agrupados) {
         let datos = agrupados[modulo];
         let res = [];
        return res.push({
            modulo: mod,
            mediaNotas: +(datos.sumaNotas/datos.cantidad).toFixed(2),
            mediaConv: +(datos.sumaConv/datos,cantidad).toFixed(2)
        })
        
    }

    res.sort((a,b) => b.mediaConv -a.mediaConv);

    return res;



}

function exportJSON(){
  return JSON.stringify(alumnos, null, 2);
}

function cargarDatos(cadena){
    try {
        let datos = JSON.parse(cadena);
        if(!Array.isArray(datos)) throw new Error("No es un array");
        alumnos = datos;
        console.log("Los datos fueron cargados correctamente");
    } catch (error) {
        console.log("Error al cargar los datos ", error.message)
    }
}

return{
    suspensos,
    estadisticas,
    exportJSON,
    cargarDatos
}


})();

console.log($yedra.suspensos());

console.log($yedra.estadisticas());

console.log($yedra.exportJSON());

let cad = '[{"Nombre:" "Jino", "Nota": 3, "modulo": "XYS", "convocatoria": 3}]';

$yedra.cargarDatos(cad);


console.log($yedra.suspensos());