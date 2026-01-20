'use strict';

export function buscarReservas(list, text){
    if(!text) return list;
    const q = text.toLowerCase();
    return list.filter(r => r.cliente.toLowerCase().includes(q) || r.servicio.toLowerCase().includes(q));
}
export function filtrarEstados(list, estado){
    if(!estado) return list;
    return list.filter(r => r.estado === estado);
}
export function ordenarReservas(list, field){
    if(!field) return list;
    return [...list].sort((a,b)=>{
        if(field ==="fecha"){
            return new Date(a.fecha) - new Date(b.fecha);
        }
        return a[field].localeCompare(b[field]);
    })

}