const Cesar = (function() {
  const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // 🧩 Cifrar texto
  function cifrarTexto(texto, clave) {
    let resultado = "";
    texto = texto.toUpperCase();

    for (let i = 0; i < texto.length; i++) {
      let c = texto[i];
      if (c === " ") {
        resultado += " ";
        continue;
      }

      // Buscar posición en el alfabeto
      let pos = -1;
      for (let j = 0; j < alfabeto.length; j++) {
        if (alfabeto[j] === c) pos = j;
      }

      if (pos === -1) {
        resultado += c; // símbolo o número
      } else {
        let nuevaPos = (pos + clave) % 26;
        resultado += alfabeto[nuevaPos];
      }
    }
    return resultado;
  }

  // 🔓 Descifrar texto
  function descifrarTexto(texto, clave) {
    return cifrarTexto(texto, 26 - (clave % 26));
  }

  // Retornar las funciones públicas
  return {
    cifrarTexto,
    descifrarTexto
  };
})();
