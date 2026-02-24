import { apiGet, apiPost, apiPut, apiDelete } from "../data/Api"; // ajusta la ruta

export default function TestApi() {
  async function probarGet() {
    try {
      const data = await apiGet("/proyectos");
      console.log("GET OK:", data);
    } catch (e) {
      console.error("GET ERROR:", e.message);
    }
  }

  async function probarPost() {
    try {
      const data = await apiPost("/proyectos", {
        nombre: "Jino Olivera 3",
        descripcion: "Prueba de error de validación",
        id_equipo: 3,
        fecha_creacion: "2024-06-15",
        fecha_inicio: "2024-06-20",
        fecha_fin_prevista: "2024-07-05",
        id_estado_proyecto: 1,
      });
      console.log("POST OK:", data);
    } catch (e) {
      console.error("POST ERROR:", e.message);
    }
  }

  async function probarPut() {
    try {
      const data = await apiPut("/proyectos/3", {
        nombre: "Jino Olivera 4",
        descripcion: "Prueba de error de validación",
        id_equipo: 3,
        fecha_creacion: "2024-06-15",
        fecha_inicio: "2024-06-20",
        fecha_fin_prevista: "2024-07-05",
        id_estado_proyecto: 1,
      });
      console.log("PUT OK:", data);
    } catch (e) {
      console.error("PUT ERROR:", e.message);
    }
  }

  async function probarDelete() {
    try {
      await apiDelete("/proyectos/2");
      console.log("DELETE OK");
    } catch (e) {
      console.error("DELETE ERROR:", e.message);
    }
  }

  return (
    <div className="pruebaApi">
      <h3>Prueba rápida API</h3>

      <button onClick={probarGet}>Probar get</button>
      <button onClick={probarPost}>Probar Post</button>
      <button onClick={probarPut}>Probar Put</button>
      <button onClick={probarDelete}>Probar Delete</button>

      <p> Mira la consola</p>
    </div>
  );
}
