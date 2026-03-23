function Animal(tipo, nombre) {
  this.tipo = tipo;
  this.nombre = nombre;
}

Animal.prototype.comer = function () {
  return `${this.nombre} está comiendo`;
};

Animal.prototype.dormir = function () {
  return `${this.nombre} está durmiendo`;
};

Animal.prototype.hacerRuido = function () {
  if (this.tipo === "perro") return `${this.nombre} hace guau`;
  if (this.tipo === "gato") return `${this.nombre} hace miau`;
  return `${this.nombre} hace ruido`;
};

// Prueba
const a1 = new Animal("perro", "Toby");
console.log(a1.hacerRuido());

class AnimalBase {
  constructor(nombre) {
    this.nombre = nombre;
  }

  comer() {
    return `${this.nombre} está comiendo`;
  }

  dormir() {
    return `${this.nombre} está durmiendo`;
  }

  hacerRuido() {
    return `${this.nombre} hace ruido`;
  }
}

class Perro extends AnimalBase {
  hacerRuido() {
    return `${this.nombre} hace guau`;
  }
}

class Gato extends AnimalBase {
  hacerRuido() {
    return `${this.nombre} hace miau`;
  }
}

// Prueba
const perro = new Perro("Rex");
console.log(perro.hacerRuido());

const gato = new Gato("Michi");
console.log(gato.hacerRuido());

function AnimalBase2(nombre) {
  this.nombre = nombre;
}

AnimalBase2.prototype.hacerRuido = function () {
  return `${this.nombre} hace ruido`;
};

function Perro2(nombre) {
  AnimalBase2.call(this, nombre);
}

Perro2.prototype = Object.create(AnimalBase2.prototype);
Perro2.prototype.constructor = Perro2;

Perro2.prototype.hacerRuido = function () {
  return `${this.nombre} hace guau`;
};

class Linea {
  constructor(concepto, cantidad, precioUnitario) {
    this.concepto = concepto;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
  }

  get total() {
    return this.cantidad * this.precioUnitario;
  }
}

class Factura {
  constructor(clienteNIF, fecha, hora, pagada = false) {
    this.clienteNIF = clienteNIF;
    this.fecha = fecha;
    this.hora = hora;
    this.pagada = pagada;
    this.lineas = [];
  }

  get importeTotal() {
    return this.lineas.reduce((acc, l) => acc + l.total, 0);
  }

  get numeroArticulos() {
    return this.lineas.length;
  }

  agregarLinea(concepto, cantidad, precio) {
    this.lineas.push(new Linea(concepto, cantidad, precio));
  }

  eliminarLinea() {
    this.lineas.pop();
  }

  imprimirFactura() {
    let texto = `Factura: ${this.clienteNIF}\n`;
    texto += `Total: ${this.importeTotal}\n`;
    this.lineas.forEach((l) => {
      texto += `${l.concepto} - ${l.total}\n`;
    });
    return texto;
  }
}

class Utilidades {
  static serializarFactura(factura) {
    return JSON.stringify(factura);
  }

  static deserializarFactura(json) {
    const obj = JSON.parse(json);
    const factura = new Factura(
      obj.clienteNIF,
      obj.fecha,
      obj.hora,
      obj.pagada,
    );

    obj.lineas.forEach((l) => {
      factura.agregarLinea(l.concepto, l.cantidad, l.precioUnitario);
    });

    return factura;
  }
}