export function crearFormulario(){
document.querySelector("#formulario").innerHTML = `
    <form clas="form" name="id" id="form">
    <input type="hidden" name="id" id="idInput">
    <label>Servicio</label>
    <input name="servicio">
    <label>Descripcion</label>
    <textarea name="descripcion"></textarea>
    <label>Cliente</label>
    <input name="cliente">
    <label>Monto</label>
    <input name="monto" tye="number">
    <label>Estado</label>
    <select name="estado">
    <option>Pendiente</option>
    <option>Cobrado</option>
    <option>Cancelado</option>
    </select>
 
    <label>Email</label>
    <input name="email" type="email">
    <label>Fecha</label>
    <input type ="date" name="fecha">
    <button type="submit">Guardar</button">
`;
}
