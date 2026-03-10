'use strict'

function crearVeriables() {
    let nombre = 'Juan';
    let apellido = 'Perez';
    let edad = 32;
    let nacimiento = 2014

    alert(`nombre:"${nombre}\n"Apellido:"${apellido}\n"Edad:'${edad}\n'Nacimiento:'${nacimiento}'`);

    alert(`${nombre}\n${apellido}`);

    let suma = edad+nacimiento;

    alert(suma);
    
    let sumaVariables  = nombre + apellido + edad + nacimiento;

    alert("suma de todas las variables: "+sumaVariables);
}

crearVeriables();
