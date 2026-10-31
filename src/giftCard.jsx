export default function GiftCard({ gif }) {
  const imagen =
    gif.images?.fixed_height?.url ||
    gif.images?.downsized_medium?.url ||
    gif.images?.original?.url

  return (
    <article className="gif-card">
      <img
        src={imagen}
        alt={gif.title || 'GIF'}
        loading="lazy"
        className="gif-card-imagen"
      />
      <p className="gif-card-titulo">{gif.title || 'Sin título'}</p>
    </article>
  )
}
