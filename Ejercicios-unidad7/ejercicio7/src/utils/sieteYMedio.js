// Baraja española (40 cartas)
export const baraja = Array.from({ length: 40 }, (_, i) => {
  const id = i + 1;
  const palos = ["oros", "copas", "espadas", "bastos"];
  const palo = palos[Math.floor(i / 10)];
  const numero = (i % 10) + 1;

  let valor = numero;
  let nombre = numero;

  if (numero > 7) {
    valor = 0.5;
    nombre = numero === 8 ? "Sota" : numero === 9 ? "Caballo" : "Rey";
  }

  return {
    id,
    palo,
    numero: nombre,
    valor,
  };
});

// Barajar cartas (IDs del 1 al 40)
export const barajarCartas = () =>
  Array.from({ length: 40 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);

// Recuperar carta por ID
export const recuperarCarta = (id) =>
  baraja.find((carta) => carta.id === id);

// Sumar cartas de una mano
export const sumarCartas = (mano) =>
  mano.reduce((total, id) => total + recuperarCarta(id).valor, 0);
