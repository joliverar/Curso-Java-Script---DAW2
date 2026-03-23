"use strict";

/*
    LÓGICA DEL JUEGO
    Función autoinvocada "simon"
*/
const simon = (function () {
  const colores = ["verde", "rojo", "azul", "amarillo"];

  let secuencia = [];
  let mejorRacha = 0;
  let posicionActual = 0;
  let estado = "parado";

  function colorAleatorio() {
    const indice = Math.floor(Math.random() * colores.length);
    return colores[indice];
  }

  function iniciarJuego() {
    secuencia = [];
    posicionActual = 0;
    estado = "jugando";
    secuencia[secuencia.length] = colorAleatorio();
  }

  function getSecuencia() {
    return secuencia;
  }

  function setUltimoColorPulsado(color) {
    if (estado !== "jugando") {
      return false;
    }

    if (color === secuencia[posicionActual]) {
      posicionActual++;

      if (posicionActual > mejorRacha) {
        mejorRacha = posicionActual;
      }

      return true;
    }

    estado = "parado";
    return false;
  }

  function getMejorRacha() {
    return mejorRacha;
  }

  function getPosicionComprobar() {
    return posicionActual;
  }

  function getEstado() {
    return estado;
  }

  function siguienteRonda() {
    posicionActual = 0;
    secuencia[secuencia.length] = colorAleatorio();
  }

  function pararJuego() {
    estado = "parado";
  }

  return {
    getSecuencia: getSecuencia,
    setUltimoColorPulsado: setUltimoColorPulsado,
    getMejorRacha: getMejorRacha,
    getPosicionComprobar: getPosicionComprobar,
    iniciarJuego: iniciarJuego,
    getEstado: getEstado,
    siguienteRonda: siguienteRonda,
    pararJuego: pararJuego,
  };
})();

/*
    CÓDIGO DE INTERFAZ
*/
window.addEventListener("load", function () {
  const botones = document.querySelectorAll(".boton-color");
  const inputTiempoLuz = document.getElementById("tiempoLuz");
  const inputTiempoEspera = document.getElementById("tiempoEspera");
  const btnComenzar = document.getElementById("btnComenzar");
  const spanMejorRacha = document.getElementById("mejorRacha");
  const spanInfoPartida = document.getElementById("infoPartida");
  const spanEstadoJuego = document.getElementById("estadoJuego");
  const mensaje = document.getElementById("mensaje");

  let representandoSecuencia = false;

  function esperar(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function apagarTodasLasLuces() {
    for (let i = 0; i < botones.length; i++) {
      botones[i].className = "boton-color apagado";
    }
  }

  function encenderLuz(color) {
    const boton = document.getElementById(color);
    boton.className = "boton-color encendido-" + color;
  }

  function actualizarInformacion() {
    spanMejorRacha.textContent = simon.getMejorRacha();
    spanEstadoJuego.textContent = simon.getEstado();

    const acertados = simon.getPosicionComprobar();
    const total = simon.getSecuencia().length;
    spanInfoPartida.textContent = acertados + " de " + total;
  }

  async function presentarSecuencia() {
    representandoSecuencia = true;
    mensaje.textContent = "";
    apagarTodasLasLuces();

    const secuencia = simon.getSecuencia();
    const tiempoLuz = parseInt(inputTiempoLuz.value);
    const tiempoEspera = parseInt(inputTiempoEspera.value);

    for (let i = 0; i < secuencia.length; i++) {
      apagarTodasLasLuces();
      await esperar(tiempoEspera);

      encenderLuz(secuencia[i]);
      await esperar(tiempoLuz);

      apagarTodasLasLuces();
    }

    representandoSecuencia = false;
  }

  async function arrancarBucleJuego() {
    if (simon.getEstado() === "jugando") {
      return;
    }

    simon.iniciarJuego();
    actualizarInformacion();
    await presentarSecuencia();
    actualizarInformacion();
  }

  async function siguienteRonda() {
    simon.siguienteRonda();
    actualizarInformacion();
    await presentarSecuencia();
    actualizarInformacion();
  }

  async function manejarPulsacionColor(evento) {
    if (simon.getEstado() === "parado" || representandoSecuencia) {
      return;
    }

    const color = evento.currentTarget.dataset.color;

    encenderLuz(color);
    setTimeout(function () {
      apagarTodasLasLuces();
    }, 250);

    const correcto = simon.setUltimoColorPulsado(color);
    actualizarInformacion();

    if (!correcto) {
      mensaje.textContent = "Has perdido la partida.";
      apagarTodasLasLuces();
      return;
    }

    if (simon.getPosicionComprobar() === simon.getSecuencia().length) {
      mensaje.textContent = "¡Ronda superada!";
      await esperar(700);
      await siguienteRonda();
    }
  }

  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", manejarPulsacionColor);
  }

  btnComenzar.addEventListener("click", function () {
    arrancarBucleJuego();
  });

  actualizarInformacion();
  apagarTodasLasLuces();
});
