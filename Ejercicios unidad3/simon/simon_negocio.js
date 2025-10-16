"use strict";

/********************************************************************
 * CAPA DE NEGOCIO (LÓGICA DEL JUEGO)
 ********************************************************************/
window.$simon = (function() {
  const colores = ["verde", "rojo", "azul", "amarillo"];
  let secuencia = [];
  let posicion = 0;
  let mejorRacha = 0;
  let estado = "parado";

  function nuevaRonda() {
    const color = colores[Math.floor(Math.random() * colores.length)];
    secuencia.push(color);
    posicion = 0;
  }

  return {
    iniciarJuego: function() {
      secuencia = [];
      posicion = 0;
      estado = "jugando";
      nuevaRonda();
    },
    obtenerSecuencia: function() {
      return secuencia.slice();
    },
    obtenerEstado: function() {
      return estado;
    },
    obtenerPosicion: function() {
      return posicion;
    },
    obtenerMejorRacha: function() {
      return mejorRacha;
    },
    establecerColorPulsado: function(color) {
      if (estado === "parado") return "fuera-juego";

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
    siguienteRonda: function() {
      nuevaRonda();
    },
    detener: function() {
      estado = "parado";
    }
  };
})();
