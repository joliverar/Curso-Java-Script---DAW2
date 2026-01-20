export async function obtenerVentasApi(){
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

    if(!res.ok){
        throw new Error("No se pudo ncvocar a la api");
        
    }
    const data = await res.json();

    return data.map(post=>({
        id: post.id.toString(),
        servicio: post.title,
        descripcion: post.body,
        cliente: "Jino Olivera",
        monto: 30,
        estado: "Pendiente",
        fecha: new Date().toISOString().split("T")[0]
    }));
}