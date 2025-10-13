'use strict';

/********************************************************************
 * 🎯 EJERCICIO 6 — TRES EN RAYA
 ********************************************************************/

// 1️⃣ DIBUJAR TABLERO
function dibujarTablero(tablero) {
  console.clear();
  console.log("┌───┬───┬───┐");
  for (let i = 0; i < 3; i++) {
    let fila = "│";
    for (let j = 0; j < 3; j++) {
      let valor = tablero[i][j] === "" ? " " : tablero[i][j];
      fila += " " + valor + " │";
    }
    console.log(fila);
    if (i < 2) console.log("├───┼───┼───┤");
  }
  console.log("└───┴───┴───┘");
}

// 2️⃣ COMPROBAR ESTADO
function comprobarEstado(tablero) {
  // Comprobación horizontal y vertical
  for (let i = 0; i < 3; i++) {
    // Filas
    if (tablero[i][0] !== "" && tablero[i][0] === tablero[i][1] && tablero[i][1] === tablero[i][2])
      return tablero[i][0];

    // Columnas
    if (tablero[0][i] !== "" && tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i])
      return tablero[0][i];
  }

  // Diagonales
  if (tablero[0][0] !== "" && tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2])
    return tablero[0][0];

  if (tablero[0][2] !== "" && tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0])
    return tablero[0][2];

  // Empate
  let lleno = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tablero[i][j] === "") lleno = false;
    }
  }

  if (lleno) return "empate";
  return ""; // juego sigue
}

// 3️⃣ PONER FICHA HUMANO
function ponerHumano(tablero, x, y, ficha) {
  if (x < 0 || x > 2 || y < 0 || y > 2) return false; // fuera de rango
  if (tablero[x][y] !== "") return false; // ocupado
  tablero[x][y] = ficha;
  return true;
}

// 4️⃣ PONER FICHA MÁQUINA
function ponerMaquina(tablero, ficha) {
  // Intentar ganar
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tablero[i][j] === "") {
        tablero[i][j] = ficha;
        if (comprobarEstado(tablero) === ficha) return;
        tablero[i][j] = "";
      }
    }
  }

  // Bloquear al oponente
  let rival = ficha === "X" ? "O" : "X";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tablero[i][j] === "") {
        tablero[i][j] = rival;
        if (comprobarEstado(tablero) === rival) {
          tablero[i][j] = ficha;
          return;
        }
        tablero[i][j] = "";
      }
    }
  }

  // Si no puede ganar ni bloquear → juega aleatorio
  let libres = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tablero[i][j] === "") libres.push([i, j]);
    }
  }

  if (libres.length > 0) {
    let pos = libres[Math.floor(Math.random() * libres.length)];
    tablero[pos[0]][pos[1]] = ficha;
  }
}

// 5️⃣ JUEGO PRINCIPAL (DEMO SIMPLE)
function jugar() {
  let tablero = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  let turnoHumano = Math.random() < 0.5; // decide quién empieza
  let fichaHumano = "X";
  let fichaMaquina = "O";

  while (true) {
    dibujarTablero(tablero);
    let estado = comprobarEstado(tablero);
    if (estado === fichaHumano) { console.log("¡Ganas tú! 🏆"); break; }
    if (estado === fichaMaquina) { console.log("¡Gana la máquina! 🤖"); break; }
    if (estado === "empate") { console.log("Empate 🤝"); break; }

    if (turnoHumano) {
      let x = parseInt(prompt("Fila (0-2):"));
      let y = parseInt(prompt("Columna (0-2):"));
      if (!ponerHumano(tablero, x, y, fichaHumano)) {
        console.log("Posición no válida. Intenta otra vez.");
        continue;
      }
    } else {
      ponerMaquina(tablero, fichaMaquina);
    }

    turnoHumano = !turnoHumano; // alternar turnos
  }
}