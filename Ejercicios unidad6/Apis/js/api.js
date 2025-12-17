const API = "https://jsonplaceholder.typicode.com";

async function getAll(endpoint, params = "") {
    try {
        const res = await fetch(`${API}/${endpoint}${params}`);
        if (!res.ok) throw new Error("Error al cargar datos");
        return res.json();
    } catch (e) {
        throw e;
    }
}

async function getById(endpoint, id) {
    try {
        const res = await fetch(`${API}/${endpoint}/${id}`);
        if (!res.ok) throw new Error("Error al cargar elemento");
        return res.json();
    } catch (e) {
        throw e;
    }
}

async function update(endpoint, id, data) {
    try {
        const res = await fetch(`${API}/${endpoint}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Error al actualizar");
        return res.json();
    } catch (e) {
        throw e;
    }
}
