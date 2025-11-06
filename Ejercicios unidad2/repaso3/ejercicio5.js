'use strict';

function bandera(n){
    let resultado =[];

    let mas ="+";
    let esp = " ";
    for (let i = 0; i < n; i++) {
       
        let fila = "";
        for (let j = 0; j < n; j++) {
             if(i===j || j=== n-i-1 || i === Math.floor(n/2) || j === Math.floor(n/2)){
                fila += mas;
             } else {
                fila += esp;
             }
            
        }

        resultado.push(fila);

       
        
    }

     return resultado.join("\n");
}

function rectangulo(ancho, alto){
        let resultado =[];

    let mas ="+";
    let esp = " ";

   
        resultado.push(mas.repeat(ancho))
        for (let j = 0; j < alto-2; j++) {
           resultado.push(mas +esp.repeat(ancho-2)+mas)
            
        }
        resultado.push(mas.repeat(ancho))
        

    return resultado.join("\n");
}

let res = bandera(15);
console.log(res);
let rec = rectangulo(5, 10);
console.log(rec);