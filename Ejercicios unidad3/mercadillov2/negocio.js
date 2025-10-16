"use strict"

window.$negocio =(()=>{
    const inventario = Object.create(null);
    const normalizarClave =(s) => (s??"").trim().toLowerCase();
    const aLista = () => Object.entries(inventario)
        .map (([ _,v]) => ({
            nombre: v.nombre,
            cantidad: v.cantidad,
            precio: Number(v.precio),
            categoria: v.categoria,
            total: Number((v.cantidad*v.precio).toFixed(2))

        }));
    return {
        agregarProducto(nombre, cantidad, precio, categoria){
          const key   = normalizarClave(nombre);
          if(!key) { alert("Debe indicar el nombre de un producto"); return null;}
          if(inventario[key]){ alert("El producto ya existe"); return null;}

          const cant = Number(cantidad) || 0;
          const pvp = Number(precio) || 0.0;
          const cat = (categoria ?? "").toString().trim() || "General";

          inventario[key]= {nombre: nombre.trim(), cantidad: cant, precio: pvp, categoria: cat };
          alert("Producto añadido correctamente");
          return aLista();
        },

        imprimirInventario(){
            return aLista();
        }

    }
       
})();