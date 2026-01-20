import { crearlayout } from "./layout.js";
import { crearVistaFormulario } from "./vistaFormulario.js";
import { crearVistaListado } from "./vistaListado.js";
import { crearVistaFiltros } from "./vistaFiltros.js";
import { crearVistaHerramientas } from "./vistaHerramientas.js";
import { validarReserva } from "./validaciones.js";
import { buscar, filtrarEstado, ordenar } from "./filtros.js";
import { obtenerReservasApi } from "./apiReservas.js";
import { renderizarReservas } from "./ui.js";

import { 
    obtenerReservas, 
    crearReservas, 
    actualizarReservas, 
    eliminarReservas, 
    crearNextId, 
    guardarReservas 
} from "./bdReservas.js";

let reservas = [];
let reservaseleccionadaId = null;



document.addEventListener("DOMContentLoaded", () =>{
        crearlayout();
        crearVistaFormulario();
        crearVistaListado();
        crearVistaFiltros();
        crearVistaHerramientas();

        iniciarMenu();
        iniciarFormulario();
        iniciarListado();
        iniciarFiltros();
        iniciarHerramientas();
        iniciarApi();
    crearReservas({
    nombre: "Reserva prueba",
    precio: 50,
    estado: "activa"
});
console.log(obtenerReservas());
         reservas = obtenerReservas();
        // const listaReservas = document.querySelector("#listaReservas");
        // renderizarReservas(reservas, listaReservas);
        render();
});

function iniciarMenu(){
    const botones = document.querySelectorAll("[data-vista]");
    const vistas = document.querySelectorAll(".vista");

    botones.forEach(boton =>{
        boton.addEventListener("click", ()=>{
            vistas.forEach(v => v.style.display = "none");
            
            document.querySelector(`#vista-${boton.dataset.vista}`).style.display = "block";
          
            
            console.log(boton.dataset.vista);
            botones.forEach(b=>b.classList.remove("menu__activo"));

            boton.classList.add("menu__activo");
        });

        
    });
}


function iniciarFormulario(){
    const form = document.querySelector("#formulario");
    const idInput = document.querySelector("#id");

    form.addEventListener("submit", e=>{
        e.preventDefault();

        const datos = new FormData(form);
        const reserva = Object.fromEntries(datos.entries());

        reserva.precio = Number(reserva.precio);

         if (reserva.id) {
        reserva.id = Number(reserva.id);
    }

        validarReserva(reserva, error => {
            if(error ){
                alert(error);
                return;
            }

            

            if(reserva.id){
                actualizarReservas(reserva);
            } else {
                crearReservas(reserva);
            }

            form.reset();
            idInput.value = "";
            reservaseleccionadaId = null;
            reservas = obtenerReservas();
            render();
        })
    })
}

function iniciarListado (){

    const lista = document.querySelector("#listaReservas");

    lista.addEventListener("click", e =>{
        const card = e.target.closest(".reserva");
        if(!card) return;

        const id = Number(card.dataset.id);

        reservaseleccionadaId = id;

        const select = document.querySelectorAll(".reserva");

        select.forEach(r => r.classList.remove("reserva--seleccionada"));

        card.classList.add("reserva--seleccionada");

        const reserva = reservas.find(r => r.id === id);

        if(!reserva) return;

        Object.entries(reserva).forEach(([K,V])=>{
            const campo = document.querySelector(`#formulario [name = "${K}"]`);
            if(campo) campo.value = V;
        });

        document.querySelector("#id").value = reserva.id;
    });

    document.addEventListener("keydown", e =>{
        if(e.key === "Delete" && reservaseleccionadaId){
            if(confirm("Desea eliminar")){
                eliminarReservas(reservaseleccionadaId);
                reservaseleccionadaId = null;
                reservas = obtenerReservas();
                render();
            }
        }
    });
}

function iniciarFiltros(){
    const inputBuscar = document.querySelector("#buscarReservas");
    const filtrar = document.querySelector("#filtrarEstado");
    const selectOrdenar = document.querySelector("#ordenarPor");

    [inputBuscar, filtrar, selectOrdenar].forEach(el => 
        el.addEventListener("input", render)
    )
}

function iniciarHerramientas(){
    const btnExportar = document.querySelector("#exportar");
    const inputImportar = document.querySelector("#importar");

    btnExportar.addEventListener("click", ()=>{
        const blob = new Blob(
            [JSON.stringify(reservas, null, 2)],
            {type: "application/json"}
        )
        const enlace = document.createElement("a");
    enlace.href = URL.createObjectURL(blob);
    enlace.download = "reservas.json";
    enlace.click();
    });

    

    inputImportar.addEventListener("change", e => {
        const archivo = e.target.files[0];
        if(!archivo) return;

        const lector = new FileReader();
        lector.onload = () => {
            try {
                const datos = JSON.parse(lector.result)
                datos.forEach(r=> crearReservas(r));
                reservas = obtenerReservas();
                render();
            } catch (error) {
                alert("archivo JSON no valido");
            }
        };
        lector.readAsText(archivo);
    });
}

function iniciarApi(){
    const btnApi = document.querySelector("#btnApi");

    btnApi.addEventListener("click", async()=>{
        try {
            const datosApi = await obtenerReservasApi();

            datosApi.forEach(r=> crearReservas(r));
            reservas = obtenerReservas();
            render();
        } catch (error) {
            alert("Error al cargar la data del api");
            console.log(error);
        }
    })
}

function render(){
    let resultado = [...reservas];

    const texto = document.querySelector("#buscarReservas").value;
    const estado = document.querySelector("#filtrarEstado").value;
    const campoOrden = document.querySelector("#ordenarPor").value;

    resultado = buscar(resultado, texto);
    resultado = filtrarEstado(resultado, estado);
    resultado = ordenar(resultado, campoOrden);

    renderizarReservas(resultado, document.querySelector("#listaReservas"));
}