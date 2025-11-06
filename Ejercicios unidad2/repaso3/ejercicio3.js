'use strict';

function jugarDados(numLados){

    
    function aleatorio(){
        let num = Math.floor(Math.random()*numLados)+1; 
        return num;  

     }

    return function (){
        let dadoJugador = aleatorio();
        let dadoMaquina = aleatorio();

        return [dadoJugador, dadoMaquina];
    }


}

let numerosTiradas = parseInt(prompt("Ingrese el numero de tiradas", 7));

let numeroLados = parseInt(prompt("Ingrese el numero de lados", 5));

let tirarDados = jugarDados(numeroLados);

let resultado = "Resultado de cada tira\n\n ";
let totalJugador = 0;
let totalMaquina = 0;
for (let i = 1; i <= numerosTiradas; i++) {

    let [jugador, maquina] =  tirarDados();
    resultado += "Tirada "+i+ " Jugador "+jugador+ " Maquina "+maquina + "\n\n";

    
    if(jugador < maquina) totalMaquina++;
    if(jugador > maquina) totalJugador++;
    
}

resultado += "Total de victorias Jugador "+totalMaquina+ " \n"+ "Total de victoraias de maquina "+totalMaquina;

alert(resultado);
console.log(resultado);

