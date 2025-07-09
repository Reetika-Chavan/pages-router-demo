import Image from 'next/image'
import { GetStaticProps } from 'next'

type Movie = {
  Title: string
  Year: string
  Runtime: string
  Poster?: string
}

type HomeProps = {
  movies: Movie[]
}


// Static data fetch at build time
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const res = await fetch('https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies')

    console.log('Status Code:', res.status)

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`)
    }

    const movies: Movie[] = await res.json()
    console.log('Fetched Movies:', movies)

    return {
      props: {
        movies,
      },
    }
  } catch (error) {
    console.error('Error fetching movies:', error)

    return {
      props: {
        movies: [],
      },
    }
  }
}


export default function Home({ movies }: HomeProps) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
        Tom & Jerry 
      </h1>

      <div style={{ marginBottom: '2rem' }}>
        <Image
          src="/tomjerry.png"
          alt="Tom and Jerry"
          width={500}
          height={350}
        />
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        Some Movies You Might Like:
      </h2>

      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {movies.map((movie, index) => (
  <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
    {movie.Poster ? (
      <img
        src={movie.Poster}
        alt={movie.Title}
        style={{ width: '100%', borderRadius: '8px' }}
      />
    ) : (
      <div style={{ height: '300px', background: '#eee', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>No Image</p>
      </div>
    )}
    <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>{movie.Title}</p>
    <p>{movie.Year} • {movie.Runtime}</p>
  </div>
))}
      </div>
    </div>
  )
}