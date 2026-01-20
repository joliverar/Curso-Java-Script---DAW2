import { useState } from "react";

const API_KEY = "VPWDIuvLZQ3tfTy2VgINylR8oIWq0fED";

export const useSearchGifs = () => {
  const [valorInput, setValorInput] = useState("");
  const [gifs, setGifs] = useState([]);
  const [estaCargando, setEstaCargando] = useState(false);

  // Maneja el input
  const onChange = (evento) => {
    setValorInput(evento.target.value);
  };

  // Llamada a la API
  const getGifs = async (query) => {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12`;

    setEstaCargando(true);

    // ⏳ Simula 3 segundos de carga
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const response = await fetch(url);
    const data = await response.json();

    setEstaCargando(false);
    return data.data;
  };

  // Envío del formulario
  const onSubmit = async (evento) => {
    evento.preventDefault();
    if (!valorInput.trim()) return;

    const gifs = await getGifs(valorInput);
    setGifs(gifs);
  };

  return {
    valorInput,
    gifs,
    estaCargando,
    onChange,
    onSubmit,
  };
};
