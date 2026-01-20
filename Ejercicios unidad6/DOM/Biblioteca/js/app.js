import { crearFormulario } from "./vistaFormulario.js";



import { crearLayout } from "./layout.js";
import { renderizarLibros } from "./ui.js";
import { crearFiltros } from "./vistaFiltros.js";
import { obtenerLibros, crearLibros, eliminarLibros, actualiarLibros } from "./apiLibros.js";


let libros = [];

document.addEventListener("DOMContentLoaded", async () => {
   
   try {
    libros = await obtenerLibros();
   } catch (error) {
     alert(error.message);
     libros=[];
   }
    

 
   
    // libros = [{
    //     id: "1",
    //     titulo:"Los ",
    //     autor: "jino",
    //     isbn: "121222434343",
    //     anio: "2020",
    //     estado: "disponible" | "prestado" ,
    //     fecha: "2020-12-21"


    // }];

crearLayout();
crearFiltros();
    crearFormulario();
    iniciarFormulario();
    iniciarListado();
    
    renderizarLibros(libros);

});


function iniciarFormulario(){
    const form = document.querySelector("#form");
    const idInput = document.querySelector("#idInput");

    form.addEventListener("submit", async (e)=>{
        e.preventDefault();

        const data = new FormData(form);
        const libro = Object.fromEntries(data.entries());
        try {
              if(libro.id){
           await actualiarLibros(libro);
           libros = libros.map(l=>l.id === libro.id ? libro: l);
        } else {
            //libro.id = Date.now().toString();
           const nuevo =  await crearLibros(libro);
            libro.id = nuevo.id.toString()
            libros.push(libro);
            
        } 
        } catch (error) {
           alert(error.message);
        }
     

        form.reset();
        renderizarLibros(libros);
        idInput.value = "";
    })
}

function iniciarListado(){
    const listado = document.querySelector("#listado");
    const form = document.querySelector("#form");
    const idInput = document.querySelector("#idInput");
    listado.addEventListener("click", async (e)=>{
        const card = e.target.closest(".libro");
        if(!card)return;
        const id = card.dataset.id;

        if(e.target.classList.contains("btn--editar")){
            const libro = libros.find(l => l.id === id);
            if(!libro) return;
            Object.entries(libro).forEach(([K,V])=>{
                const campo = form.querySelector(`[name="${K}"]`);
                if(campo) campo.value = V;
            })
            idInput.value = libro.id;
        }

        if(e.target.classList.contains("btn--delete")){
            if(confirm("desea eliminar")){
                try {
                    await eliminarLibros(id);
                    libros =  libros.filter(l => l.id !== id);
                     renderizarLibros(libros);
                } catch (error) {
                    alert(e.message);
                }
               
            }
        }
        
    })
}
