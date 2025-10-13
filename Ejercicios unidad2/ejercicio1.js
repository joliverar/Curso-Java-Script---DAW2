'use strict';

function sonAnagramas(p1, p2) {
  if (p1 === p2) return false; // No pueden ser idénticas
  if (p1.length !== p2.length) return false;

  for (let i = 0; i < p1.length; i++) {
    let letra = p1[i];
    let cont1 = 0, cont2 = 0;

    // Contar cuántas veces aparece cada letra
    for (let j = 0; j < p1.length; j++) {
      if (p1[j] === letra) cont1++;
      if (p2[j] === letra) cont2++;
    }

    if (cont1 !== cont2) return false;
  }
  return true;
}

// Ejemplo:
console.log(sonAnagramas("roma", "amor")); // true
