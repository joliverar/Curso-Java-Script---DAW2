export function validarPedido(pedido, callback){

    if(!pedido.cliente?.trim()){
        return callback("El cliente es obligatorio");
    }
    if(!pedido.producto?.trim() || pedido.producto.trim().length < 10){
        return callback("El producto debe tener ms de 10 caracteres");
    }

    if(isNaN(pedido.cantidad) || pedido.cantidad < 0){
        return callback("La cantidad debe ser positiva");
    }

    if(!pedido.fecha){
        return callback("la fecha es obligatoria");
    }

    callback(null);


}