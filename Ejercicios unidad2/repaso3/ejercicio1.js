/* Ejercicio 1
Crea un closure llamado "jugarDados" que reciba como parámetro el número de lados de
los dados ("numeroLados").
Este closure deberá definir internamente una función que devuelva un valor aleatorio
entre 1 y el número de lados indicado.
Luego, el closure deberá devolver una función anónima que simule la tirada de dos dados,
devolviendo un array con ambos resultados.
A continuación, escribe un script para probar el closure que:
1. Solicite al usuario el número de lados de los dados y el número de tiradas mediante
prompts.
2. Utilice el closure para instanciar una función "tirarDados".
3. Realice la cantidad de tiradas indicada, comparando los resultados de la máquina y el
jugador.
4. Muestra cada resultado individual y, al final, el número total de victorias de cada uno
mediante alerts.
Una vez comprobado el código crea una página HTML que te permita jugar una partida de
dados contra la máquina. Debe gestionar al menos el número de lados del dado, el
número de tiradas de la partida, los resultados intermedios de las tiradas y el total de
cada jugador. El jugador humano deberá pulsar un botón cada vez que quiera tirar.
Organiza el código adecuadamente*/

function jugarDados(numeroLados){

    let num;
    function numeroAleatorio() {
        num = Math.floor(Math.random()*numeroLados)+1;
        return num;
    }

    return function(){
        let dadoJugador = numeroAleatorio();
        let dadoMaquina = numeroAleatorio();

        return [dadoJugador, dadoMaquina];
    };


}

let numLados = parseInt(prompt("Ingrese el numero de lados"));

let numTiradas = parseInt(prompt("Ingrese el numero de tiradas"));

let tirarDados = jugarDados(numLados);

let victoriasJugador = 0;
let victoriasMAquina = 0;
let resultado = "";

for (let i = 1; i <= numTiradas; i++) {
    
    let [jugador, maquina] = tirarDados();

    resultado += "tirada " +i+ " Jugador= "+jugador+" Maquina "+maquina+"\n";

    if (jugador > maquina) victoriasJugador++;
     else if (jugador < maquina) victoriasMAquina++;
}

let res = resultado+"\nResultado final\n\nJugador: "+victoriasJugador+ " Victorias\nMaquina "+victoriasMAquina+" Victorias";

alert(res);
console.log(res);

