import { useEffect, useState } from "react";
import negocio from "../core/Negocio";
import ListaLinea from "../components/ListaLinea";

function ListaPage() {
  const [modulos, setModulos] = useState([]);

  useEffect(() => {
    cargarModulos();
  }, []);

  const cargarModulos = async () => {
    try {
      const respuesta = await negocio.obtenerModulos();
      setModulos(respuesta);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <h1>Lista de módulos</h1>

      {modulos.map((modulo) => (
        <ListaLinea key={modulo.id} modulo={modulo} />
      ))}
    </>
  );
}

export default ListaPage;
