export function crearFormulario() {
    document.querySelector("#formulario").innerHTML = `
        <form class="form" id="form">
            <input type="hidden" name="id" id="idInput">

            <label>Servicio</label>
            <input name="servicio">

            <label>Descripción</label>
            <textarea name="descripcion"></textarea>

            <label>Cliente</label>
            <input name="cliente">

            <label>Monto</label>
            <input name="monto" type="number">

            <label>Estado</label>
            <select name="estado">
                <option value="">-- Seleccionar --</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cobrado">Cobrado</option>
                <option value="Cancelado">Cancelado</option>
            </select>

            <label>Email</label>
            <input name="email" type="email">

            <label>Fecha</label>
            <input type="date" name="fecha">

            <button type="submit">Guardar</button>
        </form>
    `;
}
