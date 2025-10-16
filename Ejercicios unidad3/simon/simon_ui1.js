"use strict";

/********************************************************************
 * CAPA DE PRESENTACIÓN — Interfaz visual
 *
 * Esta capa:
 *  - Dibuja la secuencia (encender/apagar botones)
 *  - Muestra mensajes y rachas
 *  - Detecta clics y los envía a la capa de negocio ($simon)
 ********************************************************************/

// Variable que evita que el jugador pulse botones mientras se muestra la secuencia
let mostrando = false;

/*---------------------------------------------------------------
  FUNCIÓN: iluminar(color, tiempo)
  Enciende un color durante X milisegundos.
----------------------------------------------------------------*/
function iluminar(color, tiempo) {
  const boton = document.getElementById(color);
  boton.classList.add("activo"); // activa color
  setTimeout(function() {
    boton.classList.remove("activo"); // lo apaga después del tiempo indicado
  }, tiempo);
}

/*---------------------------------------------------------------
  FUNCIÓN: mostrarSecuencia(secuencia, tIlum, tEspera, alFinalizar)
  Muestra los colores uno por uno con tiempos de espera entre ellos.
  Se usa recursión + setTimeout.
----------------------------------------------------------------*/
function mostrarSecuencia(secuencia, tIlum, tEspera, alFinalizar) {
  mostrando = true; // se está mostrando la secuencia → bloqueamos clics
  let i = 0;        // índice actual

  // función interna que se llama a sí misma
  function siguiente() {
    // cuando llegamos al final de la secuencia
    if (i >= secuencia.length) {
      mostrando = false;
      if (alFinalizar) alFinalizar(); // ejecuta callback si existe
      return;
    }

    // ilumina el color actual y programa el siguiente
    setTimeout(function() {
      iluminar(secuencia[i], tIlum);
      i++;
      // espera antes de mostrar el siguiente color
      setTimeout(siguiente, tIlum + tEspera);
    }, tEspera);
  }

  siguiente(); // inicia el proceso
}

/*---------------------------------------------------------------
  FUNCIÓN: actualizarInfo()
  Actualiza los textos de racha actual y mejor racha.
----------------------------------------------------------------*/
function actualizarInfo() {
  document.getElementById("mejorRacha").textContent = $simon.obtenerMejorRacha();
  document.getElementById("rachaActual").textContent =
    $simon.obtenerPosicion() + " de " + $simon.obtenerSecuencia().length;
}

/*---------------------------------------------------------------
  FUNCIÓN: iniciarJuego()
  Llamada al presionar "Comenzar Juego".
  Inicia una nueva partida desde la capa de negocio.
----------------------------------------------------------------*/
function iniciarJuego() {
  // Evitar reiniciar si ya está jugando o se está mostrando la secuencia
  if ($simon.obtenerEstado() === "jugando" || mostrando) return;

  // Limpia mensaje y arranca el juego
  document.getElementById("mensaje").textContent = "";
  $simon.iniciarJuego();

  // Muestra la primera secuencia
  mostrarSecuencia(
    $simon.obtenerSecuencia(),
    Number(document.getElementById("tiempoIluminacion").value),
    Number(document.getElementById("tiempoEspera").value),
    function() { mostrando = false; }
  );

  actualizarInfo();
}

/*---------------------------------------------------------------
  FUNCIÓN: manejarColor(color)
  Se ejecuta cuando el usuario pulsa un color.
  Envía la pulsación a la capa de negocio y actualiza la interfaz.
----------------------------------------------------------------*/
function manejarColor(color) {
  // Si el juego está detenido o mostrando secuencia, ignorar clics
  if ($simon.obtenerEstado() === "parado" || mostrando) return;

  iluminar(color, 200); // efecto visual inmediato

  // Verificar con la capa de negocio si fue correcto
  const resultado = $simon.establecerColorPulsado(color);

  if (resultado === "correcto") {
    actualizarInfo(); // sigue jugando
  } 
  else if (resultado === "ronda-superada") {
    actualizarInfo();
    // Espera un poco y genera nueva ronda
    setTimeout(function() {
      $simon.siguienteRonda();
      mostrarSecuencia(
        $simon.obtenerSecuencia(),
        Number(document.getElementById("tiempoIluminacion").value),
        Number(document.getElementById("tiempoEspera").value),
        function() { mostrando = false; actualizarInfo(); }
      );
    }, 500);
  } 
  else if (resultado === "fallo") {
    document.getElementById("mensaje").textContent =
      "❌ Has fallado. Pulsa 'Comenzar Juego' para volver a intentarlo.";
    actualizarInfo();
  }
}

/*---------------------------------------------------------------
  EVENTOS DE INICIO
  Se asocian los eventos cuando se carga la página.
----------------------------------------------------------------*/
window.addEventListener("load", function() {
  // Botón principal de inicio
  document.getElementById("btnIniciar").addEventListener("click", iniciarJuego);

  // Asigna evento a cada botón de color
  const colores = ["verde", "rojo", "azul", "amarillo"];
  for (let i = 0; i < colores.length; i++) {
    const c = colores[i];
    document.getElementById(c).addEventListener("click", function() {
      manejarColor(c);
    });
  }
});
