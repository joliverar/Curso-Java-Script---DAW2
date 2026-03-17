function jugarDados(numeroLados) {
  function tirarUnDado() {
    return Math.floor(Math.random() * numeroLados) + 1;
  }
  return function () {
    return [tirarUnDado(), tirarUnDado()];
  };
}

window.addEventListener("load", () => {
  const lados = document.getElementById("lados");
  const numTiradas = document.getElementById("numTiradas");
  const btnIniciar = document.getElementById("btnIniciar");
  const btnTirar = document.getElementById("btnTirar");
  const log = document.getElementById("log");

  let tirarDados;
  let tiradasRestantes;
  let victoriasJ = 0;
  let victoriasM = 0;

  btnIniciar.addEventListener("click", () => {
    tirarDados = jugarDados(Number(lados.value));
    tiradasRestantes = Number(numTiradas.value);
    victoriasJ = 0;
    victoriasM = 0;
    log.innerHTML = "";
    btnTirar.disabled = false;
  });

  btnTirar.addEventListener("click", () => {
    if (tiradasRestantes <= 0) return;

    const [m1, m2] = tirarDados();
    const [j1, j2] = tirarDados();

    const sumaM = m1 + m2;
    const sumaJ = j1 + j2;

    if (sumaJ > sumaM) victoriasJ++;
    else if (sumaM > sumaJ) victoriasM++;

    log.innerHTML += `
            <p>Máquina: ${m1}+${m2}=${sumaM} | Jugador: ${j1}+${j2}=${sumaJ}</p>
        `;

    tiradasRestantes--;

    if (tiradasRestantes === 0) {
      btnTirar.disabled = true;
      log.innerHTML += `<h3>Final: Jugador ${victoriasJ} - Máquina ${victoriasM}</h3>`;
    }
  });
});
