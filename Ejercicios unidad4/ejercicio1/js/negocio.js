'use strict';

// === LÓGICA DE NEGOCIO ===

/**
 * Crea un closure para lanzar dados
 * @param {number} numeroLados - número de caras del dado
 * @returns {Function} función que simula dos lanzamientos
 */
function jugarDados(numeroLados) {
  function lanzarDado() {
    return Math.floor(Math.random() * numeroLados) + 1;
  }

  return function() {
    return [lanzarDado(), lanzarDado()];
  };
}

/**
 * Ejecuta una partida completa
 * @param {number} numeroLados 
 * @param {number} numeroTiradas 
 * @returns {object} resultados de la partida
 */
function partida(numeroLados, numeroTiradas) {
  const tirarDados = jugarDados(numeroLados);
  let jugador = 0, maquina = 0;
  let resultados = [];

  for (let i = 1; i <= numeroTiradas; i++) {
    const [dadoJ, dadoM] = tirarDados();
    resultados.push({ tirada: i, jugador: dadoJ, maquina: dadoM });

    if (dadoJ > dadoM) jugador++;
    else if (dadoM > dadoJ) maquina++;
  }

  return {
    resultados,
    totalJugador: jugador,
    totalMaquina: maquina
  };
}
