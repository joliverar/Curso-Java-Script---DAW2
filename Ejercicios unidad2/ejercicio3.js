function morse(texto) {
  const letras = ['A','B','C','D','E','F','G','H','I','J'];
  const morseCod = ['.-','-...','-.-.','-..','.','..-.','--.','....','..','.---'];

  if (texto[0] === '.' || texto[0] === '-') {
    // Decodificar
    let palabras = texto.split('  ');
    let resultado = '';
    for (let i = 0; i < palabras.length; i++) {
      let simbolos = palabras[i].split(' ');
      for (let j = 0; j < simbolos.length; j++) {
        for (let k = 0; k < morseCod.length; k++) {
          if (simbolos[j] === morseCod[k]) resultado += letras[k];
        }
      }
      resultado += ' ';
    }
    return resultado.trim();
  } else {
    // Codificar
    texto = texto.toUpperCase();
    let resultado = '';
    for (let i = 0; i < texto.length; i++) {
      let c = texto[i];
      if (c === ' ') resultado += '  ';
      else {
        for (let j = 0; j < letras.length; j++) {
          if (c === letras[j]) resultado += morseCod[j] + ' ';
        }
      }
    } 
    return resultado.trim();
  }
}

console.log(morse("ABC"));
console.log(morse(".- -... -.-."));
