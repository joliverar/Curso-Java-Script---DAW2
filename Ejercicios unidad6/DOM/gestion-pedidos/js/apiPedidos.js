export async function obtenerPedidosApi(){
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

    if(!res.ok) {
        throw new Error("Error al cargar el api");
        
    }

    const data = await res.json();

    return data.map(post=>({
        id: post.id.toString(),
        cliente: post.title,
        producto: post.body,
        cantidad: 3,
        estado: "Pendiente",
        fecha: new Date().toISOString().split("T")[0]
    }));


}