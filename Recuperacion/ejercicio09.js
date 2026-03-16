'use strict';

/*9-Crea una función que reciba un número variable de parámetros y que los agrupe por tipo.
Después por cada tipo se mostrará el tipo y la colección de parámetros de ese tipo incluyendo
la posición original entre los parámetros.
Añade el código auxiliar necesario para probar la aplicación.*/

function agrupacion(...args) {
    let grupos = {};
    
    for (let i = 0; i < args.length; i++) {
        let tipo = typeof args[i];
        if (!grupos[tipo]) {
            grupos[tipo] = [];
        }

        let pos = grupos[tipo].length;

        grupos[tipo][pos] = {
            valor: args[i],
            posicion: i

        };
        
    }

    for (let tipo in grupos) {
        console.log("tipo", tipo);
        for (let i = 0; i < grupos[tipo].length; i++) {
            
            console.log("valor:", grupos[tipo][i].valor,
                "posicion", grupos[tipo][i].posicion
            );
        }
        console.log("--------------------");
    }
}

agrupacion(10, "Hola", true, 20, "JS", false, { a: 1 });