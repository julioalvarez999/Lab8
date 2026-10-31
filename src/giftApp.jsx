import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import GifGrid from './components/GifGrid'

const API_KEY = '8jVSO9wKED6kPlcw6jnvI9kxcgQfZo2b'

const CATEGORIAS_INICIALES = ['dragon ball', 'valorant', 'One punch']

async function buscarGifs(query, signal) {
  if (!API_KEY || API_KEY === '') {
    throw new Error(
      'Falta la API key de GIPHY. Configúrala en src/giftApp.jsx (const API_KEY).',
    )
  }

  const url = new URL('https://api.giphy.com/v1/gifs/search')
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('q', query)
  url.searchParams.set('limit', '5')

  const respuesta = await fetch(url, { signal })
  if (!respuesta.ok) {
    throw new Error(`No se pudieron obtener los gifs (error ${respuesta.status}).`)
  }

  const { data } = await respuesta.json()
  return data
}

export default function GiftApp() {
  const [busqueda, setBusqueda] = useState('')
  const [secciones, setSecciones] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const consultas = busqueda.trim()
      ? [busqueda.trim()]
      : CATEGORIAS_INICIALES
    const controlador = new AbortController()

    const temporizador = setTimeout(
      async () => {
        setCargando(true)
        setError(null)

        try {
          const resultados = await Promise.all(
            consultas.map(async (consulta) => ({
              titulo: consulta,
              gifs: await buscarGifs(consulta, controlador.signal),
            })),
          )
          setSecciones(resultados)
        } catch (err) {
          if (err.name !== 'AbortError') setError(err.message)
        } finally {
          if (!controlador.signal.aborted) setCargando(false)
        }
      },
      busqueda.trim() ? 500 : 0,
    )

    return () => {
      clearTimeout(temporizador)
      controlador.abort()
    }
  }, [busqueda])

  return (
    <div className="app">
      <h1>App de gifs</h1>

      <SearchBar valor={busqueda} onChange={setBusqueda} />

      {cargando && <p className="estado">Cargando gifs…</p>}
      {error && <p className="estado estado-error">{error}</p>}

      {!cargando &&
        !error &&
        secciones.map((seccion) => (
          <GifGrid key={seccion.titulo} titulo={seccion.titulo} gifs={seccion.gifs} />
        ))}
    </div>
  )
}
