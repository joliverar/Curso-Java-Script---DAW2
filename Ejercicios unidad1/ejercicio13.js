'use strict';

/********************************************************************
 * ➕ EJERCICIO 13 — JUEGO DE MATES
 * Genera operaciones aleatorias (suma, resta, multiplicación, división)
 * y evalúa las respuestas del usuario en lotes de 4 preguntas.
 ********************************************************************/

function generarOperacion() {
  let a = Math.floor(Math.random() * 10) + 1;
  let b = Math.floor(Math.random() * 10) + 1;
  let operadores = ['+', '-', '*', '/'];
  let op = operadores[Math.floor(Math.random() * operadores.length)];

  let resultado;
  switch (op) {
    case '+': resultado = a + b; break;
    case '-': resultado = a - b; break;
    case '*': resultado = a * b; break;
    case '/': resultado = parseFloat((a / b).toFixed(2)); break;
  }

  return { a, b, op, resultado };
}

function juegoMates() {
  let registro = [];
  let continuar = true;

  while (continuar) {
    for (let i = 0; i < 4; i++) {
      let { a, b, op, resultado } = generarOperacion();
      let respuesta = prompt(`${i + 1}) Calcula: ${a} ${op} ${b}`);
      if (respuesta === null) return;

      let acierto = parseFloat(respuesta) === resultado;
      registro.push({ pregunta: `${a} ${op} ${b}`, respuesta, acierto });
      alert(acierto ? "✅ Correcto" : `❌ Incorrecto. Era ${resultado}`);
    }

    continuar = confirm("¿Deseas continuar con otras 4 preguntas?");
  }

  // Mostrar resumen final
  let aciertos = registro.filter(r => r.acierto).length;
  let fallos = registro.length - aciertos;
  console.log("📘 Resumen del juego:");
  registro.forEach((r, i) => {
    console.log(`${i + 1}) ${r.pregunta} = ${r.respuesta} → ${r.acierto ? "✔️" : "❌"}`);
  });
  console.log(`Total aciertos: ${aciertos} | Fallos: ${fallos}`);
}

// Bloque de prueba
(function probar() {
  juegoMates();
})();
