function marcoFrase(frase) {
  // 1️⃣ Separar palabras sin usar split()
  let palabras = [];
  let palabra = "";

  for (let i = 0; i < frase.length; i++) {
    let c = frase[i];
    if (c === " ") {
      if (palabra !== "") {
        palabras.push(palabra);
        palabra = "";
      }
    } else {
      palabra += c;
    }
  }
  if (palabra !== "") palabras.push(palabra); // última palabra

  // 2️⃣ Calcular la palabra más larga
  let max = 0;
  for (let i = 0; i < palabras.length; i++) {
    if (palabras[i].length > max) max = palabras[i].length;
  }

  // 3️⃣ Dibujar marco
  let borde = "*".repeat(max + 4);
  console.log(borde);
  for (let i = 0; i < palabras.length; i++) {
    let espacioExtra = max - palabras[i].length;
    let linea = "* " + palabras[i] + " ".repeat(espacioExtra) + " *";
    console.log(linea);
  }
  console.log(borde);
}
