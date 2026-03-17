window.addEventListener("load", () => {
  const botones = document.querySelectorAll(".btn-color");
  const btnComenzar = document.getElementById("btnComenzar");
  const spanMejorRacha = document.getElementById("mejorRacha");
  const spanAciertos = document.getElementById("aciertosActuales");
  const inputMsIluminacion = document.getElementById("msIluminacion");
  const inputMsEspera = document.getElementById("msEspera");

  let mostrandoSecuencia = false;

  function getMsIluminacion() {
    return Number(inputMsIluminacion.value) || 600;
  }

  function getMsEspera() {
    return Number(inputMsEspera.value) || 300;
  }

  function apagarLuces() {
    botones.forEach((b) => b.classList.remove("on"));
  }

  function iluminar(color, ms) {
    const btn = document.querySelector(`.btn-color.${color}`);
    if (!btn) return;
    btn.classList.add("on");
    setTimeout(() => {
      btn.classList.remove("on");
    }, ms);
  }

  // Presenta la secuencia de colores actual
  function mostrarSecuencia() {
    const secuencia = simon.getSecuencia();
    if (!secuencia.length) return;

    mostrandoSecuencia = true;
    apagarLuces();

    const msIlum = getMsIluminacion();
    const msEsp = getMsEspera();

    let i = 0;

    function paso() {
      if (i >= secuencia.length) {
        mostrandoSecuencia = false;
        apagarLuces();
        return;
      }

      setTimeout(() => {
        apagarLuces();
        const color = secuencia[i];
        iluminar(color, msIlum);
        i++;
        setTimeout(paso, msIlum);
      }, msEsp);
    }

    paso();
  }

  // Arranca el bucle del juego
  function arrancarJuego() {
    if (simon.getEstado() === "jugando") return;
    simon.iniciarJuego();
    actualizarInfo(0, simon.getSecuencia().length);
    setTimeout(mostrarSecuencia, 500);
  }

  function actualizarInfo(aciertos, total) {
    spanMejorRacha.textContent = simon.getMejorRacha();
    spanAciertos.textContent = `${aciertos} de ${total}`;
  }

  // Manejador de pulsación de color
  function manejarPulsacion(color) {
    if (simon.getEstado() === "parado") return;
    if (mostrandoSecuencia) return;

    const msIlum = getMsIluminacion();
    iluminar(color, msIlum);

    const res = simon.setColorPulsado(color);

    if (res.resultado === "acierto") {
      actualizarInfo(res.rachaActual, res.total);
    } else if (res.resultado === "rondaCompletada") {
      actualizarInfo(res.rachaActual, res.total);
      setTimeout(mostrarSecuencia, getMsEspera() + msIlum);
    } else if (res.resultado === "fallo") {
      actualizarInfo(0, res.total);
      alert("Has perdido la partida.");
    }
  }

  // Eventos
  btnComenzar.addEventListener("click", arrancarJuego);

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const color = boton.dataset.color;
      manejarPulsacion(color);
    });
  });
});
