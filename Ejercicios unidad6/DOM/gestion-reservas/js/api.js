
export async function fecthReservas(){
     const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
        if(!res.ok){
            throw new Error("no se cargo la data del api");
        }

        const data = await res.json();


       return data.map(post =>({
        id : post.id.toString(),
        cliente: post.title,
        servicio: post.body,
        estado: "Pendiente",
        fecha: new Date().toISOString().split("T")[0]
       }));
      

       

    
}
       