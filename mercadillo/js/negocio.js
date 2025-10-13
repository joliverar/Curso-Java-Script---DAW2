
"use strict"; // Activa el modo estricto para prevenir errores silenciosos y malas prácticas


// IIFE = Inmediately Invoked Function Expression: se define y ejecuta al instante
// Asignamos el resultado (la API pública) al objeto global window como $negocio
window.$negocio = (() => { // Abre la IIFE y empieza el ámbito privado del módulo
// "inventario" actúa como nuestra base de datos en memoria
// Object.create(null) crea un objeto SIN prototipo → más seguro como mapa/tabla hash
const inventario = Object.create(null); // clave: nombre normalizado, valor: objeto producto


// normalizaClave: transforma un string a un formato uniforme para usarlo como clave
// - Si s es null/undefined, usa ""
// - trim() elimina espacios al inicio/fin
// - toLowerCase() lo pasa a minúsculas (comparaciones case-insensitive)
const normalizaClave = (s) => (s ?? "").trim().toLowerCase(); // Devuelve clave consistente


// aLista: convierte el objeto inventario en un array de filas listo para la UI
// Object.entries(inventario) → [[clave, valor], ...]
// .map(...) transforma cada entrada a un objeto con campos visibles en la tabla
const aLista = () => Object.entries(inventario) // Itera pares [k, v]
.map(([_, v]) => ({ // Ignoramos la clave (ya no necesaria en la UI)
nombre: v.nombre, // Copiamos el nombre mostrado
categoria: v.categoria, // Categoría textual
cantidad: v.cantidad, // Cantidad en stock (número)
precio: Number(v.precio), // Precio unitario (número)
total: Number((v.cantidad * v.precio).toFixed(2)) // Total = cantidad*precio con 2 decimales
})); // Devuelve array de objetos homogéneos


// Retornamos la API pública del módulo de negocio
return { // Métodos CRUD y consultas
// CREATE: agrega el producto si no existía
agregarProducto(nombre, cantidad, precio, categoria) { // Firma del método
const key = normalizaClave(nombre); // Normalizamos el nombre para usarlo como clave
if (!key) { alert("⚠️ Debes indicar un nombre de producto."); return null; } // Validación básica
if (inventario[key]) { alert("❌ El producto ya existe."); return null; } // Evita duplicado


const cant = Number(cantidad) || 0; // Convierte cantidad a número (0 si NaN/null)
const pvp = Number(precio) || 0; // Convierte precio a número (0 si NaN/null)
const cat = (categoria ?? "").toString().trim() || "General"; // Categoría con valor por defecto


// Insertamos el registro en la "BD" en memoria
inventario[key] = { nombre: nombre.trim(), cantidad: cant, precio: pvp, categoria: cat }; // Alta
alert("✅ Producto añadido correctamente."); // Feedback al usuario
return aLista(); // Devolvemos el listado completo para que la UI lo pinte
}, // Fin CREATE


// DELETE: elimina un producto existente
eliminarProducto(nombre) { // Firma del método
const key = normalizaClave(nombre); // Normalizamos para buscar la clave
if (!inventario[key]) { alert("❌ El producto no existe."); return null; } // Si no existe, avisamos
delete inventario[key]; // Borrado del registro
alert("🗑️ Producto eliminado."); // Feedback
return aLista(); // Devolvemos lista actualizada
}, // Fin DELETE


// READ (unitario): devuelve una lista con un único elemento (para reusar el mismo render)
buscarProducto(nombre) { // Firma del método
const key = normalizaClave(nombre); // Clave normalizada
const v = inventario[key]; // Leemos el registro
if (!v) { alert("🔎 No se encontró el producto."); return null; } // No encontrado
// Devolvemos array de 1 para que el render que espera arrays pueda funcionar igual
return [{ nombre: v.nombre, categoria: v.categoria, cantidad: v.cantidad, precio: v.precio, total: Number((v.cantidad * v.precio).toFixed(2)) }];
}, // Fin READ unitario


// UPDATE: incrementa/decrementa la cantidad con el delta indicado
actualizarInventario(nombre, cantidad) { // Firma del método
const key = normalizaClave(nombre); // Clave
const v = inventario[key]; // Registro
if (!v) { alert("❌ El producto no existe."); return null; } // Validación de existencia
const delta = Number(cantidad) || 0; // Diferencia a aplicar (puede ser negativa)
v.cantidad = Math.max(0, v.cantidad + delta); // Nunca por debajo de 0
if (v.cantidad === 0) { alert("⚠️ Stock en 0. Considera reponer."); } // Aviso de reposición
return aLista(); // Lista resultante
}, // Fin UPDATE


// READ (lista ordenada): devuelve nuevo array ordenado por precio ascendente
ordenarProductosPorPrecio() { // Firma del método
return aLista().sort((a, b) => a.precio - b.precio); // Comparator simple ascendente
}, // Fin READ ordenado


// READ (lista completa): devuelve todo el inventario
imprimirInventario() { // Firma del método
return aLista(); // Simplemente proyecta inventario a lista
}, // Fin READ completo


// READ (filtrado): devuelve productos de una categoría (case-insensitive)
filtrarProductosPorCategoria(categoria) { // Firma del método
const cat = normalizaClave(categoria); // Normalizamos la categoría de entrada
return aLista() // Partimos de la lista completa
.filter(p => normalizaClave(p.categoria) === cat) // Nos quedamos con coincidencias exactas por clave normalizada
.map(p => ({ nombre: p.nombre, cantidad: p.cantidad, precio: p.precio })); // Devolvemos sólo los campos requeridos
} // Fin READ filtrado
}; // Fin API pública
})(); // Cierra y ejecuta la IIFE

