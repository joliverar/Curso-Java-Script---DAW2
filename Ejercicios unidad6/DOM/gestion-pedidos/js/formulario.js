export function crearFormulario(){


    document.querySelector("#formulario").innerHTML =`
        <form class="form" id ="form">
            <input type="hidden" name="id" id="idInput">
            <label>Cliente</label>
            <input name="cliente">
            <label>Produco</label>
            <input name="producto">
            <label>Cantidad</label>
            <input name="cantidad" type="number">
            <label>Estado</label>
            <select name="estado">
            <option>Pendiente</option>
            <option>Enviado</option>
            <option>Cancelado</option>
            </select>
            <label>Fecha</label>
            <input name="fecha" type="date">
            <button type="submit" class="btn btn-guardar">Guardar</button>
        </form>

    `;
    console.log("aqui el formulario");
}