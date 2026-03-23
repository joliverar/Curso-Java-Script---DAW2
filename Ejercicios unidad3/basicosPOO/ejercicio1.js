const persona1 = {
  nombre: "Jino",
  nacimiento: new Date(1990, 0, 1),
  hobbies: ["ajedrez", "programar"],

  get edad() {
    const hoy = new Date();
    return hoy.getFullYear() - this.nacimiento.getFullYear();
  },

  saludar() {
    return `Hola, me llamo ${this.nombre} y me gusta ${this.hobbies.join(", ")}`;
  },
};

console.log(persona1.saludar());
console.log("Edad:", persona1.edad);

function Persona(nombre, nacimiento, hobbies) {
  this.nombre = nombre;
  this.nacimiento = nacimiento;
  this.hobbies = hobbies;
}

// Métodos en prototype (IMPORTANTE)
Persona.prototype.saludar = function () {
  return `Hola, me llamo ${this.nombre} y me gusta ${this.hobbies.join(", ")}`;
};

Object.defineProperty(Persona.prototype, "edad", {
  get: function () {
    const hoy = new Date();
    return hoy.getFullYear() - this.nacimiento.getFullYear();
  },
});

// Prueba
const p2 = new Persona("Ana", new Date(2000, 5, 10), ["leer"]);
console.log(p2.saludar());
console.log(p2.edad);

class PersonaES6 {
  constructor(nombre, nacimiento, hobbies) {
    this.nombre = nombre;
    this.nacimiento = nacimiento;
    this.hobbies = hobbies;
  }

  get edad() {
    const hoy = new Date();
    return hoy.getFullYear() - this.nacimiento.getFullYear();
  }

  saludar() {
    return `Hola, me llamo ${this.nombre} y me gusta ${this.hobbies.join(", ")}`;
  }
}

// Prueba
const p3 = new PersonaES6("Luis", new Date(1995, 2, 20), ["fútbol"]);
console.log(p3.saludar());
console.log(p3.edad);