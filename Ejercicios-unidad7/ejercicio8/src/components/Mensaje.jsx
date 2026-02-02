import { useEffect } from "react";
import { useApp } from "../context/AppContext";

export default function Mensaje() {
  const { mensaje, setMensaje } = useApp();

  useEffect(() => {
    if (mensaje) {
      const t = setTimeout(() => setMensaje(null), 3000);
      return () => clearTimeout(t);
    }
  }, [mensaje]);

  if (!mensaje) return null;

  return (
    <div
      style={{
        background: "#def",
        padding: "0.5rem",
        margin: "1rem",
      }}
    >
      {mensaje}
    </div>
  );
}
