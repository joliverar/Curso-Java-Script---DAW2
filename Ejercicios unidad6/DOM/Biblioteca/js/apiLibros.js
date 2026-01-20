const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function  obtenerLibros(){
    const res = await fetch(`${API_URL}?_limit=5`);
    if(!res.ok){
        throw new Error("No s epudo cargar la api");
        
    }
    const data = await res.json();

    return data.map(post=>({
        id: post.id.toString(),
        titulo: post.title,
        autor: post.body,
        isbn: "qqw34343443",
        anio: "2034",
        estado: "disponible",
        fecha: new Date().toISOString().split("T")[0]
    }));

}

export async function crearLibros(libro){
        const res = await fetch(API_URL, {
            method: "POST",
            headers : {
               "Content-type" :"Aplication/json",
               "Accept" :"Aplication/json"
            },
            body : JSON.stringify(libro)
        });


    if(!res.ok){
        throw new Error("No se pudo cargar la api");
        
    }
    return await res.json();

}

export async function actualiarLibros(libro){
        const res = await fetch(`${API_URL}/${libro.id}`, {
            method: "PUT",
            headers : {
               "Content-type" :"Application/json",
               "Accept" :"Application/json"
            },
            body : JSON.stringify(libro)
        });


    if(!res.ok){
        throw new Error("No se pudo cargar la api");
        
    }
    return await res.json();

}

export async function eliminarLibros(id){
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });


    if(!res.ok){
        throw new Error("No se pudo cargar la api");
        
    }


}

