export default function SearchBar({ valor, onChange }) {
  return (
    <input
      className="buscador"
      type="search"
      placeholder="Buscar gifs"
      aria-label="Buscar gifs"
      value={valor}
      onChange={(evento) => onChange(evento.target.value)}
    />
  )
}
