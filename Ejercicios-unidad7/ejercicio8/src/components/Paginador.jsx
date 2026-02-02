export default function Paginador({ pagina, setPagina }) {
  return (
    <div>
      <button onClick={() => setPagina((p) => Math.max(p - 1, 0))}>◀</button>
      Página {pagina + 1}
      <button onClick={() => setPagina((p) => p + 1)}>▶</button>
    </div>
  );
}
