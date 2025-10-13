function maquinaDeCambio(importe) {
  const valores = [200, 100, 50, 20, 10, 5, 2, 1];
  let resultado = [];

  for (let i = 0; i < valores.length; i++) {
    let cantidad = 0;
    while (importe >= valores[i]) {
      importe -= valores[i];
      cantidad++;
    }

    if (cantidad > 0) {
      let tipo = valores[i] >= 5 ? "billete" : "moneda";
      let texto = cantidad + " " + tipo + (cantidad > 1 ? "s" : "") + " de " + valores[i] + "€";
      resultado.push(texto);
    }
  }

  return resultado;
}
