
export async function obtenerReservasApi(){

    
         const res = await fetch("https://jsonplaceholder.typicode.com/users?_limit=5");

        if(!res.ok){
            throw new Error("Error al cargar el api");
            
        }

        const data = await res.json();

        return data.map(u => ({
            id: null,
            cliente: u.name,
            correo: u.email,
            servicio: "servicio importado",
            precio: 50,
            fecha: new Date().toISOString().split("T")[0],
            estado: "pendiente"

        }));
  
 
}