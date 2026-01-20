const key = "ventas";

export function guardarVentas(ventas){
    localStorage.setItem(key, JSON.stringify(ventas));
}
export function obtenerVentas(){
    return JSON.parse(localStorage.getItem(key))||[];
}

export function actualizarVenta(venta){
    const ventas = obtenerVentas().map(v => v.id === venta.id?venta:v);
    guardarVentas(ventas);
    return ventas;
}

export function crearVenta(venta){
    const ventas = obtenerVentas();
    venta.id = Date.now().toString();
    ventas.push(venta);
    guardarVentas(ventas);
    return ventas;
}

export function eliminarVenta(id){
    const ventas = obtenerVentas().filter(v => v.id !== id);
    guardarVentas(ventas);
    return ventas;
}