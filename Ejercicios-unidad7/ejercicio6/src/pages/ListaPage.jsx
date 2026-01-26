import { useEffect, useState } from "react";
import negocio from "../core/NegocioApi";
import ListaLinea from "../components/ListaLinea";

function ListaPage() {
  const [modulos, setModulos] = useState([]);
  const [textoBuscar, setTextoBuscar] = useState("");
  const [nombre, setNombre] = useState("");
  const [horas, setHoras] = useState("");
  const [horasMin, setHorasMin] = useState("");
  const [horasMax, setHorasMax] = useState("");

  /* =========================
     CARGAR LISTA
  ========================= */
  useEffect(() => {
    cargarModulos();
  }, []);

  const cargarModulos = async () => {
    try {
      const datos = await negocio.obtenerModulos();
      setModulos(datos);
      alert("Datos cargados desde API personalizada");
    } catch (e) {
      alert("Error al cargar módulos");
    }
  };

  /* =========================
     BUSCAR (LOCAL)
  ========================= */
  const buscar = () => {
    const resultado = modulos.filter((m) =>
      m.nombre.toLowerCase().includes(textoBuscar.toLowerCase()),
    );
    setModulos(resultado);
  };

  /* =========================
     CREAR
  ========================= */
  const crear = async () => {
    try {
      if (nombre.trim() === "") {
        alert("Nombre obligatorio");
        return;
      }

      if (horas === "" || isNaN(horas) || Number(horas) <= 0) {
        alert("Horas incorrectas");
        return;
      }

      const nuevo = await negocio.crearModulo({
        title: nombre,
        price: Number(horas),
      });

      // 🔹 Simulación: añadimos al estado
      setModulos([
        ...modulos,
        {
          id: nuevo.id,
          nombre: nuevo.title,
          horas: nuevo.price,
        },
      ]);

      setNombre("");
      setHoras("");
      alert("Creado correctamente ✔️");
    } catch (e) {
      alert("Error al crear módulo");
    }
  };

  /* =========================
     BORRAR (SIMULADO)
  ========================= */
  const manejarBorrado = async (id) => {
    try {
      await negocio.borrarModulo(id);
      setModulos(modulos.filter((m) => m.id !== id));
      alert("Borrado correctamente ✔️");
    } catch (e) {
      alert("Error al borrar módulo");
    }
  };

  /* =========================
     FILTRAR POR HORAS
  ========================= */
  const filtrar = () => {
    if (horasMin === "" || horasMax === "") {
      alert("Introduce horas mínimas y máximas");
      return;
    }

    const resultado = modulos.filter(
      (m) => m.horas >= Number(horasMin) && m.horas <= Number(horasMax),
    );

    setModulos(resultado);
  };

  /* =========================
     ORDENAR
  ========================= */
  const ordenarHoras = () => {
    const copia = [...modulos];
    copia.sort((a, b) => a.horas - b.horas);
    setModulos(copia);
  };

  const ordenarNombre = () => {
    const copia = [...modulos];
    copia.sort((a, b) => a.nombre.localeCompare(b.nombre));
    setModulos(copia);
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <>
      <h3>Ordenar</h3>
      <button onClick={ordenarHoras}>Por horas</button>
      <button onClick={ordenarNombre}>Por nombre</button>

      <h3>Filtrar por horas</h3>
      <input
        type="number"
        placeholder="Min"
        value={horasMin}
        onChange={(e) => setHorasMin(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max"
        value={horasMax}
        onChange={(e) => setHorasMax(e.target.value)}
      />
      <button onClick={filtrar}>Filtrar</button>
      <button onClick={cargarModulos}>Quitar filtro</button>

      <h2>Nuevo módulo</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Horas"
        value={horas}
        onChange={(e) => setHoras(e.target.value)}
      />
      <button onClick={crear}>Crear</button>

      <h2>Lista</h2>
      <input
        type="text"
        placeholder="Buscar"
        value={textoBuscar}
        onChange={(e) => setTextoBuscar(e.target.value)}
      />
      <button onClick={buscar}>Buscar</button>
      <button onClick={cargarModulos}>Ver todos</button>

      {modulos.map((m) => (
        <ListaLinea key={m.id} modulo={m} onBorrado={manejarBorrado} />
      ))}
    </>
  );
}

export default ListaPage;
