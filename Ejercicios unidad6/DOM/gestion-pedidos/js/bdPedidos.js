


const key = "pedidos";

export function obtenerPedidos(){
    return JSON.parse(localStorage.getItem(key))||[];
}

export function guardarPedidos(pedidos){
    localStorage.setItem(key, JSON.stringify(pedidos));

}
 export function crearPedido (pedido){
    const pedidos = obtenerPedidos();
    pedido.id = Date.now().toString();
    pedidos.push(pedido);
    guardarPedidos(pedidos);
}

 export function editarPedido (pedido) {
   const pedidos =  obtenerPedidos().map(p => p.id === pedido.id?pedido:p);
   guardarPedidos(pedidos);
}

export function eliminarPedido (id){
    const pedidos = obtenerPedidos().filter(p => p.id !== id);
   
    guardarPedidos(pedidos);
}