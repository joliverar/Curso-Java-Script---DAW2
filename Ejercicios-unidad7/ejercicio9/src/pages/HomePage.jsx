import { useEffect } from "react";
export default function HomePage() {
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/proyectos").then((res) => res.json());
  }, []);
  return (
    <>
      <h2>Pagina princial</h2>
    </>
  );
}
