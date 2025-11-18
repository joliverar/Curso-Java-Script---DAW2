import { BD } from "./BD.js";

class gestionMecanica{
    #bd;
    #contenedor;

    constructor(){
        this.#bd = new BD();
    }

   



    iniciarAPP(selector){
        this.#contenedor  = document.querySelector(selector);

        if(!this.#contenedor){
            alert("El contenedor no existe");
        }

        // Pintar base
        this.#contenedor.innerHTML = this.generarHTMLBase();

        // Cargar vista inicial
        document.querySelector("#vista").innerHTML = this.generarHTMLInicio();

        // Delegación del menú
        this.configurarEventos();
    
    }

    generarHTMLBase(){
        return `
            <nav>
            <button data-action="inicio">Inicio</button>
            <button data-action="vehiculos">Vehiculos</button>
            </nav>

            <div id="vista"></div>
        `;


    }
        generarHTMLInicio(){
        return `
            <h1>Incio del taller mecanico</h1>
            <!-- Buscador por matricula o telefono-->
            <form id="form-buscar" data-form="buscar">
                <select id="tipo">
                 <option value="matricula">Matricula</option>
                 <option value="Telefono">Telefono</option>
                </select>
                <input type="text" name="valor" placeholder="Introduce el dato">
                <button type="submit">Buscar</button>
             </form>

             <div id="resultado-busqueda"></div>
        `
        ;
    
    }

configurarEventos(){

   
    // CLICK - MENÚ Y BOTONES CRUD

    document.addEventListener("click", e =>{
        const btn = e.target.closest("button[data-action]");
        if(!btn) return;

        const accion = btn.dataset.action;
        const id = Number(btn.dataset.id);

        // INICIO
        if(accion === "inicio"){
            return document.querySelector("#vista").innerHTML =
                this.generarHTMLInicio();
        }

        // LISTADO DE VEHÍCULOS
        if(accion === "vehiculos"){
            const vs = this.#bd.obtenerVehiculos();
            return document.querySelector("#vista").innerHTML =
             //   this.generarHTMLListadoDeVehiculos(vs);
                this.generarHTMLVehiculos2(vs)
        }

        // NUEVO VEHÍCULO
        if(accion === "nuevo-vehiculo"){
            return document.querySelector("#vista").innerHTML =
                this.generarHTMLFormularioVehiculo();
        }

        // VER VEHÍCULO
        if(accion === "ver-vehiculo"){
            const v = this.#bd.obtenerVehiculo("vehiculoId", id)[0];
            return document.querySelector("#vista").innerHTML =
                this.generarHTMLVehiculo(v);
        }

        // EDITAR VEHÍCULO
        if(accion === "editar-vehiculo"){
            const v = this.#bd.obtenerVehiculo("vehiculoId", id)[0];
            return document.querySelector("#vista").innerHTML =
                this.generarHTMLFormularioVehiculo(v);
        }

        // BORRAR VEHÍCULO
        if(accion === "borrar-vehiculo"){
            this.#bd.borrarVehiculo(id);
            const vs = this.#bd.obtenerVehiculos();
            return document.querySelector("#vista").innerHTML =
                this.generarHTMLListadoDeVehiculos(vs);
        }
    });



    // SUBMIT - BUSCADOR

    document.addEventListener("submit", e =>{
        const form = e.target.closest("form[data-form='buscar']");
        if(!form) return;

        e.preventDefault();

        const tipo = form.tipo.value;
        const valor = form.valor.value;

        const resultados = this.#bd.obtenerVehiculo(tipo, valor);

        document.querySelector("#resultado-busqueda").innerHTML = 
            this.generarHTMLVehiculos(resultados);
    });




    // SUBMIT - CRUD VEHÍCULOS
   
    document.addEventListener("submit", e =>{
        const form = e.target.closest("form[data-form]");
        if(!form) return;

        // Si NO es CRUD, no entra
        if(form.dataset.form === "buscar") return;

        e.preventDefault();

        const datos = Object.fromEntries(new FormData(form).entries());

        // CREAR
        if(form.dataset.form === "crear-vehiculo"){
            this.#bd.crearVehiculo({
                vehiculoId: this.#bd.siguienteVehiculoId,  //getter
                matricula: datos.matricula,
                marca: datos.marca,
                modelo: datos.modelo,
                propietario: {
                    nombre: datos["propietario-nombre"],
                    telefono: datos["propietario-telefono"]
                }
            });
        }

        // EDITAR
        if(form.dataset.form === "editar-vehiculo"){
            const vehId = Number(form.dataset.id);
            const v = this.#bd.obtenerVehiculo("vehiculoId", vehId)[0];

            v.matricula = datos.matricula;
            v.marca = datos.marca;
            v.modelo = datos.modelo;
            v.propietario.nombre = datos["propietario-nombre"];
            v.propietario.telefono = datos["propietario-telefono"];
        }

        // Redibujar listado
        const vs = this.#bd.obtenerVehiculos();
        document.querySelector("#vista").innerHTML =
            this.generarHTMLVehiculos2(vs);
    });

}



    generarHTMLVehiculos(vehiculos){
            if(vehiculos.length === 0){
                return `<p>no se encontraron vehiculos</p>`;
            }

            return `
                <h3>Resultados</h3>
                <ul>
                ${vehiculos.map(v=>`
                    <li>
                        <b>${v.matricula}</b> - ${v.propietario.nombre}
                        <button data-action="ver-vehiculo" data-id="${v.vehiculoId}">
                        ver
                        </button>
                    </li>
                    `).join("")}
                </ul>
            `;

    }

    generarHTMLListadoDeVehiculos(vehiculos){
        return `
            <h3> Listado de Vehiculos</h3>
            <button data-action="nuevo-vehiculo"> Nuevo Vehiculo</button>
            <ul>
                ${vehiculos.map(v=> `<li>
                    <b>${v.matricula}</b> - ${v.propietario.nombre}

                    <button data-action="ver-vehiculo" data-id="${v.vehiculoId}">
                    Ver 

                    </button>

                    <button data-action="editar-vehiculo" data-id="${v.vehiculoId}">
                    Editar
                    </button>

                    <button data-action="borrar-vehiculo" data-id="${v.vehiculoId}">
                    Borrar
                    </button>
                    </li>
                `).join("")}
            </ul>
        `;
    }

    generarHTMLVehiculos2(vehiculos){
        return `
            <h2>Listado de Vehiculos</h2>
            <button data-action="nuevo-vehiculo">Nuevo Vehiculo</button>

            <table border="1" cellpadding="6">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Matrícula</th>
                    <th>MArca</th>
                    <th>Modelo</th>
                    <th>propietario</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                
                ${vehiculos.map(v =>`
                    <tr>
                    <td>${v.vehiculoId}</td>
                    <td>${v.matricula}</td>
                    <td>${v.marca}</td>
                    <td>${v.modelo}</td>
                    <td>${v.propietario.nombre}(${v.propietario.telefono}</td>
                    <td>
                        <button data-action="ver-vehiculo" data-id="${v.vehiculoId}">Ver </button>
                        <button data-action="editar-vehiculo" data-id="${v.vehiculoId}">Editar </button>
                        <button data-action="Borrar-vehiculo" data-id="${v.vehiculoId}">Eliminar</button>
               
                    </td>
                    
                    </tr> 
                    `).join("")}
                 
                </tbody>

            </table>
        `;
    }

    generarHTMLVehiculo(vehiculo){
        return `
            <h2>Vehiculo: ${vehiculo.matricula}</h2>
            <p><b>Propietario</b>: ${vehiculo.propietario.nombre}</p>
            <p><b>Telefono</b>: ${vehiculo.propietario.telefono}</p>
            <p><b> Marca</b>: ${vehiculo.marca}</p>
            <p><b>Modelo</b>: ${vehiculo.modelo}</p>

            <button data-action="editar-vehiculo" data-id="${vehiculo.vehiculoId}">
                Editar
            </button>

            <button data-action="ver-reparaciones" data-id="${vehiculo.vehiculoId}">
                Ver reparaciones
            </button>
        `;
    }

    generarHTMLFormularioVehiculo(vehiculo = null){

        
        return `
            <h2>${vehiculo ? "Editar": "Nuevo"} Vehiculo </h2>

            <form data-form="${vehiculo ? "editar-vehiculo": "crear-vehiculo"}"
                    data-id="${vehiculo ? vehiculo.vehiculoId: ""}">
                <label>Matricula</label>
                <input name="matricula" value="${vehiculo?.matricula ?? ""}" required>

                <label>Marca</label>
                <input name="marca" value="${vehiculo?.marca ?? ""}" required>

                <label>Modelo</label>
                <input name="modelo" value="${vehiculo?.modelo ?? ""}" redquired>
                <fieldset>
                <legent>Propietario</legent>
                <label>Nombre</label>
                <input name="propietario-nombre" value="${vehiculo?.propietario.nombre ?? ""}" required>

                <label>Telefono</label>
                <input name="propietario-telefono" value="${vehiculo?.propietario.telefono?? ""}" required>
                </fielset>
                <button type="submit">Guardar</button>
            </form>
        `;
    }

    generarHTMLFormularioVehiculo2(vehiculo = null){
        return `
            <h2>Crear Vehiculo</h2>
            <form data-form="crear-vehiculo">
                <label>Matricula</label>
                <input name = "matricula" required>
                <label>Marca</label>
                <input name ="marca" required>
                <label>Modelo</label>
                <input name="modelo" required>
                <fieldset>
                <legend>Propietario</legend>
                <label>Nombre: </label>
                <input name="propietario-nombre" required>
                <label>Telefono: </label>
                <input name="propietario-telefono" required>

                </fieldset>
                <button type="submit">Guardar</button>
            </form>
        `;
    }

    
        
}






const app = new gestionMecanica();
app.iniciarAPP("#app");