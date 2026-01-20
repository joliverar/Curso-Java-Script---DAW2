export function validarVenta(venta, callback){
    if(!venta.cliente?.trim()){
        return callback("El cliente es obligatorio");
   
    }

    callback(null);
}