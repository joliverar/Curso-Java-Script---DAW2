'use strick';

function jugarCartas(){

    let cartas = [];
    for (let i = 0; i < 10; i++) {
        cartas.push(i);
        
    }

    function robarCartas(){
        if(cartas.length === 0) return null;
        let index = Math.floor(Math.random()*cartas.length);
        return cartas.slice(index, 1)[0];


    }

    return function jugar(){
        let jugador = robarCartas();

        let maquina = robarCartas();

        if(jugador === null | maquina === null){
            return null;
        }

        return {jugador, maquina};
    };


}

let jugar = jugarCartas();
 let victoriasJ = 0; let victoriasM = 0, ronda =1;


while(true){
   const turno = jugar();
   if(!turno) break;

   const {jugador, maquina} = turno;

   console.log("Rutno "+turno+ "Jugador "+jugador+ " Maquina "+maquina);
   if(jugador < maquina) victoriasM++;
   if(jugador > maquina) victoriasJ++;

   ronda++;


}

console.log("\n Resultado final : MAquina "+victoriasJ+" Jugador "+victoriasM)