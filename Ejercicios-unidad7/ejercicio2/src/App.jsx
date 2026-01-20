import { useSearchGifs } from "./useSearchGifs";
import Buscador from "./Buscador";
import GridGifs from "./GridGifs";

function App() {
  const {
    valorInput,
    gifs,
    estaCargando,
    onChange,
    onSubmit,
  } = useSearchGifs();

  return (
    <div className="app">
      <h1>Buscador de GIFs</h1>

      <Buscador
        valorInput={valorInput}
        onChange={onChange}
        onSubmit={onSubmit}
      />

      {estaCargando && <p className="loading">Cargando...</p>}

      {!estaCargando && <GridGifs gifs={gifs} />}
    </div>
  );
}

export default App;


