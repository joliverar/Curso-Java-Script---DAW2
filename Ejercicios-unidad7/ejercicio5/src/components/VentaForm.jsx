import { useEffect, useState } from "react";

// Objeto base para limpiar o inicializar el formulario
const ventaVacia = {
  id: "",
  servicio: "",
  descripcion: "",
  cliente: "",
  monto: "",
  estado: "",
  email: "",
  fecha: ""
};

function VentaForm({ ventaEditando, onGuardar }) {

  // Estado que guarda TODOS los valores del formulario
  const [venta, setVenta] = useState(ventaVacia);

  // Se ejecuta cuando cambia la venta que se está editando
  useEffect(() => {
    if (ventaEditando) {
      // Si hay venta para editar → cargamos sus datos
      setVenta({ ...ventaEditando });
    } else {
      // Si no → limpiamos el formulario
      setVenta(ventaVacia);
    }
  }, [ventaEditando]);

  // Maneja los cambios de TODOS los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Actualiza solo el campo modificado
    setVenta(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Se ejecuta al enviar el formulario
  const submit = (e) => {
    e.preventDefault();       // Evita recarga de página
    onGuardar(venta);         // Envía la venta al componente padre
    setVenta(ventaVacia);    // Limpia el formulario
  };

  return (
    <form className="form" onSubmit={submit}>

      {/* Campo oculto para mantener el id al editar */}
      <input type="hidden" name="id" value={venta.id} />

      <label>Servicio</label>
      <input
        name="servicio"
        value={venta.servicio}
        onChange={handleChange}
      />

      <label>Descripción</label>
      <textarea
        name="descripcion"
        value={venta.descripcion}
        onChange={handleChange}
      />

      <label>Cliente</label>
      <input
        name="cliente"
        value={venta.cliente}
        onChange={handleChange}
      />

      <label>Monto</label>
      <input
        type="number"
        name="monto"
        value={venta.monto}
        onChange={handleChange}
      />

      <label>Estado</label>
      <select
        name="estado"
        value={venta.estado}
        onChange={handleChange}
      >
        <option value="">-- Seleccionar --</option>
        <option value="Pendiente">Pendiente</option>
        <option value="Cobrado">Cobrado</option>
        <option value="Cancelado">Cancelado</option>
      </select>

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={venta.email}
        onChange={handleChange}
      />

      <label>Fecha</label>
      <input
        type="date"
        name="fecha"
        value={venta.fecha}
        onChange={handleChange}
      />

      <button className="btn btn--primary">
        Guardar
      </button>
    </form>
  );
}

export default VentaForm;



