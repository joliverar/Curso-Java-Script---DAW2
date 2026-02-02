export default function Buscador({ value, onChange }) {
  return (
    <input
      placeholder="Buscar..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
