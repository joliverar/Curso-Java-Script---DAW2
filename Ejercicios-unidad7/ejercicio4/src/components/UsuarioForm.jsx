import { useState } from "react";

function UsuarioForm({ onCrear }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const enviar = () => {
    if (nombre.trim() === "" || email.trim() === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    onCrear({
      id: Date.now(),
      nombre,
      email,
      activo: true,
    });

    setNombre("");
    setEmail("");
  };

  return (
    <>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={enviar}>Añadir</button>
    </>
  );
}

export default UsuarioForm;
