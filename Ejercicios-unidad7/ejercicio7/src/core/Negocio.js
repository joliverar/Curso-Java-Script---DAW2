import cochesPrueba from "./coches.js";
import usuarios from "./usuarios.js";

const $negocio = (function () {
  //inicializamos los datos de coches
  //localStorage.clear();
  if (!localStorage.getItem("coches")) {
    localStorage.setItem("coches", JSON.stringify(cochesPrueba));    
  }
  let coches = JSON.parse(localStorage.getItem("coches"));

  function obtenerSiguienteId() {
    let maxId = Math.max(...coches.map(coche => coche.id), 0);
    let siguiente = maxId + 1;
    return siguiente;
  }

  async function obtenerCoches(filtro="", inicio=0, limite) {
    let filtrados = coches;
    if (filtro != "") {
      filtro=filtro.toLowerCase();
      filtrados = filtrados.filter(coche => {
          //para cada propiedad del objeto compruebo si "alguna" incluye el filtro
          return Object.keys(coche).some(key => {
            // console.log(coche[key].toString().toLowerCase(), "-" ,filtro);
            return coche[key] && coche[key].toString().toLowerCase().includes(filtro);
        });
      });
    }

    if(inicio>0){
        filtrados = filtrados.slice(inicio);
    }

    if (limite !== undefined) {
      filtrados = filtrados.slice(0, limite);
    }

    return filtrados;
  }

  async function obtenerCoche(cocheId) {
    let index = coches.findIndex((c) => c.id == cocheId);
    if (index !== -1) {
      return coches[index];
    }
    return null;
  }

  async function crearCoche(objCoche) {
    objCoche.id = obtenerSiguienteId();
    coches.push(objCoche);
    localStorage.setItem("coches", JSON.stringify(coches));
    return objCoche.id;
  }

  async function actualizarCoche(objCoche) {
    let index = coches.findIndex((c) => c.id == objCoche.id);
    if (index !== -1) {
      coches[index] = objCoche;
      localStorage.setItem("coches", JSON.stringify(coches));
      return true;
    }
    return false;
  }

  async function eliminarCoche(cocheId) {
    let index = coches.findIndex((c) => c.id == cocheId);
    if (index !== -1) {
      coches.splice(index, 1);
      localStorage.setItem("coches", JSON.stringify(coches));
      return true;
    }
    return false;
  }

  async function limpiarLocalStorage() {
    localStorage.removeItem("coches");    
  }

  async function validarUsuario(username, password) {
    let resultados = usuarios.filter(
      (usuario) =>
        usuario.username === username && usuario.password === password
    );
    if (resultados.length === 1) {
      return resultados[0];
    }
    return false;
  }

  return {
    obtenerCoches,
    obtenerCoche,
    crearCoche,
    actualizarCoche,
    eliminarCoche,
    validarUsuario,
    limpiarLocalStorage,
  };
})();

//Creo una variable global para $negocio
//$negocio debería estar disponible en ficheros JS
window.$negocio = $negocio;
//En JSX debes importar el objeto....
export default $negocio;


/**
 * LAS SIGUIENTES FUNCIONES NO LAS NECESITAS, SON PRUEBAS PARA
 * COMPROBAR QUE EL NEGOCIO FUNCIONA
 *  */ 
export function pruebas(){
    // Limpiar localStorage para empezar con un estado limpio
    $negocio.limpiarLocalStorage().then(() => {
        console.log("LocalStorage limpiado");

        // Crear un coche
        $negocio.crearCoche({ marca: "Toyota", modelo: "Corolla" }).then((id) => {
            console.log("Coche creado con ID:", id);

            // Obtener todos los coches
            $negocio.obtenerCoches().then((coches) => {
                console.log("Coches obtenidos:", coches);

                // Obtener un coche por ID
                $negocio.obtenerCoche(id).then((coche) => {
                    console.log("Coche obtenido:", coche);

                    // Actualizar el coche
                    coche.modelo = "Camry";
                    $negocio.actualizarCoche(coche).then((actualizado) => {
                        console.log("Coche actualizado:", actualizado);

                        // Eliminar el coche
                        $negocio.eliminarCoche(id).then((eliminado) => {
                            console.log("Coche eliminado:", eliminado);

                            // Validar usuario
                            $negocio.validarUsuario("usuario1", "password1").then((usuario) => {
                                console.log("Usuario validado:", usuario);
                            });

                            $negocio.validarUsuario("laura", "passl").then((usuario) => {
                                console.log("Usuario validado:", usuario);
                            });
                        });
                    });
                });
            });
        });
    });
}

export function pruebasBuscar(){
    // Obtener coches sin filtro
    $negocio.obtenerCoches().then((coches) => {
        console.log("Coches sin filtro:", coches);
    });

    // Obtener coches con filtro por marca
    $negocio.obtenerCoches("Toyota").then((coches) => {
        console.log("Coches filtrados por marca 'Toyota':", coches);
    });

    // Obtener coches con filtro por modelo
    $negocio.obtenerCoches("Corolla").then((coches) => {
        console.log("Coches filtrados por modelo 'Corolla':", coches);
    });

    // Obtener coches con filtro por marca y modelo
/*     $negocio.obtenerCoches({ marca: "Toyota", modelo: "Corolla" }).then((coches) => {
        console.log("Coches filtrados por marca 'Toyota' y modelo 'Corolla':", coches);
    }); */

    // Obtener coches con límite
    $negocio.obtenerCoches("", 0, 2).then((coches) => {
        console.log("Primeros 2 coches:", coches);
    });

    // Obtener coches con inicio y límite
    $negocio.obtenerCoches("", 1, 2).then((coches) => {
        console.log("Coches desde el segundo, con límite de 2:", coches);
    });
}