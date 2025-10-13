'use strict';

/********************************************************************
 * ⏳ EJERCICIO 15 — CUENTA ATRÁS
 ********************************************************************/
function cuentaAtras(num1, num2) {
  // 1️⃣ Determinar el mayor y el menor
  let mayor = num1 > num2 ? num1 : num2;
  let menor = num1 < num2 ? num1 : num2;

  // 2️⃣ Inicializar la variable actual
  let actual = mayor;

  console.log(`Iniciando cuenta atrás desde ${mayor} hasta ${menor}...\n`);

  // 3️⃣ Iniciar intervalo cada 1 segundo (1000 ms)
  let intervalo = setInterval(function() {
    console.log(actual);

    // 4️⃣ Comprobar si hemos llegado al final
    if (actual <= menor) {
      clearInterval(intervalo); // Detiene el temporizador
      console.log("⏰ ¡Cuenta atrás terminada!");
    }

    // 5️⃣ Decrementar el valor actual
    actual--;
  }, 1000);
}
