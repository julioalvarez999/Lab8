import GiftCard from '../giftCard'

export default function GifGrid({ titulo, gifs }) {
  return (
    <section className="seccion">
      <h2 className="seccion-titulo">{titulo}</h2>

      {gifs.length === 0 ? (
        <p className="estado">No se encontraron gifs para “{titulo}”.</p>
      ) : (
        <div className="gifs">
          {gifs.map((gif) => (
            <GiftCard key={gif.id} gif={gif} />
          ))}
        </div>
      )}
    </section>
  )
}
