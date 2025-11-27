import { datosTareas } from "./tareas.js";

let tareas = [...datosTareas];

let nextId = Math.max(...tareas.map(t=> t.id))+1;


/* iniciar el SPA*/

const app = document.querySelector("#app");

iniciarApp();

function iniciarApp(){
    app.innerHTML = `
         <header class="header">
        <h1 class="titulo">Gestión de Tareas</h1>

        <nav class="menu">
            <button data-vista="inicio">Inicio</button>
            <button data-vista="tareas">Tareas</button>
            <button data-vista="nueva">Nueva Tarea</button>
        </nav>
         </header>
         <div id="vista"></div>  
    `;

    document.querySelectorAll("nav button").forEach(btn=>{
        btn.onclick = () => {
            if(btn.dataset.vista === "inicio") mostrarInicio();
            if(btn.dataset.vista === "tareas") mostrarListado();
            if(btn.dataset.vista === "nueva") mostrarFormulario();
        }
    });


    mostrarListado();
}

function mostrarInicio(){
   let html = `
 

        <!-- VISTA INICIO -->
        <section class="vista vista-inicio">
            <h2>Bienvenido</h2>
            <p>Sistema de gestión de tareas con CRUD completo.</p>
        </section>
  
   `;

   document.querySelector("#vista").innerHTML=html;
}



function mostrarListado(){


   let html = `
      

        <!-- LISTADO DE TAREAS (flex) -->
        <section class="vista vista-listado">
            <h2>Listado de Tareas</h2>

            <button onclick="mostrarFormulario()" class="btn btn-nueva">+ Nueva Tarea</button>

            <div class="lista-tareas">
                <div class="encabezado">
                    <div class="col">ID</div>
                    <div class="col">Título</div>
                    <div class="col">Descripción</div>
                    <div class="col">Fecha</div>
                    <div class="col">Prioridad</div>
                    <div class="col">Estado</div>
                    <div class="col">Acciones</div>
                </div>
                <!-- Tarjeta de tarea -->
        `;

    tareas.forEach(t=>{
        html+= ` <div class="tarea">
            <div class="col id">${t.id}</div>
            <div class="col titulo">${t.titulo}</div>
            <div class="col desc">${t.descripcion}</div>
            <div class="col fecha">${t.fecha}</div>
            <div class="col prioridad ${t.prioridad}">${t.prioridad}</div>
            <div class="col estado ${t.estado}">${t.estado}</div>

            <div class="acciones">
                
                <button onclick="mostrarFormulario(${t.id})" class="btn-editar">Editar</button>
                <button onclick="borrarTarea(${t.id})" class="btn-borrar">Borrar</button>
            </div>
        </div>
        `;
    });
                
       html+= `   
         </div>
        </section>
    
    `;

    document.querySelector("#vista").innerHTML = html;
}


function mostrarFormulario(id = null) {

    const tarea = id ? tareas.find(t => t.id == id) : null;

    let html = `
        <section class="vista vista-formulario">
            <h2>${!id ? "Nueva Tarea" : "Editar Tarea"}</h2>

            <form class="form" onsubmit="guardarTarea(event)">
            
                <input type="hidden" id="id" value="${tarea?.id ?? ""}">

                <label>Título</label>
                <input type="text" id="titulo" required value="${tarea?.titulo ?? ""}">

                <label>Descripción</label>
                <textarea id="descripcion">${tarea?.descripcion ?? ""}</textarea>

                <label>Fecha</label>
                <input type="date" id="fecha" required value="${tarea?.fecha ?? ""}">

                <label>Prioridad</label>
                <select id="prioridad">
                    <option value="alta" ${tarea?.prioridad==="alta"?"selected":""}>Alta</option>
                    <option value="media" ${tarea?.prioridad==="media"?"selected":""}>Media</option>
                    <option value="baja" ${tarea?.prioridad==="baja"?"selected":""}>Baja</option>
                </select>

                <label>Estado</label>
                <select id="estado">
                    <option value="pendiente" ${tarea?.estado==="pendiente"?"selected":""}>Pendiente</option>
                    <option value="completada" ${tarea?.estado==="completada"?"selected":""}>Completada</option>
                </select>

                <button type="submit" class="btn-guardar">Guardar</button>
            </form>
        </section>
    `;
    document.querySelector("#vista").innerHTML  = html;
}



// =============== CRUD ===============

window.guardarTarea = function(e){
    e.preventDefault();

    const id = document.querySelector("#id").value;

    const nuevo = {
        id: id? parseInt(id) : nextId++,
        titulo: document.querySelector("#titulo").value,
        descripcion: document.querySelector("#descripcion").value,
        fecha: document.querySelector("#fecha").value,
        prioridad: document.querySelector("#prioridad").value,
        estado: document.querySelector("#estado").value,
    };

    if(id) {
            const i = tareas.findIndex(t=>t.id==id);
            tareas[i] = nuevo;
    } else {
            tareas.push(nuevo);
    }

    mostrarListado();
}

window.borrarTarea = function(id){
    tareas = tareas.filter(t=>t.id !== id);
    mostrarListado();
}
window.mostrarFormulario = mostrarFormulario;
window.mostrarListado = mostrarListado;
window.mostrarInicio = mostrarInicio;
window.borrarTarea = borrarTarea;
window.guardarTarea = guardarTarea;
