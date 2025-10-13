function segundoMayor(array) {
  if (array.length < 2) return null; // No se puede con menos de dos números

  let mayor = -Infinity;
  let segundo = -Infinity;

  for (let i = 0; i < array.length; i++) {
    let valor = array[i];
    if (valor > mayor) {
      segundo = mayor;
      mayor = valor;
    } else if (valor > segundo && valor < mayor) {
      segundo = valor;
    }
  }

  return segundo;
}
