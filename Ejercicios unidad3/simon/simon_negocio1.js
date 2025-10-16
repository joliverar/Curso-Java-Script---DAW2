"use strict";

/********************************************************************
 * CAPA DE NEGOCIO — Lógica del juego "Simón"
 *
 * Esta capa NO maneja botones, ni HTML, ni DOM.
 * Solo sabe las reglas del juego:
 *  - Generar secuencias aleatorias
 *  - Verificar colores pulsados
 *  - Controlar rachas y estado
 ********************************************************************/
window.$simon = (function() {
  // ---- VARIABLES PRIVADAS ----
  const colores = ["verde", "rojo", "azul", "amarillo"]; // colores válidos
  let secuencia = [];    // guarda la secuencia actual del juego
  let posicion = 0;      // índice que el jugador debe repetir
  let mejorRacha = 0;    // mejor secuencia alcanzada
  let estado = "parado"; // puede ser "parado" o "jugando"

  // ---- FUNCIÓN PRIVADA ----
  // Agrega un color aleatorio a la secuencia
  function nuevaRonda() {
    const color = colores[Math.floor(Math.random() * colores.length)];
    secuencia.push(color);
    posicion = 0; // reinicia el índice para el jugador
  }

  // ---- MÉTODOS PÚBLICOS ----
  return {
    // Reinicia todo y empieza el juego
    iniciarJuego: function() {
      secuencia = [];
      posicion = 0;
      estado = "jugando";
      nuevaRonda(); // genera el primer color
    },

    // Devuelve una copia de la secuencia actual
    obtenerSecuencia: function() {
      return secuencia.slice();
    },

    // Devuelve el estado actual del juego
    obtenerEstado: function() {
      return estado;
    },

    // Devuelve la posición actual dentro de la secuencia
    obtenerPosicion: function() {
      return posicion;
    },

    // Devuelve la mejor racha registrada
    obtenerMejorRacha: function() {
      return mejorRacha;
    },

    // Comprueba si el color pulsado por el jugador es correcto
    establecerColorPulsado: function(color) {
      if (estado === "parado") return "fuera-juego";

      // ✅ Si el color coincide con el esperado
      if (color === secuencia[posicion]) {
        posicion++;
        // Si completó toda la secuencia correctamente
        if (posicion === secuencia.length) {
          if (secuencia.length > mejorRacha) mejorRacha = secuencia.length;
          return "ronda-superada"; // indica que debe empezar otra ronda
        }
        return "correcto"; // aún quedan colores por acertar
      } 
      // ❌ Si el jugador se equivoca
      else {
        estado = "parado";
        return "fallo";
      }
    },

    // Crea una nueva ronda (solo si el jugador acertó)
    siguienteRonda: function() {
      nuevaRonda();
    },

    // Cambia el estado manualmente (por ejemplo, al perder)
    detener: function() {
      estado = "parado";
    }
  };
})();
