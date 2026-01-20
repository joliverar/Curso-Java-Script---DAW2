export function crearFormulario(){
document.querySelector("#formulario").innerHTML = `
    <form class="form" id="form">
    <input name="id" type="hidden" id="idInput">
    <label>Titulo</titulo>
    <input name="titulo">
    <label>Autor</titulo>
    <input name="autor">
    <label>ISBN</titulo>
    <input name="isbn">
    <label>Año</titulo>
    <input name="anio">
    <label>Estado</titulo>
    <select name="estado">
    <option>Disponible</option>
    <option>Prestado</option>
    </select>
    <label>Fecha Alta</titulo>
    <input name="fecha">
    <button type="submit">Guardar</button>

`;
}
