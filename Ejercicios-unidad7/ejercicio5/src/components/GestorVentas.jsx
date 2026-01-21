import { useEffect, useState } from "react";
import Layout from "./Layout";
import VentaForm from "./VentaForm";
import Filtros from "./Filtros";
import TablaVentas from "./TablaVentas";
import {
  obtenerVentas,
  crearVenta,
  actualizarVenta,
  eliminarVenta
} from "../core/apiVentas";

function GestorVentas() {

  // Estado con todas las ventas
  const [ventas, setVentas] = useState([]);

  // Venta que se está editando (null = crear)
  const [ventaEditando, setVentaEditando] = useState(null);

  // Estado de los filtros
  const [filtros, setFiltros] = useState({
    buscar: "",
    ordenar: "",
    estado: ""
  });

  // Carga inicial de ventas desde la API
  useEffect(() => {
    obtenerVentas()
      .then(setVentas)
      .catch(e => alert(e.message));
  }, []);

  // Crear o actualizar una venta
  const guardarVenta = async (venta) => {
    if (venta.id) {
      // Editar
      await actualizarVenta(venta);
      setVentas(ventas.map(v =>
        v.id === venta.id ? venta : v
      ));
    } else {
      // Crear
      const nueva = await crearVenta(venta);
      setVentas([...ventas, nueva]);
    }
    setVentaEditando(null);
  };

  // Eliminar una venta
  const borrarVenta = async (id) => {
    if (confirm("¿Desea eliminar?")) {
      await eliminarVenta(id);
      setVentas(ventas.filter(v => v.id !== id));
    }
  };

  // Copia para aplicar filtros
  let ventasFiltradas = [...ventas];

  // Buscar por texto
  if (filtros.buscar) {
    ventasFiltradas = ventasFiltradas.filter(v =>
      v.servicio.toLowerCase().includes(filtros.buscar.toLowerCase()) ||
      v.descripcion.toLowerCase().includes(filtros.buscar.toLowerCase())
    );
  }

  // Filtrar por estado
  if (filtros.estado) {
    ventasFiltradas = ventasFiltradas.filter(
      v => v.estado === filtros.estado
    );
  }

  // Ordenar por fecha
  if (filtros.ordenar === "fecha") {
    ventasFiltradas.sort(
      (a, b) => new Date(a.fecha) - new Date(b.fecha)
    );
  }

  // Ordenar por servicio
  if (filtros.ordenar === "servicio") {
    ventasFiltradas.sort(
      (a, b) => a.servicio.localeCompare(b.servicio)
    );
  }

  // Composición del layout
  return (
    <Layout
      formulario={
        <VentaForm
          ventaEditando={ventaEditando}
          onGuardar={guardarVenta}
        />
      }
      filtros={
        <Filtros filtros={filtros} onChange={setFiltros} />
      }
      listado={
        <TablaVentas
          ventas={ventasFiltradas}
          onEditar={setVentaEditando}
          onEliminar={borrarVenta}
        />
      }
    />
  );
}

export default GestorVentas;
