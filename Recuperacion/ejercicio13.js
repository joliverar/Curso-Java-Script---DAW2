"use strict";

/*13-Juego mates*/

function generarNumero() {
  return Math.floor(Math.random() * 10) + 1;
}

function generarOperador() {
  let ops = ["+", "-", "*"];
  let pos = Math.floor(Math.random() * ops.length);
  return ops[pos];
}

function calcular(a, b, op) {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
}

function juegoMates() {
  let historial = [];
  let numeroPregunta = 1;
  let continuar = true;

  while (continuar) {
    for (let i = 0; i < 4; i++) {
      let a = generarNumero();
      let b = generarNumero();
      let op = generarOperador();

      let resultadoCorrecto = calcular(a, b, op);

      let respuesta = parseInt(
        prompt(
          "Pregunta " + numeroPregunta + ": " + a + " " + op + " " + b + " = ?",
        ),
      );

      let acierto = respuesta === resultadoCorrecto;

      historial[historial.length] = {
        numero: numeroPregunta,
        pregunta: a + " " + op + " " + b,
        respuestaUsuario: respuesta,
        resultadoCorrecto: resultadoCorrecto,
        acierto: acierto,
      };

      if (acierto) {
        alert("Correcto!");
      } else {
        alert("Incorrecto. Resultado correcto: " + resultadoCorrecto);
      }

      numeroPregunta++;
    }

    continuar = confirm("¿Deseas continuar?");
  }

  mostrarResumen(historial);
}

function mostrarResumen(historial) {
  let aciertos = 0;
  let fallos = 0;

  console.log("RESUMEN DEL JUEGO");

  for (let i = 0; i < historial.length; i++) {
    let p = historial[i];

    console.log(
      p.numero +
        " | " +
        p.pregunta +
        " | usuario: " +
        p.respuestaUsuario +
        " | " +
        (p.acierto ? "ACIERTO" : "FALLO"),
    );

    if (p.acierto) {
      aciertos++;
    } else {
      fallos++;
    }
  }

  console.log("Total aciertos:", aciertos);
  console.log("Total fallos:", fallos);
}

// Ejecutar juego
juegoMates();
