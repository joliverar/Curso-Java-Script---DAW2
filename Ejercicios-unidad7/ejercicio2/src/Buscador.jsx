function Buscador({ valorInput, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="buscador">
      <input
        type="text"
        placeholder="Buscar gifs..."
        value={valorInput}
        onChange={onChange}
      />
      <button>Buscar</button>
    </form>
  );
}

export default Buscador;

