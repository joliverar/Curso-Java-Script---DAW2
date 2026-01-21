const URL = "https://jsonplaceholder.typicode.com/users";

export async function obtenerUsuarios() {
  const response = await fetch(URL);
  return response.json();
}
