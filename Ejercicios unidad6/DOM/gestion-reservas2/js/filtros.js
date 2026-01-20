'use strict';

export function buscar(lista, texto){
    if(!texto) return lista;
    const q = texto.toLowerCase();
    return lista.filter(r => 
        r.cliente.toLowerCase().includes(q) || r.descripcion.toLowerCase().includes(q));
}

export function filtrarEstado(lista, estado){
    if(!estado) return lista;
    return lista.filter(r => r.estado === estado);
}

export function ordenar(lista, campo){
    if(!campo) return lista;
    return [...lista].sort((a,b)=> 
        campo === "precio" ?
            a.precio - b.precio:
            a[campo].localeCompare(b[campo])
    );
}