'use strict'; 

// ==========================
// 🧱 CLASE CONCESIONARIO
// ==========================
class Concesionario {
  constructor(nombre, ciudad, telefono) {
    this.nombre = nombre;
    this.ciudad = ciudad;
    this.telefono = telefono;
  }

  crearFormulario() {
    return `
      <form id="formConcesionario">
        <input placeholder="Nombre" name="nombre">
        <input placeholder="Ciudad" name="ciudad">
        <input placeholder="Teléfono" name="telefono">
        <button type="submit">Guardar</button>
      </form>
    `;
  }

  registrar(datos) {
    console.log("✅ Concesionario creado:", datos);
  }
}

// ==========================
// 🚗 CLASE VEHÍCULO
// ==========================
class Vehiculo {
  constructor(marca, modelo, precio, disponible = true) {
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
    this.disponible = disponible;
  }

  crearFormulario() {
    return `
      <form id="formVehiculo">
        <input placeholder="Marca" name="marca">
        <input placeholder="Modelo" name="modelo">
        <input placeholder="Precio" name="precio" type="number">
        <button type="submit">Guardar</button>
      </form>
    `;
  }

  registrar(datos) {
    console.log("✅ Vehículo registrado:", datos);
  }
}

// ==========================
// 👤 CLASE CLIENTE
// ==========================
class Cliente {
  constructor(nombre, dni, telefono) {
    this.nombre = nombre;
    this.dni = dni;
    this.telefono = telefono;
  }

  crearFormulario() {
    return `
      <form id="formCliente">
        <input placeholder="Nombre" name="nombre">
        <input placeholder="DNI" name="dni">
        <input placeholder="Teléfono" name="telefono">
        <button type="submit">Guardar</button>
      </form>
    `;
  }

  registrar(datos) {
    console.log("✅ Cliente registrado:", datos);
  }
}

// ==========================
// ⚙️ FUNCIÓN obtenerClase()
// ==========================
function obtenerClase(tipo) {
  const clases = {
    concesionario: Concesionario,
    vehiculo: Vehiculo,
    cliente: Cliente
  };
  return clases[tipo] || null;
}

// ==========================
// 🔁 FUNCIÓN AUTOINVOCADA $concesionario
// ==========================
const $concesionario = (function () {
  let datos = {};

  async function cargarDatos() {
    const res = await fetch('datos.json');
    datos = await res.json();
    console.log("📦 Datos cargados desde el archivo datos.json:", datos);
  }

  function buscar(tipo, filtro) {
    const lista = datos[`${tipo}s`] || [];
    return lista.filter(e =>
      JSON.stringify(e).toLowerCase().includes(filtro.toLowerCase())
    );
  }

  function alquilarVehiculo(idVehiculo, idCliente) {
    const vehiculo = datos.vehiculos.find(v => v.id === idVehiculo);
    if (vehiculo && vehiculo.disponible) {
      vehiculo.disponible = false;
      console.log(`🚘 Vehículo ${vehiculo.marca} alquilado al cliente ${idCliente}`);
    } else {
      console.log("❌ Vehículo no disponible o no encontrado");
    }
  }

  return {
    init: cargarDatos,
    buscar,
    alquilarVehiculo
  };
})();

// ==========================
// 🚀 INICIO DEL PROGRAMA
// ==========================
document.querySelectorAll('button[data-tipo]').forEach(btn => {
  btn.addEventListener('click', e => {
    const tipo = e.target.dataset.tipo; // "vehiculo", "cliente" o "concesionario"
    const ClaseSeleccionada = obtenerClase(tipo);
    const instancia = new ClaseSeleccionada();
    const formHTML = instancia.crearFormulario();

    // Inserta el formulario dentro del contenedor principal
    e.target.closest('body').querySelector('#formulario').innerHTML = formHTML;

    // Selecciona el formulario recién creado
    const form = document.querySelector(
      `#form${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`
    );

    // Escucha el envío del formulario
    form.addEventListener('submit', ev => {
      ev.preventDefault(); // Evita que recargue la página
      const datos = Object.fromEntries(new FormData(form));
      instancia.registrar(datos);
    });
  });
});

// Cargar el archivo JSON al inicio
$concesionario.init();
