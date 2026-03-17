let inventario = {
    manzanas: { cantidad: 10, precio: 1.5, categoria: "fruta" },
    naranjas: { cantidad: 20, precio: 1.0, categoria: "fruta" },
    pan: { cantidad: 15, precio: 2.0, categoria: "panadería" },
    leche: { cantidad: 30, precio: 0.8, categoria: "lácteos" }
};

console.log("Inventario inicial:");
for (let producto in inventario) {
    console.log(`${producto}: ${inventario[producto].cantidad} unidades, $${inventario[producto].precio} cada una, categoría: ${inventario[producto].categoria}`);
}
// Agregar un nuevo producto
inventario.huevos = { cantidad: 50, precio: 0.2, categoria: "lácteos" };
console.log("\nInventario después de agregar huevos:");
for (let producto in inventario) {
    console.log(`${producto}: ${inventario[producto].cantidad} unidades, $${inventario[producto].precio} cada una, categoría: ${inventario[producto].categoria}`);
}

console.log(inventario.manzanas); // Imprime "fruta"

console.log(inventario['manzanas']); // Imprime "fruta"