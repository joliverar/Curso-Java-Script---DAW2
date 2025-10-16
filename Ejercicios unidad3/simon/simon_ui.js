"use strict";

/********************************************************************
 * CAPA DE PRESENTACIÓN (INTERFAZ DE USUARIO)
 ********************************************************************/
let mostrando = false;

// Ilumina un botón temporalmente
function iluminar(color, tiempo) {
  const boton = document.getElementById(color);
  boton.classList.add("activo");
  setTimeout(function() {
    boton.classList.remove("activo");
  }, tiempo);
}

// Muestra visualmente la secuencia
function mostrarSecuencia(secuencia, tIlum, tEspera, alFinalizar) {
  mostrando = true;
  let i = 0;

  function siguiente() {
    if (i >= secuencia.length) {
      mostrando = false;
      if (alFinalizar) alFinalizar();
      return;
    }

    setTimeout(function() {
      iluminar(secuencia[i], tIlum);
      i++;
      setTimeout(siguiente, tIlum + tEspera);
    }, tEspera);
  }

  siguiente();
}

// Actualiza los datos en la interfaz
function actualizarInfo() {
  document.getElementById("mejorRacha").textContent = $simon.obtenerMejorRacha();
  document.getElementById("rachaActual").textContent =
    $simon.obtenerPosicion() + " de " + $simon.obtenerSecuencia().length;
}

// Inicia el juego desde la interfaz
function iniciarJuego() {
  if ($simon.obtenerEstado() === "jugando" || mostrando) return;

  $simon.iniciarJuego();
  document.getElementById("mensaje").textContent = "";

  mostrarSecuencia(
    $simon.obtenerSecuencia(),
    Number(document.getElementById("tiempoIluminacion").value),
    Number(document.getElementById("tiempoEspera").value),
    function() {
      mostrando = false;
    }
  );

  actualizarInfo();
}

// Maneja clics en los botones de color
function manejarColor(color) {
  if ($simon.obtenerEstado() === "parado" || mostrando) return;

  iluminar(color, 200);
  const resultado = $simon.establecerColorPulsado(color);

  if (resultado === "correcto") {
    actualizarInfo();
  } else if (resultado === "ronda-superada") {
    actualizarInfo();
    setTimeout(function() {
      $simon.siguienteRonda();
      mostrarSecuencia(
        $simon.obtenerSecuencia(),
        Number(document.getElementById("tiempoIluminacion").value),
        Number(document.getElementById("tiempoEspera").value),
        function() {
          mostrando = false;
          actualizarInfo();
        }
      );
    }, 500);
  } else if (resultado === "fallo") {
    document.getElementById("mensaje").textContent =
      "❌ Has fallado. Pulsa 'Comenzar Juego' para volver a intentarlo.";
    actualizarInfo();
  }
}

// Asigna eventos al cargar la página
window.addEventListener("load", function() {
  document.getElementById("btnIniciar").addEventListener("click", iniciarJuego);
  const colores = ["verde", "rojo", "azul", "amarillo"];
  for (let i = 0; i < colores.length; i++) {
    const color = colores[i];
    document.getElementById(color).addEventListener("click", function() {
      manejarColor(color);
    });
  }
});
