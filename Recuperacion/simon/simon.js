const simon = (function () {
  const colores = ["verde", "rojo", "azul", "amarillo"];

  let secuencia = [];
  let estado = "parado"; // "parado" | "jugando"
  let mejorRacha = 0;
  let posActual = 0; // posición a comprobar dentro de la secuencia

  function colorAleatorio() {
    const i = Math.floor(Math.random() * colores.length);
    return colores[i];
  }

  function anadirColor() {
    secuencia.push(colorAleatorio());
    posActual = 0;
  }

  function iniciarJuego() {
    if (estado === "jugando") return;
    secuencia = [];
    posActual = 0;
    estado = "jugando";
    anadirColor();
  }

  // Recibe el color pulsado y devuelve info sobre el resultado
  function setColorPulsado(color) {
    if (estado !== "jugando") {
      return { resultado: "fueraDeJuego" };
    }

    const esperado = secuencia[posActual];

    if (color === esperado) {
      posActual++;

      // ¿hemos completado la secuencia actual?
      if (posActual === secuencia.length) {
        // actualizar mejor racha
        if (secuencia.length > mejorRacha) {
          mejorRacha = secuencia.length;
        }
        const rachaActual = secuencia.length;

        // añadimos un nuevo color para la siguiente ronda
        anadirColor();

        return {
          resultado: "rondaCompletada",
          rachaActual,
          total: rachaActual,
        };
      }

      // acierto parcial
      return {
        resultado: "acierto",
        rachaActual: posActual,
        total: secuencia.length,
      };
    } else {
      // fallo
      const total = secuencia.length;
      estado = "parado";
      posActual = 0;
      return {
        resultado: "fallo",
        rachaActual: 0,
        total,
      };
    }
  }

  function getSecuencia() {
    return secuencia.slice();
  }

  function getMejorRacha() {
    return mejorRacha;
  }

  function getPosicionActual() {
    return posActual;
  }

  function getEstado() {
    return estado;
  }

  return {
    getSecuencia,
    setColorPulsado,
    getMejorRacha,
    getPosicionActual,
    iniciarJuego,
    getEstado,
  };
})();
