
console.log(`la ventana de mi pantalla mide ${window.innerHeight}`);


let ventana ;
function abrirVentana () {
    ventana = window.open ("http://www.google.com", "Nueva ventana", "width= 500, height = 400")
}

function cerrarVentana() {
    if (ventana && !ventana.closed) {
        ventana = window.close();
    }
}

function saludar(){

    let nombre = prompt("Ingrese su nombre");
    alert(`Bienvenido ${nombre}`);
}

function saludo(){
    console.log('Hola');
}

function iniciar(){
    console.log('Iniciando timer');
    setTimeout(saludo, 5000);
}
