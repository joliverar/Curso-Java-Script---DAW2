const URL = "https://dummyjson.com/products";

const negocioApi = (function () {
  /* ======================
     READ ALL
  ====================== */
  async function obtenerModulos() {
    try {
      const resp = await fetch(URL);

      if (!resp.ok) throw new Error("Error al obtener productos");

      const data = await resp.json();

      return data.products.map((p) => ({
        id: p.id,
        nombre: p.title,
        horas: p.price,
      }));
    } catch (e) {
      console.error("obtenerModulos:", e);
      throw e;
    }
  }

  /* ======================
     READ ONE
  ====================== */
  async function obtenerModulo(id) {
    try {
      const resp = await fetch(`${URL}/${id}`);

      if (!resp.ok) throw new Error("Producto no encontrado");

      const p = await resp.json();

      return {
        id: p.id,
        nombre: p.title,
        horas: p.price,
      };
    } catch (e) {
      console.error("obtenerModulo:", e);
      throw e;
    }
  }

  /* ======================
     CREATE
  ====================== */
  async function crearModulo(modulo) {
    try {
      const resp = await fetch(`${URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: modulo.title,
          price: modulo.price,
        }),
      });

      if (!resp.ok) throw new Error("Error al crear producto");

      const p = await resp.json();
      console.log("CREADO OK:", p);

      return p;
    } catch (e) {
      console.error("crearModulo:", e);
      throw e;
    }
  }

  /* ======================
     UPDATE
  ====================== */
  async function actualizarModulo(modulo) {
    try {
      const resp = await fetch(`${URL}/${modulo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: modulo.title,
          price: modulo.price,
        }),
      });

      if (!resp.ok) throw new Error("Error al actualizar producto");

      const p = await resp.json();
      console.log("ACTUALIZADO OK:", p);

      return p;
    } catch (e) {
      console.error("actualizarModulo:", e);
      throw e;
    }
  }

  /* ======================
     DELETE
  ====================== */
  async function borrarModulo(id) {
    try {
      const resp = await fetch(`${URL}/${id}`, {
        method: "DELETE",
      });

      if (!resp.ok) throw new Error("Error al borrar producto");

      console.log("BORRADO OK:", id);
    } catch (e) {
      console.error("borrarModulo:", e);
      throw e;
    }
  }

  return {
    obtenerModulos,
    obtenerModulo,
    crearModulo,
    actualizarModulo,
    borrarModulo,
  };
})();

export default negocioApi;
