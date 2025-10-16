"use strict";

/********************************************************************
 * FUNCIÓN AUTOINVOCADA "SIMON"
 ********************************************************************/
const simon = (function() {
  const colores = ["verde", "rojo", "azul", "amarillo"];
  let secuencia = [];
  let posicion = 0;
  let mejorRacha = 0;
  let estado = "parado";

  return {
    obtenerSecuencia: function() {
      return secuencia.slice(); // copia del array
    },
    establecerColorPulsado: function(color) {
      if (color === secuencia[posicion]) {
        posicion++;
        if (posicion === secuencia.length) {
          if (secuencia.length > mejorRacha) mejorRacha = secuencia.length;
          return "ronda-superada";
        }
        return "correcto";
      } else {
        estado = "parado";
        return "fallo";
      }
    },
    obtenerMejorRacha: function() {
      return mejorRacha;
    },
    obtenerPosicion: function() {
      return posicion;
    },
    iniciarJuego: function() {
      secuencia = [];
      posicion = 0;
      estado = "jugando";
      this.nuevaRonda();
    },
    nuevaRonda: function() {
      const nuevoColor = colores[Math.floor(Math.random() * colores.length)];
      secuencia.push(nuevoColor);
      posicion = 0;
    },
    obtenerEstado: function() {
      return estado;
    },
    setEstado: function(nuevo) {
      estado = nuevo;
    }
  };
})();

/********************************************************************
 * VARIABLES Y FUNCIONES AUXILIARES
 ********************************************************************/
let mostrandoSecuencia = false;

// Ilumina temporalmente un botón
function iluminar(color, tiempo) {
  const boton = document.getElementById(color);
  boton.classList.add("activo");
  setTimeout(function() {
    boton.classList.remove("activo");
  }, tiempo);
}

// Muestra la secuencia completa paso a paso (con setTimeout)
function mostrarSecuenciaBasica(secuencia, tiempoIlum, tiempoEspera, alFinalizar) {
  mostrandoSecuencia = true;
  let i = 0;

  function mostrarSiguiente() {
    if (i >= secuencia.length) {
      mostrandoSecuencia = false;
      if (alFinalizar) alFinalizar();
      return;
    }

    const color = secuencia[i];
    setTimeout(function() {
      iluminar(color, tiempoIlum);
      i++;
      setTimeout(mostrarSiguiente, tiempoIlum + tiempoEspera);
    }, tiempoEspera);
  }

  mostrarSiguiente();
}

// Actualiza la información en pantalla
function actualizarInfo() {
  document.getElementById("mejorRacha").textContent = simon.obtenerMejorRacha();
  const pos = simon.obtenerPosicion();
  const total = simon.obtenerSecuencia().length;
  document.getElementById("rachaActual").textContent = pos + " de " + total;
}

// Inicia el juego
function iniciarJuego() {
  if (simon.obtenerEstado() === "jugando" || mostrandoSecuencia) return;

  simon.iniciarJuego();
  document.getElementById("mensaje").textContent = "";

  mostrarSecuenciaBasica(
    simon.obtenerSecuencia(),
    Number(document.getElementById("tiempoIluminacion").value),
    Number(document.getElementById("tiempoEspera").value),
    function() {
      mostrandoSecuencia = false;
    }
  );
  actualizarInfo();
}

// Maneja el clic en los botones de color
function manejarPulsacion(color) {
  if (simon.obtenerEstado() === "parado" || mostrandoSecuencia) return;

  iluminar(color, 200);
  const resultado = simon.establecerColorPulsado(color);

  if (resultado === "correcto") {
    actualizarInfo();
  } else if (resultado === "ronda-superada") {
    actualizarInfo();
    setTimeout(function() {
      simon.nuevaRonda();
      mostrarSecuenciaBasica(
        simon.obtenerSecuencia(),
        Number(document.getElementById("tiempoIluminacion").value),
        Number(document.getElementById("tiempoEspera").value),
        function() {
          mostrandoSecuencia = false;
          actualizarInfo();
        }
      );
    }, 500);
  } else if (resultado === "fallo") {
    document.getElementById("mensaje").textContent =
      "❌ Has fallado. Pulsa 'Comenzar Juego' para intentarlo de nuevo.";
    actualizarInfo();
  }
}

/********************************************************************
 * EVENTOS DE INICIO
 ********************************************************************/
window.addEventListener("load", function() {
  document.getElementById("btnIniciar").addEventListener("click", iniciarJuego);

  const colores = ["verde", "rojo", "azul", "amarillo"];
  for (let i = 0; i < colores.length; i++) {
    const color = colores[i];
    document.getElementById(color).addEventListener("click", function() {
      manejarPulsacion(color);
    });
  }
});
