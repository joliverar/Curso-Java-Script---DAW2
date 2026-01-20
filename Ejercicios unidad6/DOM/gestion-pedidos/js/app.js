import { crearLayout } from "./layout.js";
import { renderizarPedidos } from "./ui.js";
import { crearFormulario } from "./formulario.js";
import { validarPedido } from "./validaciones.js";
import { obtenerPedidosApi } from "./apiPedidos.js";
import { crearPedido, editarPedido, eliminarPedido, obtenerPedidos, guardarPedidos } from "./bdPedidos.js"

import { crearFiltros } from "./vistaFiltros.js";

let pedidos = [];
document.addEventListener("DOMContentLoaded", ()=>{

pedidos = obtenerPedidos();

    if (pedidos.length === 0) {
        pedidos = [{
            id:"1",
            cliente: "Jino Olivera",
            producto: "Laptop",
            cantidad: 3,
            estado: "pendiente",
            fecha: "2023-12-12"
        }];
        guardarPedidos(pedidos);
    }
    



    crearLayout();
    crearFormulario();
    crearFiltros();
    iniciarFormulario();
    iniciarListado();
    iniciarApi();
   
 

    iniciarFiltros();
    renderizarPedidos(pedidos);



});

function iniciarFormulario(){

    const form = document.querySelector("#form");
    form.addEventListener("submit", (e) =>{
    e.preventDefault();

    const data = new FormData(form);
    const pedido = Object.fromEntries(data.entries());

    pedido.cantidad = Number(pedido.cantidad);
        let hayError = false;
    validarPedido(pedido, error =>{
        if(error){
            alert(error)
             hayError = true;
        }
       
    });

    if(hayError) return;

    if(pedido.id){
        editarPedido(pedido);
    } else {
        crearPedido(pedido);
    }

    form.reset();
     pedidos = obtenerPedidos();
    renderizarPedidos(pedidos);
});
}


function iniciarListado(){

    const lista = document.querySelector("#listaPedidos");
    const idInput = document.querySelector("#idInput");
    const form = document.querySelector("#form");

    lista.addEventListener("click", (e)=>{

    const card = e.target.closest(".pedido");
    console.log(card);
    if(!card) return;
    const id = card.dataset.id;
    console.log(id);

    if(e.target.classList.contains("btn--editar")){
        const pedido = pedidos.find(p => p.id === id);
        if(!pedido) return;
        Object.entries(pedido).forEach(([K, V])=>{
            const campo = form.querySelector(`[name="${K}"]`);
            if(campo) campo.value = V;
        })
        idInput.value = pedido.id;
        
    }

    if(e.target.classList.contains("btn--delete")){
        if(confirm("desea eliminar")){
            
            eliminarPedido(id);
             pedidos = obtenerPedidos();
            renderizarPedidos(pedidos);
        }
    }
    

});

}

function iniciarFiltros(){
    const buscar = document.querySelector("#buscar");
    const filtrar = document.querySelector("#filtrar");
    const ordenar = document.querySelector("#ordenar");

    buscar.addEventListener("input", aplicarfiltros);
    filtrar.addEventListener("change", aplicarfiltros);
    ordenar.addEventListener("change", aplicarfiltros);


}

function iniciarApi(){

    const btnApi = document.querySelector("#btnApi");

    btnApi.addEventListener("click", async () => {
            try {
        const datosApi = await obtenerPedidosApi();
        pedidos = datosApi;
        guardarPedidos(pedidos);
        aplicarfiltros();
    } catch (error) {
        alert("error al cargar los datos")
    }
    });

}

function aplicarfiltros(){

    
        let resultado = [...pedidos];

    resultado = buscarPedido(resultado, buscar.value);
    resultado = filtrarPedido(resultado, filtrar.value);
    resultado = ordenarPedido(resultado, ordenar.value);

    renderizarPedidos(resultado);

}

function buscarPedido(list, text){
    if(!text) return list;
    return pedidos.filter(p => p.cliente.toLowerCase().includes(text.toLowerCase()) || 
                                p.producto.toLowerCase().includes(text.toLowerCase()));
}
function ordenarPedido(list, campo){
    if(!campo) return list;

    return [...list].sort((a,b)=>{
        if(campo ==="fecha"){
            return new Date(a.fecha) - new Date(b.fecha);
        }
        return a[campo].localeCompare(b[campo]);
    })
}

function filtrarPedido(list, estado){
    if(!estado) return list;
    return list.filter(p => p.estado === estado);
}



